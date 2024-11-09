// Function to load CV data from local storage and display it on the CV
function loadCVData() {
    const savedData = localStorage.getItem("cvData");
    if (savedData) {
        const cvData = JSON.parse(savedData);
        // Update Personal Information
        document.getElementById("cvName").textContent = cvData.personalInfo.name;
        document.getElementById("cvEmail").textContent = cvData.personalInfo.email;
        document.getElementById("cvPhone").textContent = cvData.personalInfo.phone;
        document.getElementById("cvAddress").textContent = cvData.personalInfo.address;
        document.getElementById("cvImage").src = cvData.personalInfo.image;
        // Update Summary
        document.getElementById("cvSummary").textContent = cvData.summary;
        // Update Skills, Languages, Experience, and Education
        document.getElementById("cvSkills").innerHTML = cvData.skills.map(skill => `<p>${skill}</p>`).join('');
        document.getElementById("cvLanguages").innerHTML = cvData.languages.map(language => `<p>${language}</p>`).join('');
        document.getElementById("cvExperience").innerHTML = cvData.experience.map(job => `<p>${job}</p>`).join('');
        document.getElementById("cvEducation").innerHTML = cvData.education.map(edu => `<p>${edu}</p>`).join('');
    }
}
// Function to print the CV
function printCV() {
    // Hide toolbar, wait a bit, and then print
    const toolbar = document.querySelector(".toolsbar");
    toolbar.style.display = "none";
    setTimeout(() => {
        window.print();
        toolbar.style.display = "flex"; // Restore after print
    }, 300);
}
// Function to download the CV as a PDF
async function downloadPDF() {
    const cvElement = document.querySelector(".cv-container");
    const options = {
        margin: 0.5,
        filename: 'My_CV.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    // Add `pdf-mode` class to force desktop layout
    if (cvElement) {
        cvElement.classList.add("pdf-mode");
    }
    // Generate PDF
    try {
        if (cvElement) {
            // @ts-ignore
            await html2pdf().from(cvElement).set(options).save();
        }
    }
    finally {
        // Remove `pdf-mode` class after PDF generation
        if (cvElement) {
            cvElement.classList.remove("pdf-mode");
        }
    }
}
// Function to edit the CV (navigate to the edit page)
function editCV() {
    window.location.href = "edit_cv_page.html"; // Update with your actual edit page URL
}
// Function to update the font family
function updateFont() {
    const fontSelect = document.getElementById("fontSelect");
    const selectedFont = fontSelect.value;
    document.body.style.fontFamily = selectedFont;
}
// Function to update the color scheme
function updateColor() {
    const colorSelect = document.getElementById("colorSelect");
    const selectedColor = colorSelect.value;
    document.documentElement.style.setProperty('--primary-color', selectedColor);
}
// Add event listeners for toolbar actions
document.addEventListener("DOMContentLoaded", () => {
    loadCVData();
    document.getElementById("printCV").addEventListener("click", printCV);
    document.getElementById("downloadPDF").addEventListener("click", downloadPDF);
    document.getElementById("editCV").addEventListener("click", editCV);
    document.getElementById("fontSelect").addEventListener("change", updateFont);
    document.getElementById("colorSelect").addEventListener("input", updateColor);
});
export {};
