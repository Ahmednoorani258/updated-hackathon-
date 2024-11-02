
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
