const { async } = require("postcss-js");

const inputSlider = document.querySelector("[data-lengthSlider]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyMsg = document.querySelector("[data-copyMsg]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const indicator = document.querySelector("[data-indicator]");
const copyBtn = document.querySelector("[data-copy]");
const uppercaseCheck = document.querySelector("#uppercase");
const LowercaseCheck = document.querySelector("#Lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolCheck = document.querySelector("#symbol");
const allCheckBox = document.querySelectorAll("input[type=Checkbox]")
const generateBtn = document.querySelector(".generateButton");

let symbols="{`~!@#$%^&*()_+-=[];\|,./{}:<>?}";

let password ="";
let passwordLength=10;
let checkCount=1;
handleSlider();
// set strength circle to grey



// set password length
function handleSlider(){
    inputSlider.value=passwordLength;
    lengthDisplay.innerText=passwordLength;
}

function setIndicator(color){
    indicator.style.backgroundColor=color;
    //shadow
}

function getRndInteger(min,max){
    return Math.floor(Math.random() * (max-min)) + min;
}

function generateRandomNumber(){
    return getRndInteger(0,9);
}

function generateLowerCase(){
    return string.formCharCode(getRndInteger(97,123))
}

function generateUpperCase(){
    return string.formCharCode(getRndInteger(65,91))
}

function generateSymbol(){
    const randNum = getRndInteger(0,symbols.length);
    return symbolCheck.charAt(randNum);
}


function calcStrength(){
    let hasUpper =false;
    let hasLower =false;
    let hasNumber =false;
    let hasSymbol =false;

    if(LowercaseCheck.checked) hasLower=true;
    if(uppercaseCheck.checked) hasUpper=true;
    if(numbersCheck.checked) hasNumber=true;
    if(symbolCheck.checked) hasSymbol=true;

    if(hasLower && hasUpper && (hasNumber || hasSymbol) && passwordLength>=8){
        setIndicator("#0f0")
    }
    else if((hasNumber || hasSymbol) && (hasUpper || hasLower) ){
        setIndicator("#ff0")
    }
    else{
        setIndicator("#f00")
    }
}

async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText="copied!";
    }
    catch(e){
        copyMsg.innerText="Failed!";
    }

    copyMsg.classList.add("active");
    setTimeout(() => {
        copyMsg.classList.remove("active");
    }, 2000);
}

function handleCheckboxChange(){
    checkCount=0;
    allCheckBox.forEach((checkbox)=>{
        if(checkbox.checked){
            checkCount++;
        }

    });

    if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlider();
    }
}
allCheckBox.forEach((checkbox)=>{
    checkbox.addEventListener('change',handleCheckboxChange);
})

inputSlider.addEventListener('input',(e)=>{
   passwordLength=e.target.value;
   handleSlider();
}) 


copyBtn.addEventListener('click',()=>{
    if(passwordDisplay.value){
        copyContent();
    }
})
