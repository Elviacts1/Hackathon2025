// Get all carousel items
const carouselItems = document.querySelectorAll('.carousel-item');

// Set initial active index
let activeIndex = 0;

// Function to update carousel
function updateCarousel() {
    // Remove active class from all items
    carouselItems.forEach(item => item.classList.remove('active'));

    // Add active class to current item
    carouselItems[activeIndex].classList.add('active');
}

// Function to move to next/prev slide
function moveSlide(direction) {
    activeIndex = (activeIndex + direction + carouselItems.length) % carouselItems.length;
    updateCarousel();
}

// Start the carousel
setInterval(() => {
    moveSlide(1); // Move to next slide automatically every 3 seconds
}, 3000);

// Initialize the first item
updateCarousel();
