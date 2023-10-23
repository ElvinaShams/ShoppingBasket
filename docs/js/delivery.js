const deliveryButton = document.querySelector("button.delivery__change");
const deliverySidebarButton = document.querySelector("#sidebar-change");
const deliveryModal = document.querySelector(".delivery__modal");
const pickupModal = document.querySelector(".delivery__modal");
const closeButton = document.querySelector("button.close");
const pickupButton = document.querySelector(".pickup-location");
const courierServicesButton = document.querySelector("button.courier-services");
const pickup = document.querySelector(".pickup");
const courierServices = document.querySelector("div.courier-services");
const deliveryForm = document.querySelector(".delivery__form");
const deliveryInput = document.querySelector(".location__input");
const sidebarAdress = document.querySelector(".sidebar__adress");
const deliveryAdress = document.querySelector(".delivery__adress-change");
const shippingChange = document.querySelector(".shipping-change");
const shippingForm = document.querySelector(".delivery__form");
const sidebarDeliveryTitle = document.querySelector(".sidebar__delivery-title");
const Raiting = document.querySelector(".rating");
const raitingSipping = document.querySelector(".location");
const shippingInfoType = document.querySelector(".delivery__point");
const raitingValue = document.querySelector(".raiting-value");

const deliveryAdressList = [
  {
    adress: " г. Бишкек, микрорайон Джал, улица Ахунбаева Исы, д. 67/1",
    rating: null,
  },
  {
    adress: " г. Бишкек, микрорайон Джал, улица Ахунбаева Исы, д. 67/1",
    rating: "4.9",
  },
  {
    adress: "г. Бишкек, улица Табышалиева, д. 57",
    rating: "4.9",
  },
];

function onModalKeyDown(evt) {
  if (evt.key === "Escape") {
    closeModal();
  }
}

const closeModal = () => {
  deliveryModal.classList.add("hidden");
  document.body.classList.remove("modal-open");
  document.removeEventListener("keydown", onModalKeyDown);
  shippingForm.reset();
};

function openModal() {
  deliveryModal.classList.remove("hidden");
  document.body.classList.add("modal-open");
  document.addEventListener("keydown", onModalKeyDown);
}

function openPickup() {
  pickup.classList.remove("hidden");
  courierServices.classList.add("hidden");
  pickupButton.classList.add("button--active");
  courierServicesButton.classList.remove("button--active");
  deliveryForm.classList.add("open-pickup");
  deliveryForm.classList.remove("open-courier");
  shippingInfoType.textContent = "Пункт выдачи";
  sidebarDeliveryTitle.textContent = "Доставка в пункт выдачи";
}

function openCourierServices() {
  courierServices.classList.remove("hidden");
  pickup.classList.add("hidden");
  courierServicesButton.classList.add("button--active");
  pickupButton.classList.remove("button--active");
  deliveryForm.classList.remove("open-pickup");
  deliveryForm.classList.add("open-courier");
  shippingInfoType.textContent = "Доставит курьер";
  sidebarDeliveryTitle.textContent = "Доставит курьер";
}

const changeShipping = (event) => {
  event.preventDefault();
  const evt = event.target;
  switch (evt.id) {
    case "location__radio-1": {
      sidebarAdress.textContent = deliveryAdress.textContent = deliveryAdressList[0].adress;
      raitingValue.textContent = deliveryAdressList[0].rating;
      console.log(deliveryAdressList[0].rating);
      break;
    }
    case "location__radio-2": {
      sidebarAdress.textContent = deliveryAdress.textContent = deliveryAdressList[1].adress;
      raitingValue.textContent = deliveryAdressList[1].rating;
      break;
    }
    case "location__radio-3": {
      sidebarAdress.textContent = deliveryAdress.textContent = deliveryAdressList[2].adress;
      raitingValue.textContent = deliveryAdressList[2].rating;
      break;
    }
    case "courier-services__radio-1": {
      sidebarAdress.textContent = deliveryAdress.textContent = "г. Бишкек, улица Табышалиева, д. 57";
      break;
    }
    case "courier-services__radio-2": {
      sidebarAdress.textContent = deliveryAdress.textContent = "Бишкек, улица Жукеева-Пудовкина, 77/1";
      break;
    }
    case "courier-services__radio-3": {
      sidebarAdress.textContent = deliveryAdress.textContent = "Бишкек, микрорайон Джал, улица Ахунбаева Исы, 67/1";
      break;
    }
  }
  shippingChange.addEventListener("click", closeModal);
};

const initDelivery = () => {
  deliveryButton.addEventListener("click", openModal);
  deliverySidebarButton.addEventListener("click", openModal);
  closeButton.addEventListener("click", closeModal);
  pickupButton.addEventListener("click", openPickup);
  courierServicesButton.addEventListener("click", openCourierServices);
  shippingForm.addEventListener("input", changeShipping);
};

initDelivery();
