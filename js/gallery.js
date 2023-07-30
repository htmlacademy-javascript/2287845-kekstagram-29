import { renderPhotoMiniatures as renderThumbnails } from './render-photo-miniatures.js';
import { openPictureModal as openFullScreenImage } from './render-full-screen-image.js';

const renderGallery = (pictures) => {
  const galleryContainer = document.querySelector('.pictures');

  const handleThumbnailClick = (evt) => {
    const clickedThumbnail = evt.target.closest('[data-photo-miniature-id]');
    if (!clickedThumbnail) {
      return;
    }

    evt.preventDefault();
    const { photoMiniatureId } = clickedThumbnail.dataset;
    const picture = pictures.find((item) => item.id === +photoMiniatureId);

    openFullScreenImage(picture);
  };

  renderThumbnails(pictures, galleryContainer);
  galleryContainer.addEventListener('click', handleThumbnailClick);
};

export { renderGallery };
