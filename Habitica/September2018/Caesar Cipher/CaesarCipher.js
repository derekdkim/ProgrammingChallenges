
function encryptMain() {
  "use strict";
  let inputCipher = document.getElementById("inputCipher").value;
  let shiftCase = parseInt(document.getElementById("shift").value);
  let output = document.getElementById('outputCipher');
  
  output.value = newConvert(inputCipher, shiftCase);
}

function decryptMain() {
  "use strict";
  let textToDecrypt = document.getElementById("outputCipher").value;
  let reverseShift = (-1 * parseInt(document.getElementById("unshift").value));
  let output = document.getElementById('inputCipher');

  output.value = newConvert(textToDecrypt, reverseShift);
}  


function shouldIShift(text, index) {
  if ((text.charCodeAt(index) >= 65 && text.charCodeAt(index) <= 90) || (text.charCodeAt(index) >= 97 && text.charCodeAt(index) <= 122)) {
      return true;
  } else {
      return false;
  }
}

function newConvert(text, shiftKey) {

  let newValue, newText = "";
  //For each letter in text
  for (let char in text) {
      let oldUnicode = text.charCodeAt(char);

      //Exclude everything except the alphabet from shift
      if (shouldIShift(text, char)) {

          let newUnicode = oldUnicode + shiftKey;

          //Uppercase letter
          if (oldUnicode >= 65 && oldUnicode <= 90) {
                  //Address out-of-bounds cases for uppercase
              if (newUnicode > 90 || newUnicode < 65) {
                  newValue = cyclePosition(oldUnicode, shiftKey);
              } else {
                  newValue = oldUnicode + shiftKey;
              }
          } 
      
          //Lowercase letter
          else {
                  //Address out-of-bounds cases for lowercase
              if (newUnicode > 122 || newUnicode < 97) {
                  newValue = cyclePosition(oldUnicode, shiftKey);
              } else {
                  newValue = oldUnicode + shiftKey;
              }
          }
      
      //Convert back to char and reassemble into string
      newText += String.fromCharCode(newValue);
      
      } else {
          newText += text[char];
    }
  }
  return newText;
}

function cyclePosition(charaCode, shiftKey) {
  
  let newUnicode = charaCode + shiftKey;

  //Uppercase: 65 to 90
  if (newUnicode > 90) {
      //Consume shifts until Z, then resets position to before A with the remaining shifts
      return (64 + (newUnicode - 90));
  } else if (newUnicode < 65) {
      //Consume shifts until A, then resets position to after Z with the remaining shifts
      return (91 + (newUnicode - 65));
  }
  //Lowercase: 97 to 122
  else if (newUnicode > 122) {
      return (96 + (newUnicode - 122));
  } else if (newUnicode < 97) {
      return (123 + (newUnicode - 97));
  }
}