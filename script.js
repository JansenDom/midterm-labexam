function isValidName(value) {
    var name;
    var index;
    var character;

    if (typeof value !== "string") {
        return false;
    }

    name = value.trim();

    if (name.length < 3) {
        return false;
    }

    for (index = 0; index < name.length; index = index + 1) {
        character = name.charAt(index);
        if (character >= "0" && character <= "9") {
            return false;
        }
    }

    return true;
}

function isValidEmail(value) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (typeof value !== "string") {
        return false;
    }

    return emailPattern.test(value.trim());
}

function isValidDescription(value) {
    if (typeof value !== "string") {
        return false;
    }

    return value.trim().length >= 5;
}

if (typeof document !== "undefined") {
    document.addEventListener("DOMContentLoaded", function () {
        const form = document.getElementById("lostItemForm");
        const reporterName = document.getElementById("reporterName");
        const reporterEmail = document.getElementById("reporterEmail");
        const itemDescription = document.getElementById("itemDescription");
        const lostLocation = document.getElementById("lostLocation");
        const confirmInfo = document.getElementById("confirmInfo");
        const clearBtn = document.getElementById("clearBtn");

        const reporterNameError = document.getElementById("reporterNameError");
        const reporterEmailError = document.getElementById("reporterEmailError");
        const itemDescriptionError = document.getElementById("itemDescriptionError");
        const lostLocationError = document.getElementById("lostLocationError");
        const confirmInfoError = document.getElementById("confirmInfoError");

        const resultSection = document.getElementById("resultSection");
        const resultHeading = document.getElementById("resultHeading");
        const resultDetails = document.getElementById("resultDetails");

        function clearErrors() {
            reporterNameError.textContent = "";
            reporterEmailError.textContent = "";
            itemDescriptionError.textContent = "";
            lostLocationError.textContent = "";
            confirmInfoError.textContent = "";
        }

        function hideResult() {
            resultHeading.textContent = "";
            resultDetails.textContent = "";
            resultSection.style.display = "none";
        }

        hideResult();

        form.addEventListener("submit", function (event) {
            var nameOk;
            var emailOk;
            var descriptionOk;
            var locationOk;
            var confirmOk;

            event.preventDefault();

            nameOk = isValidName(reporterName.value);
            emailOk = isValidEmail(reporterEmail.value);
            descriptionOk = isValidDescription(itemDescription.value);
            locationOk = lostLocation.value !== "";
            confirmOk = confirmInfo.checked;

            clearErrors();

            if (!nameOk) {
                reporterNameError.textContent = "Enter a valid name.";
            }
            if (!emailOk) {
                reporterEmailError.textContent = "Enter a valid email address.";
            }
            if (!descriptionOk) {
                itemDescriptionError.textContent = "Enter at least 5 characters.";
            }
            if (!locationOk) {
                lostLocationError.textContent = "Select where the item was lost.";
            }
            if (!confirmOk) {
                confirmInfoError.textContent = "Confirm that the information is correct.";
            }

            if (nameOk && emailOk && descriptionOk && locationOk && confirmOk) {
                resultHeading.textContent = "Lost Item Report Submitted";
                resultDetails.textContent =
                    "Student Name: " + reporterName.value.trim() + "\n" +
                    "Email Address: " + reporterEmail.value.trim() + "\n" +
                    "Item Description: " + itemDescription.value.trim() + "\n" +
                    "Location Lost: " + lostLocation.options[lostLocation.selectedIndex].text;
                resultSection.style.display = "block";
                return true;
            }

            resultHeading.textContent = "Submission failed";
            resultDetails.textContent = "The report could not be saved.";
            resultSection.style.display = "block";
            return false;
        });

        clearBtn.addEventListener("click", function () {
            reporterName.value = "";
            reporterEmail.value = "";
            itemDescription.value = "";
            lostLocation.selectedIndex = 0;
            confirmInfo.checked = false;

            clearErrors();
            hideResult();
        });
    });
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        isValidName: isValidName,
        isValidEmail: isValidEmail,
        isValidDescription: isValidDescription
    };
}