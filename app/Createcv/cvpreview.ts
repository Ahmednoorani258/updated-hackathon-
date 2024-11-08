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
        console.log("Retrieved CV Data:", cvData);

        if (cvData && cvData.personalInfo) {
            document.getElementById("cvName")!.textContent = cvData.personalInfo.name || "No name provided";
            document.getElementById("cvEmail")!.textContent = cvData.personalInfo.email || "No email provided";
            document.getElementById("cvPhone")!.textContent = cvData.personalInfo.phone || "No phone provided";
            document.getElementById("cvAddress")!.textContent = cvData.personalInfo.address || "No address provided";

            document.getElementById("cvSummary")!.textContent = cvData.summary || "No summary provided";

            const cvImage = document.getElementById("cvImage") as HTMLImageElement;
            if (cvData.personalInfo.image) {
                cvImage.src = cvData.personalInfo.image;
                cvImage.alt = "User's uploaded image";
            } else {
                cvImage.alt = "No image provided";
            }

            const populateSection = (sectionId: string, data: string[]) => {
                const container = document.getElementById(sectionId)!;
                container.innerHTML = "";
                data.forEach((item) => {
                    const p = document.createElement("p");
                    p.textContent = item;
                    container.appendChild(p);
                });
            };

            populateSection("cvEducation", cvData.education);
            populateSection("cvExperience", cvData.experience);
            populateSection("cvLanguages", cvData.languages);
            populateSection("cvSkills", cvData.skills);
        } else {
            console.log("cvData structure is incorrect or missing fields.");
        }
    } else {
        console.log("No CV data found in local storage.");
    }

    // Add scaling functionality for mobile devices
    function setScale() {
        const cvContainer = document.querySelector('.cv-container') as HTMLElement;
        const scaleFactor = Math.min(1, window.innerWidth / 210);
        cvContainer.style.setProperty('--scale-factor', scaleFactor.toString());
    }

    window.addEventListener('resize', setScale);
    setScale();
}

document.addEventListener("DOMContentLoaded", loadCVData);