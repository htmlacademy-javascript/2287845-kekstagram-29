const userImageTemplate = document
  .querySelector('#picture')
  .content.querySelector('.picture');

const createPhotoMiniature = ({ comments, description, url, likes, id }) => {
  const photoMiniature = userImageTemplate.cloneNode(true);
  photoMiniature.querySelector('.picture__comments').textContent = comments.length;
  photoMiniature.querySelector('.picture__likes').textContent = likes;
  photoMiniature.querySelector('.picture__img').alt = description;
  photoMiniature.querySelector('.picture__img').src = url;
  photoMiniature.dataset.photoMiniatureId = id;

  return photoMiniature;
};

const photoMiniatures = (pictures, container) => {
  container.querySelectorAll('.picture').forEach((element) => element.remove());
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const photoMiniature = createPhotoMiniature(picture);
    fragment.append(photoMiniature);
  });

  container.append(fragment);
};

export { photoMiniatures };
