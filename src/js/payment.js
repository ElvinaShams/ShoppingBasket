const paymentButton = document.querySelector("button.payment__change");
const paymentSidebarButton = document.querySelector(
  "input.sidebar__input-agreement"
);
const paymentModal = document.querySelector(".payment__modal");
const closePaymentButton = paymentModal.querySelector("button.close");
const paymentFormHeader = document.querySelector(".payment__header");
const paymentSidebar = document.querySelector(".sidebar__payment");
const paymentSidebarInfo = document.querySelector(".sidebar__info-card");
const sidebarInfo = document.querySelector(".sidebar__information");
const paymentChange = document.querySelector(".sidebar__payment-change");
const dataIdValue = "total-price";

const payButton = document.querySelector(".paybutton");
const paymentForm = document.querySelector(".payment__form");
const paymentSubmitButton = document.querySelector(".payment-submit");
const paymentNumberCard = document.querySelector(".payment__number-card");
const paymentNumberImage = document.querySelector(".payment__bank img");
const paymentSidebarImage = document.querySelector(
  ".sidebar__info-card .payment__bank img"
);

function onModalKeyDown(evt) {
  if (evt.key === "Escape") {
    closeModal();
  }
}

const closePaymentModal = () => {
  paymentModal.classList.add("hidden");
  document.body.classList.remove("modal-open");
  document.removeEventListener("keydown", onModalKeyDown);
  paymentForm.reset();
};

function openPaymentModal() {
  paymentModal.classList.remove("hidden");
  document.body.classList.add("modal-open");
  document.addEventListener("keydown", onModalKeyDown);
}

const changeTextButton = (paymentSidebarButton) => {
  const payTotalPrice = document.querySelector(`.total__price span`);
  const totalPriceSpanValue = payTotalPrice?.getAttribute("data-value");
  if (paymentSidebarButton.classList.contains("checked")) {
    payButton.textContent = `Оплатить ${totalPriceSpanValue} сом`;
  } else {
    payButton.textContent = "Заказать";
  }
};

const checkedPaymentInfo = () => {
  if (paymentSidebarButton.checked) {
    paymentSidebar.classList.remove("hidden-payment");
    paymentSidebarInfo.classList.remove("hidden-payment");
    sidebarInfo.classList.add("hidden");
    paymentSidebarButton.classList.add("checked");
  } else {
    paymentSidebar.classList.add("hidden-payment");
    paymentSidebarInfo.classList.add("hidden-payment");
    sidebarInfo.classList.remove("hidden");
    paymentSidebarButton.classList.remove("checked");
  }
  changeTextButton(paymentSidebarButton);
};

const changePayment = (event) => {
  event.preventDefault();
  const evt = event.target;
  switch (evt.id) {
    case "radio-1": {
      paymentNumberCard.textContent = "1234 56•• •••• 1234";
      paymentNumberImage.src = paymentSidebarImage.src =
        "./image/card-bank/mir.svg";

      break;
    }
    case "radio-2": {
      paymentNumberCard.textContent = "1234 56•• •••• 1234";
      paymentNumberImage.src = paymentSidebarImage.src =
        "./image/card-bank/visa.svg";
      break;
    }
    case "radio-3": {
      paymentNumberCard.textContent = "1234 56•• •••• 1234";
      paymentNumberImage.src = paymentSidebarImage.src =
        "./image/card-bank/mastercard.svg";
      break;
    }
    case "radio-4": {
      paymentNumberCard.textContent = "1234 56•• •••• 1234";
      paymentNumberImage.src = paymentSidebarImage.src =
        "./image/card-bank/maestro.svg";
      break;
    }
  }
  paymentSubmitButton.addEventListener("click", closePaymentModal);
};
paymentForm.addEventListener("input", changePayment);

const initPayment = () => {
  paymentButton.addEventListener("click", openPaymentModal);
  paymentSidebarButton.addEventListener("change", checkedPaymentInfo);
  paymentChange.addEventListener("click", openPaymentModal);
  closePaymentButton.addEventListener("click", closePaymentModal);
};

initPayment();
