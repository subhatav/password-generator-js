const copyIcon = document.querySelector(".input-box span");

const passwordInput = document.querySelector(".input-box input");
const passIndicator = document.querySelector(".pass-indicator");
const lengthSlider = document.querySelector(".pass-length input");
const passOptions = document.querySelectorAll(".option input");

const generateButton = document.querySelector(".generate-btn");

// Provide all the Letters, Numbers and Symbols
const passChars = {

  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  symbols: "^!$%&|[](){}:;.,*+-#@<>~",
  numbers: "0123456789",
};

const generatePassword = () => {

  let staticPassword = "";
  let randomPassword = "";

  let excludeDuplicate = false;
  let passLength = lengthSlider.value;

  // Loop through all the Options
  passOptions.forEach((option) => {

    if (option.checked) {

      if (option.id !== "exc-duplicate" && option.id !== "inc-spaces") {

        // Add particular Key value from `passChars` to `staticPassword`
        staticPassword += passChars[option.id];

      } else if (option.id === "inc-spaces") {

        // Add spaces at the beginning and the end of `staticPassword`
        staticPassword = `  ${staticPassword}  `;

      } else excludeDuplicate = true;
    }
  });

  for (let index = 0; index < passLength; index += 1) {

    // Pick a random Index from the Static Password
    const randomIndex = Math.floor(Math.random() * staticPassword.length);
    // Fetch the Character at the random Index picked
    const randomCharacter = staticPassword[randomIndex];

    if (excludeDuplicate) {

      !randomPassword.includes(randomCharacter) || randomCharacter == " "
                     ? (randomPassword += randomCharacter) : index -= 1;

    } else randomPassword += randomCharacter;
  }

  // Display the value of `randomPassword`
  passwordInput.value = randomPassword;
};

const updateIndicator = () => {

  // Determine the Password Strength according to its Length
  passIndicator.id = (lengthSlider.value <= 8) ? "weak" :
                     (lengthSlider.value <= 16) ? "medium" : "strong";
};

const updateSlider = () => {

  // Show the value of the Password Length Slider as the content of the Span
  document.querySelector(".pass-length span").innerText = lengthSlider.value;

  generatePassword();
  updateIndicator();
};

updateSlider();

const copyPassword = () => {

  // Copy the generated Password to the Clipboard
  navigator.clipboard.writeText(passwordInput.value);

  // Change Copy icon to Tick icon after copying
  copyIcon.innerText = "check";
  copyIcon.style.color = "#4285F4";

  // Change Tick icon back to Copy after 1 second
  setTimeout(() => {

    copyIcon.innerText = "copy_all";
    copyIcon.style.color = "#707070";

  }, 1000);
};

copyIcon.addEventListener("click", copyPassword);
lengthSlider.addEventListener("input", updateSlider);
generateButton.addEventListener("click", generatePassword);
