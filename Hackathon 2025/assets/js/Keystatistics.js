// Function to animate numbers
function countUp(id, start, end, duration) {
    let current = start;
    const range = end - start;
    const increment = end > start ? 1 : -1;
    const stepTime = Math.abs(Math.floor(duration / range));

    const element = document.getElementById(id);
    
    const timer = setInterval(function() {
        current += increment;
        element.innerText = current;
        if (current === end) {
            clearInterval(timer);
        }
    }, stepTime);
}

// Call the function immediately on page load
countUp('donated', 0, 10000, 2000); // Change the values and duration as needed
countUp('families', 0, 5000, 2000);
countUp('companies', 0, 50, 2000);
