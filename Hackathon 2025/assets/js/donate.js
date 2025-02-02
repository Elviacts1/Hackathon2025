document.getElementById("donationForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let formData = new FormData(this);

    fetch("donate.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById("responseMessage").innerText = data;
        document.getElementById("donationForm").reset();
    })
    .catch(error => console.error("Error:", error));
});
