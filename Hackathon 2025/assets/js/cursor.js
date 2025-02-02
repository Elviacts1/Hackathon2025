const cursor = document.querySelector(".cursor");

        // Move cursor smoothly
        document.addEventListener("mousemove", (e) => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        });

        // Add hover effect on interactive elements
        document.querySelectorAll("button").forEach((el) => {
            el.addEventListener("mouseenter", () => cursor.classList.add("hover-effect"));
            el.addEventListener("mouseleave", () => cursor.classList.remove("hover-effect"));
        });