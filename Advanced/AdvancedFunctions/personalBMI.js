function processPatient(name, age, weight, height) {
    let BMI = calculateBMI(weight, height);
    let status = getStatus(BMI);
    let personalInfo = {
        "age": age,
        "weight": weight,
        "height": height,
    };
    let patient = {
        "name": name,
        "personalInfo": personalInfo,
        "BMI": BMI,
        "status": status,
    };
    makeRecommendation(status);
    return patient;

    function calculateBMI(weight, height) {
        let heightInMeters = Number(height / 100);
        let BMI = weight / (heightInMeters * heightInMeters);
        return Math.round(BMI);
    }

    function makeRecommendation(status) {
        const admissionRequirements = {
            "obese": "admit"
        };
        if (admissionRequirements[status] !== undefined) {
            patient["recommendation"] = "admission required";
        }
    }

    function getStatus(BMI) {
        let status;
        if (BMI >= 30) {
            status = "obese";
        } else if (BMI >= 25) {
            status = "overweight";
        } else if (BMI > 18.5) {
            status = "normal";
        } else {
            status = "underweight";
        }
        return status;
    }
}
// console.log(processPatient("Peter", 9, 57, 137));