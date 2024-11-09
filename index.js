//Classes
//User Class (Name, Gender, Weight, Age, Height, BMR, Diet)

//Diet Class (Meal #, Calories, Protein, Carbs, Fat, Foods)

//Food Class (Name, Food Type, Min Portion Size, Max Portion Size, Macros)

//Macros Class (Calories, Protein, Carbs, Fat)


//Variables
const macroLabel = document.getElementById("macroLabel");
const macrosLabel = document.getElementById("macrosLabel");

const macroCalc = document.getElementById("macroCalc");
const macroInput = document.getElementById("macros");
const enter = document.getElementById("submit");

macroCalc.onclick = goToMacCalc;


//Display Macro Calculator
function goToMacCalc(){
    macroInput.style.display="block";
}
//Hide Macro Calculator



//Get User Data
function userInput(){
    let gender = 0;
    let activityLevel = 2;
    let weight = Number(document.getElementById("weight").value);
    let age = Number(document.getElementById("age").value);
    let feet = Number(document.getElementById("feet").value);
    let inches = Number(document.getElementById("inches").value);
    let high = document.getElementById("High");
    let low = document.getElementById("Low");
    let male = document.getElementById("Male");
    let height = Number(feet)*12 + Number(inches);
    let bulk = document.getElementById("bulk");
    let cut = document.getElementById("cut");
    let maintain = document.getElementById("maintain");
    enter.onclick = userInput;
    let bcm = 1;
    if (bulk.checked){
        bcm = 2;
    }else if (cut.checked){
        bcm = 3;
    }else if (maintain.checked){
        bcm = 1;
    }
    gender = (male.checked) ? 1:2;

    if(high.checked){
        activityLevel = 3;
    } else if(low.checked){
        activityLevel = 1;
    }
    console.log(`height: ${height}`);
    console.log(`gender: ${gender}`);
    console.log(`lvl: ${activityLevel}`);

    calcMacros(age,weight,height,activityLevel,gender,bcm);
}

//Use User Data to Calculate Macros
function calcMacros(Age,Weight,Height,ActivityLevel,Gender,BCM){
    let BMR;
    let callow;
    let calhigh;
    if (Gender === 1) {
        BMR = 66.5 + (13.75 * (Weight * 0.454)) + (5.003 * (Height * 2.54)) - (6.75 * Age);
    }
    else {
        BMR = 655.1 + (9.563 * (Weight * 0.454)) + (1.850 * (Height * 2.54)) - (4.676 * Age);
    }

    switch (ActivityLevel)
    {
        case 3:
            BMR *= 1.7;
            break;
        case 2:
            BMR *= 1.55;
            break;
        case 1:
            BMR *= 1.375;
            break;
        default:
            console.log(ActivityLevel);
    }

    if (BCM===2){
        callow = BMR+((Weight*0.005)*500);
        calhigh = BMR+((Weight*0.01)*500);
        macroLabel.textContent= `${Math.floor(callow)}-${Math.floor(calhigh)}`;
    }else if(BCM===3){
        callow = BMR-((Weight*0.005)*500);
        calhigh = BMR-((Weight*0.01)*500);
        macroLabel.textContent= `${Math.floor(calhigh)}-${Math.floor(callow)}`;
    }else{
        macroLabel.textContent= `${Math.floor(BMR)}`;
    }
    macrosLabel.textContent= `Protein: ${Math.floor(Weight*.8)}-${Math.floor(Weight)}g`;

}
