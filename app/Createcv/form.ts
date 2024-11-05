



function createLabeledInput(labelText: string, type: string, name: string): HTMLDivElement {
    const container = document.createElement("div");

    const label = document.createElement("label");
    label.textContent = labelText;

    const input = document.createElement("input");
    input.type = type;
    input.name = name;
    input.required = true;

    container.appendChild(label);
    container.appendChild(input);
    return container;
}


function createRemoveButton(container: HTMLElement): HTMLButtonElement {
    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.textContent = "Remove";
    removeBtn.className = "remove-btn";
    removeBtn.onclick = () => container.remove();
    return removeBtn;
}


function addSection(section: string) {
    let container;
    
    switch (section) {
        case "education":
            container = document.getElementById("education-container");
            if (container) {
                const educationGroup = document.createElement("div");

                educationGroup.appendChild(createLabeledInput("Passing Year", "date", "passingYear"));
                educationGroup.appendChild(createLabeledInput("Degree", "text", "degree"));
                educationGroup.appendChild(createRemoveButton(educationGroup));

                container.appendChild(educationGroup);
            }
            break;

        case "skills":
            container = document.getElementById("skills-container");
            if (container) {
                const skillGroup = document.createElement("div");

                skillGroup.appendChild(createLabeledInput("Skill", "text", "skill"));
                skillGroup.appendChild(createRemoveButton(skillGroup));

                container.appendChild(skillGroup);
            }
            break;

        case "languages":
            container = document.getElementById("languages-container");
            if (container) {
                const languageGroup = document.createElement("div");

                languageGroup.appendChild(createLabeledInput("Language", "text", "language"));
                languageGroup.appendChild(createRemoveButton(languageGroup));

                container.appendChild(languageGroup);
            }
            break;

        case "experience":
            container = document.getElementById("experience-container");
            if (container) {
                const experienceGroup = document.createElement("div");

                experienceGroup.appendChild(createLabeledInput("Start Year", "date", "startYear"));
                experienceGroup.appendChild(createLabeledInput("End Year", "date", "endYear"));
                experienceGroup.appendChild(createLabeledInput("Company", "text", "company"));
                experienceGroup.appendChild(createLabeledInput("Location", "text", "location"));
                experienceGroup.appendChild(createLabeledInput("Job Title", "text", "jobTitle"));
                experienceGroup.appendChild(createLabeledInput("Responsibilities", "text", "responsibilities"));
                experienceGroup.appendChild(createRemoveButton(experienceGroup));

                container.appendChild(experienceGroup);
            }
            break;

        default:
            console.error("Invalid section type");
    }
}

// this section is generated with chatgpt bcs in this i face lot of errors and i understand this section completely

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("button[onclick^='addSection']").forEach(button => {
        button.addEventListener("click", (event: Event) => {
            const buttonElement = event.currentTarget as HTMLButtonElement;
            const section = buttonElement.getAttribute("onclick")?.match(/'(.+?)'/)?.[1];
            if (section) {
                addSection(section);
            }
        });
    });
});


//getting data from form

function saveFormDataToLocalStorage() {
    const formElement = document.getElementById("cv-form") as HTMLFormElement;
    const formData = new FormData(formElement);

    const data: Record<string, any> = {
        personalInfo: {},
        education: [],
        skills: [],
        languages: [],
        experience: []
    };

    // Get personal information
    data.personalInfo.name = formData.get("name");
    data.personalInfo.designation = formData.get("designation");
    data.personalInfo.phone = formData.get("phone");
    data.personalInfo.email = formData.get("email");
    data.personalInfo.address = formData.get("address");

    // Get education data
    const educationContainer = document.getElementById("education-container");
    educationContainer?.querySelectorAll("div").forEach((group) => {
        const educationData: Record<string, string> = {};
        educationData.passingYear = (group.querySelector("input[name='passingYear']") as HTMLInputElement)?.value;
        educationData.degree = (group.querySelector("input[name='degree']") as HTMLInputElement)?.value;
        data.education.push(educationData);
    });

    // Get skills data
    const skillsContainer = document.getElementById("skills-container");
    skillsContainer?.querySelectorAll("input[name='skill']").forEach((input) => {
        data.skills.push((input as HTMLInputElement).value);
    });

    // Get languages data
    const languagesContainer = document.getElementById("languages-container");
    languagesContainer?.querySelectorAll("input[name='language']").forEach((input) => {
        data.languages.push((input as HTMLInputElement).value);
    });

    // Get experience data
    const experienceContainer = document.getElementById("experience-container");
    experienceContainer?.querySelectorAll("div").forEach((group) => {
        const experienceData: Record<string, string> = {};
        experienceData.startYear = (group.querySelector("input[name='startYear']") as HTMLInputElement)?.value;
        experienceData.endYear = (group.querySelector("input[name='endYear']") as HTMLInputElement)?.value;
        experienceData.company = (group.querySelector("input[name='company']") as HTMLInputElement)?.value;
        experienceData.location = (group.querySelector("input[name='location']") as HTMLInputElement)?.value;
        experienceData.jobTitle = (group.querySelector("input[name='jobTitle']") as HTMLInputElement)?.value;
        experienceData.responsibilities = (group.querySelector("input[name='responsibilities']") as HTMLInputElement)?.value;
        data.experience.push(experienceData);
    });

    // Save data to local storage
    localStorage.setItem("cvFormData", JSON.stringify(data));
    alert("CV data saved to local storage!");
}

function logFormDataFromLocalStorage() {
    const storedData = localStorage.getItem("cvFormData");
    
    if (storedData) {
        const data = JSON.parse(storedData);
        console.log("CV Data:", data);
    } else {
        console.log("No CV data found in local storage.");
    }
}


// Add event listener for form submission
document.getElementById("cv-form")?.addEventListener("submit", (event: Event) => {
    event.preventDefault();  // Prevent form submission
    const form = document.getElementById("cv-form") as HTMLFormElement;
    if (form.reportValidity()) {
        // Proceed only if all required fields are filled
        saveFormDataToLocalStorage();
        logFormDataFromLocalStorage();
      } else {
        console.warn("Please complete all required fields.");
      }
});


