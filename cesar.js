// Encode and decode buttons
const encodeBtn = document.querySelector("#encode");
const decodeBtn = document.querySelector("#decode");
// Text fields
const inputText = document.querySelector("#textInput");
const outputText = document.querySelector("#textOutput");
const keyField = document.querySelector("#key");
// Error popup
const errorPopup = document.querySelector("#errorPopup");
const errorBtn = document.querySelector("#errorBtn");
const errorText = document.querySelector("#errorText");
// Event listeners
encodeBtn.addEventListener("click", () => {
    if (inputText.value.length === 0) {
        errorText.innerHTML = "Entrez un texte à encoder";
        handleError();
    } else if (keyField.value.length === 0) {
        errorText.innerHTML = "Entrez un mot de passe";
        handleError();
    } else {
        errorPopup.style.display = "none";
        errorText.innerHTML = "";
        transformText("encode")
}});

decodeBtn.addEventListener("click", () => {
    if (inputText.value.length === 0) {
        errorText.innerHTML = "Entrez un texte à decoder";
        handleError();
    } else if (keyField.value.length === 0) {
        errorText.innerHTML = "Entrez un mot de passe";
        handleError();
    } else {
        errorPopup.style.display = "none";
        errorText.innerHTML = "";
        transformText("decode")
}});


/**
 * @returns A numeric key generated from the password
 */
function generateKey() {
    let keyNum = 0;
    for (let i = 0; i < keyField.value.length; i++) {  // For each character in the password
        keyNum += (keyField.value.charCodeAt(i) * i);        // Add the character's value to the keyNum
    }
    console.log(keyNum);
    return keyNum;
}


/**
 * This function encodes or decodes the text provided by the user
 * @param {string} operation - The operation ('encode' or 'decode') to perform
 */
function transformText(operation) {
    let key = generateKey();                                  // Generate the key
    let transformedText = "";

    for (let i = 0; i < inputText.value.length; i++) {        // For each character in the input text
        let charCode = inputText.value.charCodeAt(i);         // Get the character's value
        let transformedCharCode;                              // Variable to store the character's transformed value

        if (operation === "encode") {                         // Switch between encode and decode operations
            transformedCharCode = charCode + key;             // Encode the character by adding the key to it's value
        } else if (operation === "decode") {
            transformedCharCode = charCode - key;             // Decode the character by subtracting the key from it's value
        }
        let char = String.fromCharCode(transformedCharCode);  // Convert the transformed value to a character
        transformedText += char;                              // Add the character to the transformed text
    }
    outputText.value = transformedText;                       // Display the transformed text
}

/**
 * This function handles the error popup
 */
function handleError() {
    errorPopup.style.display = "flex";
    errorBtn.addEventListener("click", () => {errorPopup.style.display = "none"});
}