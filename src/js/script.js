const items = [
  {
    cost: 99,
    count: 6,
    late: 4,
    shippingSchedule: [
      {
        date: "5—6 февраля",
        maxQuantity: 6,
      },
    ],
  },

  {
    cost: 1050,
    count: 9,
    late: 2,
    shippingSchedule: [
      {
        date: "5—6 февраля",
        maxQuantity: 2,
      },
      {
        date: "7—8 февраля",
        maxQuantity: 9,
      },
    ],
  },

  {
    cost: 247,
    count: 4,
    late: 5,
    shippingSchedule: [
      {
        date: "5—6 февраля",
        maxQuantity: 4,
      },
    ],
  },
];

const delivery = [
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

const availableProductSection = document.querySelector(".basket-form__content");
const unavailableProductSection = document.querySelector(".unavailable");
const basketButton = document.querySelector(".basket__button");
const basketCountProducts = document.querySelector(".basket__menu-hidden");

const closedAvailableList = availableProductSection.querySelector(".icon");
const closedUnavailableList = unavailableProductSection.querySelector(".icon");
const availableCount = availableProductSection.querySelector(".count");
const unavailableCount = unavailableProductSection.querySelector(".count");
const allGoodsButton = document.querySelector(".basket__input");

const cards = document.querySelectorAll(".accordion__item");
const counterProducts = document.querySelector(".basket__menu-hidden .count");
const totalPriceWrapper = document.querySelector(".total__price span");
const oldPrice = document.querySelector(".sidebar__description .old-price");
const saleTotal = document.querySelector(".sidebar__description .sale-total");
const counterProductsHidden = document.querySelector(
  ".basket__menu-hidden .amount"
);
const deleteButtons = document.querySelectorAll(".button__delete");
const cardInputs = document.querySelectorAll(".card__input");
const counterCheckedProducts = document.querySelector(".count-goods");
const productElementsInputs = document.querySelectorAll(
  ".count-button__numeric"
);
const adress = document.querySelector(".sidebar__adress");
const adressPoint = document.querySelector(".delivery__adress");
const raitingPoint = document.querySelector(".raiting-value");
const unavailableTitle = document.querySelector(".unavailable__title");

const sale = 0.55;
const userSale = 0.1;
const saleIncrement = 1 + sale + userSale;

const formatNumber = (number) =>
  number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, " ");

const addEnding = (number, txt, cases = [2, 0, 1, 1, 1, 2]) =>
  txt[
    number % 100 > 4 && number % 100 < 20
      ? 2
      : cases[number % 10 < 5 ? number % 10 : 5]
  ];

const addProductQuantity = (text) => {
  const tagQuantity = text.innerHTML;
  const numberArray = tagQuantity.match(/\d+/g);
  const count = parseInt(numberArray);
  const declinedWord = addEnding(count, ["товар", "товара", "товаров"]);
  return (text.innerHTML = `${count} ${declinedWord}`);
};

const hiddenProductList = (section, button) => {
  section.classList.add("open");
  const accordion = section.querySelector(".accordion");
  accordion.classList.toggle("hidden__list");
  button.classList.toggle("closed");

  if (section.classList.contains("basket-form__content")) {
    basketButton.classList.toggle("visually-hidden");
    basketCountProducts.classList.toggle("visually-hidden");
  }
};

closedAvailableList.addEventListener("click", () =>
  hiddenProductList(availableProductSection, closedAvailableList)
);

closedUnavailableList.addEventListener("click", () =>
  hiddenProductList(unavailableProductSection, closedUnavailableList)
);

const depictValues = (sum) => {
  if (sum === 0) {
    counterCheckedProducts.classList.add("visually-hidden");
    availableCount.classList.add("visually-hidden");
    basketCountProducts?.classList.add("hidden");
  } else {
    counterCheckedProducts.classList.remove("visually-hidden");
    availableCount.classList.remove("visually-hidden");
    basketCountProducts?.classList.remove("hidden");
    counterCheckedProducts.textContent = sum;
    availableCount.textContent = sum;
  }

  addProductQuantity(availableCount);
};

//Кнопка выбрать все

