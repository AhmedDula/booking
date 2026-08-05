const calculateNights = (checkIn, checkOut) => {
  const timeDifference = new Date(checkOut) - new Date(checkIn);

  const nights = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)); //time difference calculated in milliseconds
  return nights;
};

const priceCalculator = (pricePerNight, checkIn, checkOut) => {
  const nights = calculateNights(checkIn, checkOut);

  return nights * pricePerNight;
};

module.exports = priceCalculator;
