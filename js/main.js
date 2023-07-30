import { hideUploadOverlay as hideOverlay, setOnFormSubmit as setFormSubmitHandler } from './form.js';
import { renderGallery as displayGallery } from './gallery.js';
import { getData as fetchGalleryData, sendData as sendFormData } from './api.js';
import { showAlert as displayAlert, debounce as applyDebounce } from './util.js';
import { showSuccessMessage as showSuccess, showErrorMessage as showError } from './message.js';
import { initFilterModule as initializeFilterModule, getFilteredPictures as applyFilters } from './filter.js';

setFormSubmitHandler(async (formData) => {
  try {
    await sendFormData(formData);
    hideOverlay();
    showSuccess();
  } catch {
    showError();
  }
});

try {
  const galleryData = await fetchGalleryData();
  const debouncedDisplayGallery = applyDebounce(displayGallery);
  initializeFilterModule(galleryData, debouncedDisplayGallery);
  displayGallery(applyFilters());
} catch (error) {
  displayAlert(error.message);
}
