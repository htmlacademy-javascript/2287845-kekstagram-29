const MAX_DISPLAYED_PICTURES = 10;

const FilterType = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const filterContainer = document.querySelector('.img-filters');
let currentFilterType = FilterType.DEFAULT;
let picturesData = [];
const sortByRandom = () => Math.random() - 0.5;

const sortByCommentsCount = (firstPicture, secondPicture) =>
  secondPicture.comments.length - firstPicture.comments.length;

const getFilteredPictures = () => {
  switch (currentFilterType) {
    case FilterType.RANDOM:
      return [...picturesData].sort(sortByRandom).slice(0, MAX_DISPLAYED_PICTURES);
    case FilterType.DISCUSSED:
      return [...picturesData].sort(sortByCommentsCount);
    default:
      return [...picturesData];
  }
};

const setFilterButtonClickHandler = (callback) => {
  filterContainer.addEventListener('click', (evt) => {
    const clickedFilterButton = evt.target;

    if (!clickedFilterButton.classList.contains('img-filters__button') || clickedFilterButton.id === currentFilterType) {
      return;
    }

    const activeButton = filterContainer.querySelector('.img-filters__button--active');
    activeButton.classList.remove('img-filters__button--active');
    clickedFilterButton.classList.add('img-filters__button--active');
    currentFilterType = clickedFilterButton.id;
    callback(getFilteredPictures());
  });
};

const initFilterModule = (loadedPicturesData, callback) => {
  filterContainer.classList.remove('img-filters--inactive');
  picturesData = [...loadedPicturesData];
  setFilterButtonClickHandler(callback);
};

export { initFilterModule, getFilteredPictures };
