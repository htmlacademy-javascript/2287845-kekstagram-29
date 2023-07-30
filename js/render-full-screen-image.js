import { isEscapeKey } from './util.js';

const COMMENTS_SHOWN_PER_CLICK = 5;

const bigPictureOverlayElement = document.querySelector('.big-picture');
const closePictureButtonElement = document.querySelector('.big-picture__cancel');

const commentTemplateElement = document.querySelector('#comment')
  .content
  .querySelector('.social__comment');
const commentsListElement = bigPictureOverlayElement.querySelector('.social__comments');
const commentsLoaderElement = bigPictureOverlayElement.querySelector('.comments-loader');
const commentsCountElement = bigPictureOverlayElement.querySelector('.comments-count');
const commentsShownCountElement = bigPictureOverlayElement.querySelector('.comments-shown-count');
const bodyElement = document.querySelector('body');

let commentsShownCount = 0;
let commentsData = [];

const createComment = ({ avatar, name, message }) => {
  const commentElement = commentTemplateElement.cloneNode(true);

  commentElement.querySelector('.social__picture').src = avatar;
  commentElement.querySelector('.social__picture').alt = name;
  commentElement.querySelector('.social__text').textContent = message;

  return commentElement;
};

const renderComments = () => {
  commentsShownCount += COMMENTS_SHOWN_PER_CLICK;

  if (commentsShownCount >= commentsData.length) {
    commentsLoaderElement.classList.add('hidden');
    commentsShownCount = commentsData.length;
  } else {
    commentsLoaderElement.classList.remove('hidden');
  }

  const visibleComments = commentsData.slice(0, commentsShownCount);
  const fragment = document.createDocumentFragment();
  visibleComments.forEach((commentData) => {
    const commentElement = createComment(commentData);
    fragment.append(commentElement);
  });

  commentsListElement.innerHTML = '';
  commentsListElement.append(fragment);
  commentsShownCountElement.textContent = commentsShownCount;
  commentsCountElement.textContent = commentsData.length;
};

const closePictureModal = () => {
  bigPictureOverlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  commentsShownCount = 0;
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePictureModal();
  }
}

const onCommentsLoaderClick = () => renderComments();

const onCancelButtonClick = () => {
  closePictureModal();
};

const renderBigPictureDetails = ({ url, likes, description }) => {
  bigPictureOverlayElement.querySelector('.big-picture__img img').src = url;
  bigPictureOverlayElement.querySelector('.big-picture__img img').alt = description;
  bigPictureOverlayElement.querySelector('.likes-count').textContent = likes;
  bigPictureOverlayElement.querySelector('.social__caption').textContent = description;
};

const openPictureModal = (data) => {
  bigPictureOverlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  commentsLoaderElement.classList.add('hidden');
  document.addEventListener('keydown', onDocumentKeydown);

  renderBigPictureDetails(data);
  commentsShownCount = 0;
  commentsData = data.comments;
  if (commentsData.length > 0) {
    renderComments();
  }
};

closePictureButtonElement.addEventListener('click', onCancelButtonClick);
commentsLoaderElement.addEventListener('click', onCommentsLoaderClick);

export { openPictureModal };
