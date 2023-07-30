import { EFFECTS } from './util.js';

const previewImageElement = document.querySelector('.img-upload__preview img');
const formElement = document.querySelector('.img-upload__form');
const effectSliderElement = document.querySelector('.effect-level__slider');
const effectLevelValueElement = document.querySelector('.effect-level__value');
const effectSliderContainerElement = document.querySelector('.img-upload__effect-level');

let currentEffect = EFFECTS[0];

noUiSlider.create(effectSliderElement, {
  range: {
    min: currentEffect.min,
    max: currentEffect.max
  },
  start: currentEffect.max,
  step: currentEffect.step,
  connect: 'lower'
});

const isDefaultEffect = () => currentEffect === EFFECTS[0];

const updateEffectSlider = () => {
  effectSliderContainerElement.classList.toggle('hidden', isDefaultEffect());
  effectSliderElement.noUiSlider.updateOptions({
    range: {
      min: currentEffect.min,
      max: currentEffect.max
    },
    start: currentEffect.max,
    step: currentEffect.step
  });
};

const handleFilterChange = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }
  currentEffect = EFFECTS.find((effect) => effect.name === evt.target.value);
  updateEffectSlider();
};

const handleSliderChange = () => {
  previewImageElement.style.filter = 'none';
  previewImageElement.className = '';
  effectLevelValueElement.value = '';
  if (isDefaultEffect()) {
    return;
  }

  const effectValue = effectSliderElement.noUiSlider.get();
  previewImageElement.style.filter = `${currentEffect.style}(${effectValue}${currentEffect.unit})`;
  const effectClass = `effects__preview--${currentEffect.name}`;
  previewImageElement.classList.add(effectClass);
  effectLevelValueElement.value = effectValue;
};

const resetEffects = () => {
  currentEffect = EFFECTS[0];
  updateEffectSlider();
};

updateEffectSlider();

formElement.addEventListener('change', handleFilterChange);
effectSliderElement.noUiSlider.on('update', handleSliderChange);

export { resetEffects };
