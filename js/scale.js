const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

const decreaseScaleButton = document.querySelector('.scale__control--smaller');
const increaseScaleButton = document.querySelector('.scale__control--bigger');
const scaleInput = document.querySelector('.scale__control--value');
const previewImageElement = document.querySelector('.img-upload__preview img');

const scaleImage = (scalePercentage) => {
  previewImageElement.style.transform = `scale(${scalePercentage / 100})`;
  scaleInput.value = `${scalePercentage}%`;
};

const updateScale = (scaleStep) => {
  const currentValue = parseInt(scaleInput.value, 10);
  const newValue = currentValue + scaleStep;

  if (newValue < MIN_SCALE) {
    scaleImage(MIN_SCALE);
  } else if (newValue > MAX_SCALE) {
    scaleImage(MAX_SCALE);
  } else {
    scaleImage(newValue);
  }
};

const onDecreaseScaleButtonClick = () => {
  updateScale(-SCALE_STEP);
};

const onIncreaseScaleButtonClick = () => {
  updateScale(SCALE_STEP);
};

const resetScale = () => {
  scaleImage(DEFAULT_SCALE);
};

decreaseScaleButton.addEventListener('click', onDecreaseScaleButtonClick);
increaseScaleButton.addEventListener('click', onIncreaseScaleButtonClick);

export { resetScale };