const activateButtonsCard = (buttons) => {
  let sum = 0;
  buttons.forEach((button) => {
    const parentCard = button.closest(".accordion__item");
    const productElementsInputs = parentCard.querySelector(
      ".count-button__numeric"
    );
    const dataValue = productElementsInputs.getAttribute("data-value");

    if (allGoodsButton.checked) {
      parentCard.classList.add("checked");
      button.checked = true;
      button.classList.add("checked");
      if (dataValue) {
        const numericValue = parseFloat(dataValue);
        sum += numericValue;
      }
    } else {
      parentCard.classList.remove("checked");
      sum === 0;
      button.checked = false;
      button.classList.remove("checked");
      allGoodsButton.classList.remove("checked");
    }
  });
  depictValues(sum);
  updateTooltip(parentCard);
};

allGoodsButton.addEventListener("click", () => activateButtonsCard(cardInputs));

// добавление колличества выбранных товароы в корзине

let count = 0;

const choiceButtons = document.querySelectorAll(".card__choice-button");

function updateSelectAllCheckbox() {
  let allChecked = true;
  cardInputs.forEach((checkbox) => {
    if (!checkbox.checked) {
      allChecked = false;
    }
  });
  allGoodsButton.checked = allChecked;
}

// Добавляем слушатели событий для чекбоксов
cardInputs.forEach((checkbox) => {
  checkbox.addEventListener("change", function () {
    if (this.checked) {
      count++;
      this.classList.add("checked");
    } else {
      count--;
      this.classList.remove("checked");
    }

    updateSelectAllCheckbox();
  });
});

const addSale = (element) => {
  const countButton = element.querySelector(".count-button__numeric");
  const actualityPrice = element.querySelector(".card__price--actuality");
  const count =
    Number(countButton.dataset.value) * Number(actualityPrice.dataset.price);
  const percentSale = element.querySelector(".popup__info-sale");
  const percentSaleDesktop = element.querySelector(
    ".card__price--total .popup__info-sale"
  );
  const saleShop = percentSale.querySelector(".sale-shop span");
  const saleUser = percentSale.querySelector(".sale-user span");
  const saleShopDesktop = percentSaleDesktop.querySelector(".sale-shop span");
  const saleUserDesktop = percentSaleDesktop.querySelector(".sale-user span");

  const setSaleShop = (count * sale).toFixed(0);
  const setSaleUser = (count * userSale).toFixed(0);

  saleShopDesktop.textContent =
    saleShopDesktop.value =
    saleShop.textContent =
    setSaleShop.value =
      formatNumber(setSaleShop);
  saleUserDesktop.textContent = saleUser.value = formatNumber(setSaleUser);
  saleUser.textContent = saleUser.value = formatNumber(setSaleUser);
};

const addPrice = (element) => {
  const countButton = element.querySelector(".count-button__numeric");
  const actualityPrice = element.querySelector(".card__price--actuality");
  const actualityPriceSpan = element.querySelector(
    ".card__price--actuality span"
  );
  const actualityPriceSpanDesktop = element.querySelector(
    ".card__price--total .card__price--actuality span"
  );
  const actualityPriceDesktop = element.querySelector(
    ".card__price--total .card__price--actuality"
  );
  const notCurrentCountSpan = element.querySelector(".notcurrent-count span");
  const notCurrentCount = element.querySelector(".notcurrent-count");
  const notCurrentCountSpanDesktop = element.querySelector(
    ".card__price--total .notcurrent-count span"
  );
  const notCurrentCountDesktop = element.querySelector(
    ".card__price--total .notcurrent-count"
  );

  const count =
    Number(countButton.dataset.value) * Number(actualityPrice.dataset.price);
  const formattedValue = formatNumber(count);

  actualityPriceSpan.textContent = actualityPriceSpanDesktop.textContent =
    formattedValue;
  actualityPrice.dataset.value = actualityPriceDesktop.dataset.value =
    formattedValue;

  const countSale = (count * saleIncrement).toFixed(0);
  notCurrentCount.dataset.value = notCurrentCountDesktop.dataset.value =
    countSale;
  notCurrentCountSpan.textContent = notCurrentCountSpanDesktop.textContent =
    formatNumber(countSale);
};

const updateTooltip = (cardItem) => {
  const count = cardItem?.querySelector(".count-button__numeric");
  const countButtonValue = count?.getAttribute("data-value");
  const countMaxProducts = count?.getAttribute("data-count");
  const cardField = cardItem.querySelector(".count__limited");

  let value = Number(countMaxProducts) - Number(countButtonValue);

  if (cardField) {
    if (value != 0 && value <= 4) {
      cardField.textContent = `Осталось ${value} шт.`;
    } else {
      cardField.textContent = " ";
    }
  }
};

