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

function loadCVData(): void {
    const savedData = localStorage.getItem("cvData");

    if (savedData) {
        const cvData: FormData = JSON.parse(savedData);

        // Update Personal Information
        const nameElement = document.getElementById("cvName") as HTMLElement;
        const emailElement = document.getElementById("cvEmail") as HTMLElement;
        const phoneElement = document.getElementById("cvPhone") as HTMLElement;
        const addressElement = document.getElementById("cvAddress") as HTMLElement;
        const imageElement = document.getElementById("cvImage") as HTMLImageElement;

        nameElement.textContent = cvData.personalInfo.name;
        emailElement.textContent = cvData.personalInfo.email;
        phoneElement.textContent = cvData.personalInfo.phone;
        addressElement.textContent = cvData.personalInfo.address;
        imageElement.src = cvData.personalInfo.image;

        // Update Summary
        const summaryElement = document.getElementById("cvSummary") as HTMLElement;
        summaryElement.textContent = cvData.summary;

        // Update Skills
        const skillsContainer = document.getElementById("cvSkills") as HTMLElement;
        skillsContainer.innerHTML = cvData.skills.map(skill => `<p>${skill}</p>`).join('');

        // Update Languages
        const languagesContainer = document.getElementById("cvLanguages") as HTMLElement;
        languagesContainer.innerHTML = cvData.languages.map(language => `<p>${language}</p>`).join('');

        // Update Experience
        const experienceContainer = document.getElementById("cvExperience") as HTMLElement;
        experienceContainer.innerHTML = cvData.experience.map(job => `<p>${job}</p>`).join('');

        // Update Education
        const educationContainer = document.getElementById("cvEducation") as HTMLElement;
        educationContainer.innerHTML = cvData.education.map(edu => `<p>${edu}</p>`).join('');
    }
}

document.addEventListener("DOMContentLoaded", () => {
    loadCVData();
});
