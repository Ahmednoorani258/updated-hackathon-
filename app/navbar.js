document.addEventListener("DOMContentLoaded", function () {
    var navToggle = document.getElementById("navToggle");
    var navLinks = document.getElementById("navLinks");
    navToggle === null || navToggle === void 0 ? void 0 : navToggle.addEventListener("click", function () {
        navLinks === null || navLinks === void 0 ? void 0 : navLinks.classList.toggle("active");
    });
});