function changeProductCount() {
  let sum = 0;
  const activeInputs = Array.from(productElementsInputs).filter(
    (input) => !input.closest(".remove")
  );
  const checkedCards = Array.from(activeInputs).filter((input) =>
    input.closest(".accordion__item.checked")
  );

  checkedCards.forEach((product) => {
    const dataValue = product.getAttribute("data-value");
    const parentCard = product.closest(".accordion__item");
    const parentChecked = parentCard.classList.contains("checked");
    if (dataValue) {
      const numericValue = parseFloat(dataValue);
      parentChecked ? (sum += numericValue) : (sum -= numericValue);
    }
    updateTooltip(product);
  });

  if (sum === 0) {
    counterCheckedProducts.classList.add("visually-hidden");
    availableCount.classList.add("visually-hidden");
    basketCountProducts?.classList.add("hidden");
  } else {
    counterCheckedProducts.classList.remove("visually-hidden");
    availableCount.classList.remove("visually-hidden");
    basketCountProducts?.classList.remove("hidden");
    counterCheckedProducts.textContent = sum;
    availableCount.textContent = sum;
  }

  addProductQuantity(availableCount);
}

const checkedCards = () => {
  cards.forEach((card) => {
    const activeCardButton = card.querySelector(".card__input");
    if (activeCardButton?.classList.contains("checked")) {
      card?.classList.add("checked");
    } else {
      card?.classList.remove("checked");
    }
  });
};

const setTotalPrice = (value) => {
  totalPriceWrapper.textContent = formatNumber(value);
  counterProductsHidden.textContent = formatNumber(value);
  totalPriceWrapper.dataset.value = value;
  calculateOldPrice(value);
};

const calculateOldPrice = (value) => {
  const countOldPrice = formatNumber((value * saleIncrement).toFixed(0));
  const countSale = formatNumber((value * (saleIncrement - 1)).toFixed(0));

  oldPrice.textContent = `${countOldPrice} сом`;
  saleTotal.textContent = `${countSale} сом`;
};

const getSoldOutList = () => {
  let count = 0;
  const cards = document.querySelectorAll(".accordion__item");
  cards.forEach((card) => {
    if (card.classList.contains("sold-out")) {
      count++;
    }
  });
  if (count === 0) {
    unavailableTitle.classList.add("visually-hidden");
  } else {
    unavailableTitle.classList.remove("visually-hidden");
    unavailableCount.textContent = count;
    addProductQuantity(unavailableCount);
  }
};

// Функция удаления товара
function deleteProduct(event) {
  const productElement = event.target.closest(".card");
  const productID = productElement.dataset.id;
  const productElementChecked = productElement.classList.contains("checked");

  if (productID) {
    productElement.remove();
    productElement.classList.add("remove");
    const instockProductDesktop = productElement.querySelector(
      ".card__price--total .card__price--actuality span"
    );
    const instockProduct = productElement.querySelector(
      ".card__price--actuality span"
    );
    if (instockProduct || instockProductDesktop) {
      const count = instockProduct.textContent;
      if (count && productElementChecked) {
        const valueTotalPrice = totalPriceWrapper.dataset.value;
        const countTotalPrice = parseFloat(
          valueTotalPrice.replace(/\s/g, "").match(/\d+/)[0]
        );
        const countGoodsPrice = parseFloat(
          count.replace(/\s/g, "").match(/\d+/)[0]
        );
        const price = Number(countTotalPrice) - Number(countGoodsPrice);
        setTotalPrice(price);
        changeProductCount();
      }
    }
    getSoldOutList();
  }
}

const calculateTotalAfterUncheck = (event) => {
  const evt = event.target;
  const productElement = event.target.closest(".card");
  const count = productElement.querySelector(
    ".card__price--total .card__price--actuality"
  ).dataset.value;
  const input = evt.classList.contains("checked");

  const valueTotalPrice = totalPriceWrapper.dataset.value;
  const countTotalPrice = parseFloat(
    valueTotalPrice.replace(/\s/g, "").match(/\d+/)[0]
  );
  const countGoodsPrice = parseFloat(count.replace(/\s/g, "").match(/\d+/)[0]);

  let price;

  if (!input) {
    price = Number(countTotalPrice) - Number(countGoodsPrice);
    productElement.classList.remove("checked");
  } else {
    price = Number(countTotalPrice) + Number(countGoodsPrice);
    productElement.classList.add("checked");
  }
  setTotalPrice(price);
  changeProductCount();
  updateTooltip(productElement);
};
cardInputs.forEach((cardInput) =>
  cardInput.addEventListener("change", calculateTotalAfterUncheck)
);

