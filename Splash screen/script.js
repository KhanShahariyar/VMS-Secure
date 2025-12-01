// Wait until the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    const splash = document.querySelector("body");
    const splashContent = document.querySelector(".flex-col");

    // Set splash duration (in milliseconds)
    const splashDuration = 3000; // 3 seconds

    setTimeout(function () {
        splashContent.style.opacity = "0";
        splashContent.style.transition = "opacity 1s ease";

        setTimeout(function () {
            window.location.href = "home.html";
        }, 1000);
    }, splashDuration);

    setTimeout(() => {
        window.location.href = 'file:///C:/Users/LENOVO/OneDrive/Desktop/SAD%20LAB/website/Login%20and%20registration/Index.html';
    }, 3000);
});
