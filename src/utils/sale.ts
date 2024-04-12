const getPriceBasedOnBattery = (basePrice: number, battery: number) => {
  let price = null;

  if (battery === 100) {
    price = getPercentageValue(basePrice, 2);
  } else if (battery >= 90) {
    price = basePrice;
  } else if (battery >= 80) {
    price = getPercentageValue(basePrice, -5);
  } else {
    price = getPercentageValue(basePrice, -8);
  }

  return price;
};

const getPercentageValue = (value: number, percentage: number) => {
  return value + value * (percentage / 100);
};

export { getPriceBasedOnBattery };
