import { isEscapeKey, handleKeyDown, showAlert } from './util.js';
import { uploadForm, formValidator, hashtagInput, commentInput } from './validation.js';
import { resetScale } from './scale.js';
import { resetEffects } from './effect.js';

const submitButtonText = {
  IDLE: 'Опубликовать',
  SUBMITTING: 'Отправляю...',
};

const ALLOWED_FILE_TYPES = ['jpg', 'jpeg', 'png'];

const pageBodyElement = document.querySelector('body');
const uploadOverlayElement = uploadForm.querySelector('.img-upload__overlay');
const uploadCancelButtonElement = uploadForm.querySelector('.img-upload__cancel');
const fileChooserInputElement = uploadForm.querySelector('.img-upload__input[type=file]');
const imageUploadPreviewElement = document.querySelector('.img-upload__preview img');
const submitButtonElement = uploadForm.querySelector('.img-upload__submit');
const effectsPreviewElements = document.querySelectorAll('.effects__preview');

const isTextFieldFocused = () =>
  document.activeElement === hashtagInput ||
  document.activeElement === commentInput;

const showUploadOverlay = () => {
  uploadOverlayElement.classList.remove('hidden');
  pageBodyElement.classList.add('modal-open');
  document.addEventListener('keydown', handleEscapeKey);
};

const hideUploadOverlay = () => {
  uploadForm.reset();
  formValidator.reset();
  resetScale();
  resetEffects();
  uploadOverlayElement.classList.add('hidden');
  pageBodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', handleEscapeKey);
};

function handleEscapeKey(evt) {
  const errorElement = document.querySelector('.error');
  if (isEscapeKey(evt) && !isTextFieldFocused() && !errorElement) {
    evt.preventDefault();
    hideUploadOverlay();
  }
}

const onFileInputChange = () => {
  showUploadOverlay();
};

const onCancelButtonClick = () => {
  hideUploadOverlay();
};

const blockSubmitButton = () => {
  submitButtonElement.disabled = true;
};

const unblockSubmitButton = () => {
  submitButtonElement.disabled = false;
};

const toggleSubmitButton = (isDisabled) => {
  submitButtonElement.disabled = isDisabled;
  submitButtonElement.textContent = isDisabled
    ? submitButtonText.SUBMITTING
    : submitButtonText.IDLE;
};

const setOnFormSubmit = (callback) => {
  uploadForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = formValidator.validate();
    if (isValid) {
      blockSubmitButton();
      toggleSubmitButton(true);
      try {
        await callback(new FormData(uploadForm));
        toggleSubmitButton(false);
      } catch (err) {
        showAlert(err.message);
      } finally {
        unblockSubmitButton();
      }
    }
  });
};

fileChooserInputElement.addEventListener('change', () => {
  const selectedFile = fileChooserInputElement.files[0];
  const fileName = selectedFile.name.toLowerCase();

  const isValidFileType = ALLOWED_FILE_TYPES.some((it) => fileName.endsWith(it));

  if (isValidFileType) {
    imageUploadPreviewElement.src = URL.createObjectURL(selectedFile);
    effectsPreviewElements.forEach((previewElement) => (previewElement.style.backgroundImage = `url(${imageUploadPreviewElement.src})`));
    showUploadOverlay();
  }
});

fileChooserInputElement.addEventListener('change', onFileInputChange);
uploadCancelButtonElement.addEventListener('click', onCancelButtonClick);
commentInput.addEventListener('keydown', handleKeyDown);
hashtagInput.addEventListener('keydown', handleKeyDown);

export {
  hideUploadOverlay,
  setOnFormSubmit,
};
