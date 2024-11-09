interface PersonalInfo {
    image: string;
    name: string;
    email: string;
    phone: string;
    address: string;
}

interface FormData {
    personalInfo: PersonalInfo;
    summary: string;
    education: string[];
    experience: string[];
    languages: string[];
    skills: string[];
}

// Function to load CV data from local storage and display it on the CV
function loadCVData(): void {
    const savedData = localStorage.getItem("cvData");

    if (savedData) {
        const cvData: FormData = JSON.parse(savedData);

        // Update Personal Information
        (document.getElementById("cvName") as HTMLElement).textContent = cvData.personalInfo.name;
        (document.getElementById("cvEmail") as HTMLElement).textContent = cvData.personalInfo.email;
        (document.getElementById("cvPhone") as HTMLElement).textContent = cvData.personalInfo.phone;
        (document.getElementById("cvAddress") as HTMLElement).textContent = cvData.personalInfo.address;
        (document.getElementById("cvImage") as HTMLImageElement).src = cvData.personalInfo.image;

        // Update Summary
        (document.getElementById("cvSummary") as HTMLElement).textContent = cvData.summary;

        // Update Skills, Languages, Experience, and Education
        (document.getElementById("cvSkills") as HTMLElement).innerHTML = cvData.skills.map(skill => `<p>${skill}</p>`).join('');
        (document.getElementById("cvLanguages") as HTMLElement).innerHTML = cvData.languages.map(language => `<p>${language}</p>`).join('');
        (document.getElementById("cvExperience") as HTMLElement).innerHTML = cvData.experience.map(job => `<p>${job}</p>`).join('');
        (document.getElementById("cvEducation") as HTMLElement).innerHTML = cvData.education.map(edu => `<p>${edu}</p>`).join('');
    }
}

// Function to print the CV
function printCV(): void {
    // Hide toolbar, wait a bit, and then print
    const toolbar = document.querySelector(".toolsbar") as HTMLElement;
    toolbar.style.display = "none";
    
    setTimeout(() => {
        window.print();
        toolbar.style.display = "flex"; // Restore after print
    }, 300);
}
// Function to download the CV as a PDF
async function downloadPDF(): Promise<void> {
    const cvElement = document.querySelector(".cv-container") as HTMLElement;
    const options = {
        margin:       0.5,
        filename:     'My_CV.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
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
    } finally {
        // Remove `pdf-mode` class after PDF generation
        if (cvElement) {
            cvElement.classList.remove("pdf-mode");
        }
    }
}

// Function to edit the CV (navigate to the edit page)
function editCV(): void {
    window.location.href = "edit_cv_page.html";  // Update with your actual edit page URL
}

// Function to update the font family
function updateFont(): void {
    const fontSelect = document.getElementById("fontSelect") as HTMLSelectElement;
    const selectedFont = fontSelect.value;
    document.body.style.fontFamily = selectedFont;
}

// Function to update the color scheme
function updateColor(): void {
    const colorSelect = document.getElementById("colorSelect") as HTMLInputElement;
    const selectedColor = colorSelect.value;
    document.documentElement.style.setProperty('--primary-color', selectedColor);
}

// Add event listeners for toolbar actions
document.addEventListener("DOMContentLoaded", () => {
    loadCVData();

    (document.getElementById("printCV") as HTMLButtonElement).addEventListener("click", printCV);
    (document.getElementById("downloadPDF") as HTMLButtonElement).addEventListener("click", downloadPDF);
    (document.getElementById("editCV") as HTMLButtonElement).addEventListener("click", editCV);

    (document.getElementById("fontSelect") as HTMLSelectElement).addEventListener("change", updateFont);
    (document.getElementById("colorSelect") as HTMLInputElement).addEventListener("input", updateColor);
});
