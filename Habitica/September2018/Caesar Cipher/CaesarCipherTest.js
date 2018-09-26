function encryptMain() {
    "use strict";
    let inputCipher = document.getElementById("inputCipher").value;
    let shiftCase = parseInt(document.getElementById("shift").value);
    let output = document.getElementById('outputCipher');
    
    console.log(newConvert(inputCipher, shiftCase));
    output.value = newConvert(inputCipher, shiftCase);
  }

function decryptMain() {
    "use strict";
    let textToDecrypt = document.getElementById("outputCipher").value;
    let reverseShift = (-1 * parseInt(document.getElementById("unshift").value));
    let output = document.getElementById('inputCipher');

    console.log(newConvert(textToDecrypt, reverseShift));
    output.value = newConvert(textToDecrypt, reverseShift);
}  

  
function shouldIShift(text, index) {
    console.log("Shift eligibility test. Unicode: " + text.charCodeAt(index));
    if ((text.charCodeAt(index) >= 65 && text.charCodeAt(index) <= 90) || (text.charCodeAt(index) >= 97 && text.charCodeAt(index) <= 122)) {
        console.log(text.charCodeAt(index) + " is eligible for shift.");
        return true;
    } else {
        console.log(text.charCodeAt(index) + " is not eligible for shift.");
        return false;
    }
}
  
function newConvert(text, shiftKey) {
    console.log(text);

    let newValue, newText = "";
    //For each letter in text
    for (let char in text) {
        let oldUnicode = text.charCodeAt(char);

        console.log(typeof char, char.constructor.name, char);
        console.log("Current character: " + oldUnicode);

        //Exclude everything except the alphabet from shift
        if (shouldIShift(text, char)) {
        
            let newUnicode = oldUnicode + shiftKey;
            //Uppercase letter
            if (oldUnicode >= 65 && oldUnicode <= 90) {
                console.log("This letter is uppercase");
                    //Address out-of-bounds cases for uppercase
                if (newUnicode > 90 || newUnicode < 65) {
                    console.log("Cycling uppercase");
                    newValue = cyclePosition(oldUnicode, shiftKey);
                } else {
                    console.log("No need to cycle. Within bounds.");
                    newValue = oldUnicode + shiftKey;
                }
            } 
        
            //Lowercase letter
            else {
                console.log("This letter is lowercase");
                    //Address out-of-bounds cases for lowercase
                if (newUnicode > 122 || newUnicode < 97) {
                    console.log("Cycling lowercase");
                    newValue = cyclePosition(oldUnicode, shiftKey);
                } else {
                    console.log("No need to cycle. Within bounds.");
                    newValue = oldUnicode + shiftKey;
                }
            }
        
        //Convert back to char and reassemble into string
        newText += String.fromCharCode(newValue);
        console.log("Newtext shifted, " + newText);
        
        } else {
            newText += text[char];
            console.log("Newtext samechar, " + newText);
      }
    }
    return newText;
  }
  
function cyclePosition(charaCode, shiftKey) {
    let newUnicode = charaCode + shiftKey;
    //Uppercase: 65 to 90
    if (newUnicode > 90) {
        //Consume shifts until Z, then resets position to before A with the remaining shifts
        console.log("Over 90: " + (64 + (newUnicode - 90)));
        return (64 + (newUnicode - 90));
    } else if (newUnicode < 65) {
        //Consume shifts until A, then resets position to after Z with the remaining shifts
        console.log("Under 65: " + (91 + (newUnicode - 65)));
        return (91 + (newUnicode - 65));
    }
    //Lowercase: 97 to 122
    else if (newUnicode > 122) {
        console.log("Over 122: " + (96 + (newUnicode - 122)));
        return (96 + (newUnicode - 122));
    } else if (newUnicode < 97) {
        console.log("Under 97: " + (123 + (newUnicode - 97)));
        return (123 + (newUnicode - 97));
    }
}