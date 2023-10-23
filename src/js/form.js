const formUser = document.querySelector(".user-data__form");
const formUserInputs = formUser.querySelectorAll(".user-data__input");
const buttonSubmit = document.querySelector(".paybutton");

function debounce(func, wait) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      func.apply(context, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function validateInput(input) {
  const inputID = input.id;
  const inputValue = input.value;

  const validationType = {
    name: {
      antiPattern: /[^a-zA-Zа-яА-ЯёЁ]/,
      isValid: (value) =>
        value === "" || !validationType["name"].antiPattern.test(value),
    },
    surname: {
      antiPattern: /[^a-zA-Zа-яА-ЯёЁ]/,
      isValid: (value) =>
        value === "" || !validationType["surname"].antiPattern.test(value),
    },
    email: {
      pattern: /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/,
      isValid: (value) =>
        value === "" || validationType["email"].pattern.test(value),
    },
    tel: {
      pattern: /^\+\d\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/,
      isValid: (value) =>
        value === "" || validationType["tel"].pattern.test(value),
    },
    itn: {
      isValid: (value) => value.length <= 14,
    },
  };

  const isInputValid = validationType[inputID]?.isValid(inputValue);

  const textInput = document.getElementById(inputID);
  const parent = textInput.closest(".form__input-wrapper");
  const warningBlock = parent.querySelector(".user-data__error-message");
  const inputValueLength = textInput.value.length > 0;

  if (!isInputValid) {
    warningBlock.classList.remove("hidden");
    textInput.classList.add("input-color");
    console.log(textInput);
    if (inputID == "name") {
      if (!inputValueLength) {
        warningBlock.textContent = "Проверьте имя";
      } else {
        warningBlock.textContent = "Укажите имя";
      }
    }
    if (inputID == "surname") {
      if (!inputValueLength) {
        warningBlock.textContent = "Проверьте фамилию";
      } else {
        warningBlock.textContent = "Укажите фамилию";
      }
    }

    if (inputID == "itn") {
      if (!inputValueLength) {
        warningBlock.textContent = "Проверьте ИНН";
      } else {
        warningBlock.textContent = "Укажите электронную почту";
      }
    }

    if (inputID == "tel") {
      if (!inputValueLength) {
        warningBlock.textContent = "Укажите номер телефона";
      } else {
        warningBlock.textContent = "Формат: +9 999 999 99 99";
      }
    }
    if (inputID == "email") {
      if (!inputValueLength) {
        warningBlock.textContent = "Укажите электронную почту";
      } else {
        warningBlock.textContent = "Проверьте адрес электронной почты";
      }
    }

    return false;
  } else {
    warningBlock.classList.add("hidden");
    textInput.classList.remove("input-color");
    input.oninput = "";
    return true;
  }
}
function phoneMask(phone) {
  const regex = /(\d?)(\d{3})(\d{3})(\d{2})(\d{2})/g;
  const subst = "+$1 ($2) $3-$4-$5";
  return phone.replace(regex, subst);
}

formUserInputs.forEach((input) => {
  input.addEventListener(
    "input",
    debounce(() => validateInput(input), 400)
  );
});

function handleTelInputChange(input) {
  const inputValue = input.value.replace(/\D/g, "");
  let formattedValue = phoneMask(inputValue);
  input.value = formattedValue;
}

formUser.querySelectorAll("input").forEach((input) => {
  const parent = input.closest(".form__input-wrapper");
  const tittleInput = parent.querySelector(".info__placeholder");
  input.onfocus = () => {
    input.removeAttribute("placeholder");
    tittleInput.classList.remove("hidden");

    if (input.id == "itn") {
      parent?.querySelector(".user-data__itn-info").classList.add("hidden");
    }
  };
  input.onblur = () => {
    input.setAttribute("placeholder", tittleInput.textContent);
    tittleInput.classList.add("hidden");
    if (!input.value) return;
    input.oninput = () => validateInput(input);
    validateInput(input);
  };
  if (input.id === "tel") {
    input.addEventListener("input", () => handleTelInputChange(input));
  }
});

const validateForm = () => {
  let count = 0;
  formUserInputs.forEach((input) => {
    const parent = input.closest(".form__input-wrapper");
    const errorMessage = parent.querySelector("user-data__error-message");
    const errorBlock = errorMessage?.classList.contains("hidden");
    if (input.value == "" || errorBlock) {
      count++;
    }
  });
  console.log(count);
  count > 0 ? alert("Проверьте данные") : alert("Заказ успешно оформлен!");
};

buttonSubmit.addEventListener("click", validateForm);
