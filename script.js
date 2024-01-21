function calculateBMI() {
    var age = parseInt(document.getElementById("age").value);
    var gender = document.getElementById("gender").value;
    var height = parseFloat(document.getElementById("height").value);
    var weight = parseFloat(document.getElementById("weight").value);

    if (isNaN(age) || age < 2 || age > 120 || isNaN(height) || height <= 0 || isNaN(weight) || weight <= 0) {
        alert("Please enter valid values for age, height, and weight.");
        return;
    }

    var bmi = calculateBMIValue(height, weight);
    var category = getBMICategory(bmi);
    var color = getCategoryColor(category);
    var bmiPrime = calculateBMIPrime(bmi);
    var ponderalIndex = calculatePonderalIndex(height, weight);
    var healthyWeightRange = calculateHealthyWeightRange(height);

    displayResult(bmi, category, color, bmiPrime, ponderalIndex, healthyWeightRange);
    updateProgressBar(bmi, color);
    displayCategoryIcon(category);
}

function calculateBMIValue(height, weight) {
    return (weight / Math.pow(height / 100, 2)).toFixed(1);
}

function getBMICategory(bmi) {
    if (bmi < 16) return "Severely Underweight";
    else if (bmi < 17) return "Underweight";
    else if (bmi < 18.5) return "Mildly Underweight";
    else if (bmi < 25) return "Normal Weight";
    else if (bmi < 30) return "Overweight";
    else if (bmi < 35) return "Obesity Class 1 (Moderate)";
    else if (bmi < 40) return "Obesity Class 2 (Severe)";
    else return "Obesity Class 3 (Very Severe)";
}

function getCategoryColor(category) {
    switch (category) {
        case "Severely Underweight":
        case "Underweight":
        case "Mildly Underweight":
            return "#3498db"; // Blue
        case "Normal Weight":
            return "#2ecc71"; // Green
        case "Overweight":
            return "#f1c40f"; // Yellow
        case "Obesity Class 1 (Moderate)":
        case "Obesity Class 2 (Severe)":
        case "Obesity Class 3 (Very Severe)":
            return "#e74c3c"; // Red
        default:
            return "#333";
    }
}

function calculateBMIPrime(bmi) {
    return (bmi / 25).toFixed(2);
}

function calculatePonderalIndex(height, weight) {
    return (weight / Math.pow(height / 100, 3)).toFixed(1);
}

function calculateHealthyWeightRange(height) {
    var lowerLimit = (18.5 * Math.pow(height / 100, 2)).toFixed(1);
    var upperLimit = (25 * Math.pow(height / 100, 2)).toFixed(1);
    return `${lowerLimit} kg - ${upperLimit} kg`;
}

function displayResult(bmi, category, color, bmiPrime, ponderalIndex, healthyWeightRange) {
    document.getElementById("result").style.borderColor = color;
    document.getElementById("result").style.color = color;
    document.querySelector(".bmi-result").innerHTML = `BMI = ${bmi} kg/m<sup>2</sup> (${category})`;
    document.querySelector(".bmi-category-description").innerHTML = `Healthy BMI range: ${calculateHealthyWeightRange(180)} kg/m<sup>2</sup>`;
    document.querySelector(".additional-info").innerHTML = `BMI Prime: ${bmiPrime}<br>Ponderal Index: ${ponderalIndex} kg/m<sup>3</sup>`;
}

function updateProgressBar(bmi, color) {
    var progressBar = document.getElementById("progressBar");
    progressBar.style.width = `${Math.min(bmi, 40) * 2.5}%`;
    progressBar.style.backgroundColor = color;
}

function displayCategoryIcon(category) {
    var icon = document.getElementById("bmiCategoryIcon");
    var iconPath = "";
    switch (category) {
        case "Severely Underweight":
        case "Underweight":
        case "Mildly Underweight":
            iconPath = "underweight.png";
            break;
        case "Normal Weight":
            iconPath = "normal.png";
            break;
        case "Overweight":
            iconPath = "overweight.png";
            break;
        case "Obesity Class 1 (Moderate)":
        case "Obesity Class 2 (Severe)":
        case "Obesity Class 3 (Very Severe)":
            iconPath = "obese.png";
            break;
        default:
            break;
    }
    icon.src = iconPath;
    icon.style.display = "block";
}

function resetForm() {
    document.getElementById("bmiForm").reset();
    resetResult();
}

function resetResult() {
    document.getElementById("result").style.borderColor = "#eee";
    document.getElementById("result").style.color = "#555";
    document.querySelector(".bmi-result").innerHTML = "";
    document.querySelector(".bmi-category-description").innerHTML = "";
    document.querySelector(".additional-info").innerHTML = "";
    document.getElementById("progressBar").style.width = "0";
    document.getElementById("bmiCategoryIcon").style.display = "none";
}

function saveResult() {
    alert("BMI Result Saved!");
}