const init = () => {
  let totalCost = 0;

  [...document.querySelectorAll(".accordion__item")].forEach((cardItem, i) => {
    const countButton = cardItem.querySelector(".count-button__numeric");
    const actualityPrice = cardItem.querySelector(".card__price--actuality");
    const actualityPriceSpan = cardItem.querySelector(
      ".card__price--actuality span"
    );
    const actualityPriceSpanDesktop = cardItem.querySelector(
      ".card__price--total .card__price--actuality span"
    );
    const actualityPriceDesktop = cardItem.querySelector(
      ".card__price--total .card__price--actuality"
    );
    const notCurrentCountSpan = cardItem.querySelector(
      ".card__price--not-current span"
    );
    const notCurrentCountSpanDesktop = cardItem.querySelector(
      ".card__price--total .card__price--not-current span"
    );

    if (countButton) {
      totalCost += Number(countButton.dataset.value) * Number(items[i].cost);

      actualityPrice.dataset.price = items[i].cost;
      actualityPriceSpan.textContent = items[i].cost;
      actualityPriceSpan.value = items[i].cost;
      actualityPrice.dataset.value = items[i].cost;
      countButton.dataset.count = items[i].count;

      actualityPriceSpanDesktop.dataset.value = items[i].cost;
      actualityPriceSpanDesktop.textContent = items[i].cost;
      actualityPriceDesktop.dataset.price = items[i].cost;
      actualityPriceDesktop.dataset.value = items[i].cost;
      adress.textContent = adressPoint.textContent = delivery[0].adress;
      raitingPoint.textContent = delivery[0].rating;

      if (notCurrentCountSpan) {
        const count = (items[i].cost * saleIncrement).toFixed(0);
        notCurrentCountSpan.textContent = count;
        notCurrentCountSpan.dataset.value = count;
        notCurrentCountSpanDesktop.textContent = count;
        notCurrentCountSpanDesktop.dataset.value = count;

        addSale(cardItem);
      }
    }
    updateTooltip(cardItem);
  });
  checkedCards();
  changeProductCount();
  getSoldOutList();
  setTotalPrice(totalCost);
};

const updateValue = (countProductElement, countProduct) => {
  if (countProductElement) {
    countProductElement.textContent = countProduct;
  }
};

const updateButtonState = (accordionItem, countProduct) => {
  const decrementButton = accordionItem.querySelector(".button--decrease");
  const increaseButton = accordionItem.querySelector(".button--increase");
  const counterTag = accordionItem.querySelector(".count-button__numeric");
  const countMax = counterTag.getAttribute("data-count");
  countProduct > 1
    ? decrementButton?.classList.remove("disabled")
    : decrementButton?.classList.add("disabled");
  countProduct < countMax
    ? increaseButton?.classList.remove("disabled")
    : increaseButton?.classList.add("disabled");
};

const calculateCounter = (accordionItem, action) => {
  const counterTag = accordionItem.querySelector(".count-button__numeric");
  const countMax = counterTag.getAttribute("data-count");
  if (accordionItem.classList.contains("checked")) {
    switch (action) {
      case "plus":
        if (counterTag.dataset.value < countMax) {
          counterTag.dataset.value++;
          counterTag.textContent = counterTag.dataset.value;
          setTotalPrice(
            Number(totalPriceWrapper.dataset.value) +
              Number(
                accordionItem.querySelector(".card__price--actuality").dataset
                  .price
              )
          );
          changeProductCount();
          updateTooltip(accordionItem);
        }

        break;
      case "minus":
        if (counterTag.dataset.value > 1) {
          counterTag.dataset.value--;
          counterTag.textContent = counterTag.dataset.value;
          setTotalPrice(
            Number(totalPriceWrapper.dataset.value) -
              Number(
                accordionItem.querySelector(".card__price--actuality").dataset
                  .price
              )
          );
          changeProductCount();
          updateTooltip(accordionItem);
        }

        break;
    }
  }

  addSale(accordionItem);
  addPrice(accordionItem);
  updateButtonState(accordionItem, counterTag.dataset.value);
};

availableProductSection.addEventListener("click", (evt) => {
  const target = evt.target;
  const minusButton = target.classList.contains("button--decrease");

  if (minusButton) {
    calculateCounter(target.closest(".accordion__item"), "minus");
  }

  if (target.classList.contains("button--increase")) {
    calculateCounter(target.closest(".accordion__item"), "plus");
  }
});

deleteButtons.forEach((button) =>
  button.addEventListener("click", deleteProduct)
);

init();
