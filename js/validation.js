const MAX_HASHTAG_COUNT = 5;
const MAX_COMMENT_LENGTH = 140;
const HASHTAG_VALIDATION_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;
const ERROR_MESSAGES = {
  INVALID_COUNT: `Максимум ${MAX_HASHTAG_COUNT} хэштегов`,
  NOT_UNIQUE: 'Хэштеги должны быть уникальными',
  INVALID_PATTERN: 'Неправильный хэштег',
};

const uploadForm = document.querySelector('.img-upload__form');
const hashtagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');

const formValidator = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper'
});

const validateCommentInput = (value) => value.length <= MAX_COMMENT_LENGTH;

const normalizeTags = (tagString) =>
  tagString
    .trim()
    .split(' ')
    .filter((tag) => Boolean(tag.length));

const hasValidTags = (value) => normalizeTags(value).every((tag) => HASHTAG_VALIDATION_REGEX.test(tag));

const hasValidTagsCount = (value) => normalizeTags(value).length <= MAX_HASHTAG_COUNT;

const hasUniqueTags = (value) => {
  const normalizedTags = normalizeTags(value);
  const lowerCaseTags = normalizedTags.map((tag) => tag.toLowerCase());

  const uniqueTagsObj = {};

  for (let j = 0; j < lowerCaseTags.length; j++) {
    const tag = lowerCaseTags[j];
    uniqueTagsObj[tag] = true;
  }

  const uniqueTagsCount = Object.keys(uniqueTagsObj).length;
  return lowerCaseTags.length === uniqueTagsCount;
};

formValidator.addValidator(commentInput, validateCommentInput);

formValidator.addValidator(
  hashtagInput,
  hasValidTags,
  ERROR_MESSAGES.INVALID_PATTERN,
  1,
  true
);

formValidator.addValidator(
  hashtagInput,
  hasUniqueTags,
  ERROR_MESSAGES.NOT_UNIQUE,
  2,
  true
);

formValidator.addValidator(
  hashtagInput,
  hasValidTagsCount,
  ERROR_MESSAGES.INVALID_COUNT,
  3,
  true
);

export { formValidator, uploadForm, hashtagInput, commentInput };
