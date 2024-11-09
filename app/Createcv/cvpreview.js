function loadCVData() {
    const savedData = localStorage.getItem("cvData");
    if (savedData) {
        const cvData = JSON.parse(savedData);
        // Update Personal Information
        const nameElement = document.getElementById("cvName");
        const emailElement = document.getElementById("cvEmail");
        const phoneElement = document.getElementById("cvPhone");
        const addressElement = document.getElementById("cvAddress");
        const imageElement = document.getElementById("cvImage");
        nameElement.textContent = cvData.personalInfo.name;
        emailElement.textContent = cvData.personalInfo.email;
        phoneElement.textContent = cvData.personalInfo.phone;
        addressElement.textContent = cvData.personalInfo.address;
        imageElement.src = cvData.personalInfo.image;
        // Update Summary
        const summaryElement = document.getElementById("cvSummary");
        summaryElement.textContent = cvData.summary;
        // Update Skills
        const skillsContainer = document.getElementById("cvSkills");
        skillsContainer.innerHTML = cvData.skills.map(skill => `<p>${skill}</p>`).join('');
        // Update Languages
        const languagesContainer = document.getElementById("cvLanguages");
        languagesContainer.innerHTML = cvData.languages.map(language => `<p>${language}</p>`).join('');
        // Update Experience
        const experienceContainer = document.getElementById("cvExperience");
        experienceContainer.innerHTML = cvData.experience.map(job => `<p>${job}</p>`).join('');
        // Update Education
        const educationContainer = document.getElementById("cvEducation");
        educationContainer.innerHTML = cvData.education.map(edu => `<p>${edu}</p>`).join('');
    }
}
document.addEventListener("DOMContentLoaded", () => {
    loadCVData();
});
export {};
