// Utility function to create labeled input
function createLabeledInput(labelText, type, name) {
    var container = document.createElement("div");
    var label = document.createElement("label");
    label.textContent = labelText;
    var input = document.createElement("input");
    input.type = type;
    input.name = name;
    input.required = true;
    container.appendChild(label);
    container.appendChild(input);
    return container;
}
// Utility function to create a "Remove" button
function createRemoveButton(container) {
    var removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.textContent = "Remove";
    removeBtn.className = "remove-btn";
    removeBtn.onclick = function () { return container.remove(); };
    return removeBtn;
}
// Function to add fields dynamically based on section type
function addSection(section) {
    var container;
    switch (section) {
        case "education":
            container = document.getElementById("education-container");
            if (container) {
                var educationGroup = document.createElement("div");
                educationGroup.appendChild(createLabeledInput("Passing Year", "date", "passingYear"));
                educationGroup.appendChild(createLabeledInput("Degree", "text", "degree"));
                educationGroup.appendChild(createRemoveButton(educationGroup));
                container.appendChild(educationGroup);
            }
            break;
        case "skills":
            container = document.getElementById("skills-container");
            if (container) {
                var skillGroup = document.createElement("div");
                skillGroup.appendChild(createLabeledInput("Skill", "text", "skill"));
                skillGroup.appendChild(createRemoveButton(skillGroup));
                container.appendChild(skillGroup);
            }
            break;
        case "languages":
            container = document.getElementById("languages-container");
            if (container) {
                var languageGroup = document.createElement("div");
                languageGroup.appendChild(createLabeledInput("Language", "text", "language"));
                languageGroup.appendChild(createRemoveButton(languageGroup));
                container.appendChild(languageGroup);
            }
            break;
        case "experience":
            container = document.getElementById("experience-container");
            if (container) {
                var experienceGroup = document.createElement("div");
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
// Attach event listeners to buttons after DOM content is loaded
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("button[onclick^='addSection']").forEach(function (button) {
        button.addEventListener("click", function (event) {
            var _a, _b;
            var buttonElement = event.currentTarget;
            var section = (_b = (_a = buttonElement.getAttribute("onclick")) === null || _a === void 0 ? void 0 : _a.match(/'(.+?)'/)) === null || _b === void 0 ? void 0 : _b[1];
            if (section) {
                addSection(section);
            }
        });
    });
});
