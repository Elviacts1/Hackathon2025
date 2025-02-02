// Emission factors for each waste type (in kg CO2 per kg of waste)
const emissionFactors = {
    fabric: 3.16,  // Example emission factor (replace with accurate data)
    plastic: 6.00,
    glass: 0.25,
    metal: 1.65,
    paper: 1.00,
    ewaste: 10.00
};

// Function to enable/disable input fields based on checkbox selection
document.querySelectorAll('.waste-check').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        const inputField = document.getElementById(checkbox.dataset.type);
        inputField.disabled = !checkbox.checked; // Enable/Disable based on checkbox state
    });
});

// Function to calculate carbon footprint and generate insights
function calculateFootprint() {
    let totalEmissions = 0;
    let emissionsData = [];  // Store waste type and emissions data
    const resultsTable = document.querySelector('#resultsTable tbody');
    resultsTable.innerHTML = '';  // Clear previous results

    // Loop through all waste types to calculate emissions
    document.querySelectorAll('.waste-check').forEach(checkbox => {
        const type = checkbox.dataset.type;
        const inputField = document.getElementById(type);
        const weight = parseFloat(inputField.value) || 0; // Get weight from input (default to 0 if invalid)

        // Check if checkbox is checked and weight is positive
        if (checkbox.checked && weight > 0) {
            const emissions = weight * emissionFactors[type];  // Calculate emissions
            totalEmissions += emissions;

            // Add row to the results table with waste type, weight, and CO₂ emissions
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${capitalizeFirstLetter(type)}</td>
                <td>${weight} kg</td>
                <td>${emissions.toFixed(2)} kg CO₂</td>
            `;
            resultsTable.appendChild(row);

            // Store emissions data for insights
            emissionsData.push({ type, emissions });
        }
    });

    // Update total emissions in the footer
    document.getElementById('totalEmissions').textContent = totalEmissions.toFixed(2);

    // Generate insights
    generateInsights(emissionsData);
}

// Function to generate insights from emissions data
function generateInsights(emissionsData) {
    const insightsContainer = document.querySelector('#insights');
    insightsContainer.innerHTML = ''; // Clear previous insights

    // 1. Total Emissions
    const totalEmissionsInsight = document.createElement('p');
    totalEmissionsInsight.textContent = `Total Carbon Footprint: ${calculateTotalEmissions(emissionsData)} kg CO₂`;
    insightsContainer.appendChild(totalEmissionsInsight);

    // 2. Top Contributor
    const topContributor = getTopContributor(emissionsData);
    const topContributorInsight = document.createElement('p');
    topContributorInsight.textContent = `Top Contributor: ${topContributor.type} with ${topContributor.emissions.toFixed(2)} kg CO₂`;
    insightsContainer.appendChild(topContributorInsight);

    // 3. Least Contributor
    const leastContributor = getLeastContributor(emissionsData);
    const leastContributorInsight = document.createElement('p');
    leastContributorInsight.textContent = `Least Contributor: ${leastContributor.type} with ${leastContributor.emissions.toFixed(2)} kg CO₂`;
    insightsContainer.appendChild(leastContributorInsight);

    // 4. Average Emissions
    const avgEmissions = calculateAverageEmissions(emissionsData);
    const avgEmissionsInsight = document.createElement('p');
    avgEmissionsInsight.textContent = `Average Emissions per Type: ${avgEmissions.toFixed(2)} kg CO₂`;
    insightsContainer.appendChild(avgEmissionsInsight);

    // 5. Environmental Recommendations (based on the data)
    const recommendations = generateRecommendations(emissionsData);
    const recommendationsInsight = document.createElement('p');
    recommendationsInsight.textContent = `Environmental Recommendations: ${recommendations}`;
    insightsContainer.appendChild(recommendationsInsight);
}

// Helper function to calculate total emissions
function calculateTotalEmissions(data) {
    return data.reduce((total, item) => total + item.emissions, 0);
}

// Helper function to get the top contributor (highest emissions)
function getTopContributor(data) {
    return data.reduce((max, item) => (item.emissions > max.emissions ? item : max), data[0]);
}

// Helper function to get the least contributor (lowest emissions)
function getLeastContributor(data) {
    return data.reduce((min, item) => (item.emissions < min.emissions ? item : min), data[0]);
}

// Helper function to calculate the average emissions
function calculateAverageEmissions(data) {
    const totalEmissions = calculateTotalEmissions(data);
    return totalEmissions / data.length;
}

// Helper function to generate environmental recommendations based on data
function generateRecommendations(data) {
    const highEmissionsTypes = data.filter(item => item.emissions > 5); // Example threshold
    if (highEmissionsTypes.length > 0) {
        return `Consider reducing waste from high emission types like ${highEmissionsTypes.map(item => item.type).join(', ')}.`;
    }
    return 'Great job! Your carbon footprint is minimal. Keep reducing waste and emissions.';
}

// Helper function to capitalize the first letter of each waste type
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
