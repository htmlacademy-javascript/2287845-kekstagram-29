//Const
const MIN_COMMENT = 0;
const MAX_COMMENT = 30;
const MAX_AVATAR = 6;
const MIN_FUNCTIONS = 1;
const MAX_FUNCTIONS = 25;
const MAX_MESSAGE = 2;
const MIN_LIKES = 15;
const MAX_LIKES = 200;


// МАССИВЫ
const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const DESCRIPTIONS = [
  'Если смогу, я сделаю это. Конец истории.',
  'Смейтесь как только умеете, любите столько, сколько живете.',
  'Улыбка — единственный тренд в моде, который актуален всегда.',
  'Никогда не ищите свое счастье там, где вы его однажды потеряли.',
  'Моя жизнь меняется, потому что меняю ее я.',
  'Всегда начинайте свой день с хороших людей и кофе.',
  'Ни о чем не беспокойтесь. Потому что все лучшие умы на работе.',
  'Живите во всех тех моментах, которые вы не можете выразить словами.',
  'Я пыталась заниматься йогой, но в позе лотоса уснула.',
  'Никогда не позволяйте никому скучать.',
  'Все только начинает становиться действительно хорошим.',
  'Утром, только одна хорошая мысль меняет смысл целого дня.',
  'Мечтайте. Поверьте, в это. Добейтесь этого.',
  'Я точно знаю, кто я, и я чертовски горжусь этим.'
];
const NAMES = [
  'Albina',
  'Elmira',
  'Mirlan',
  'Sasha',
  'Masha',
  'Dasha',
  'Katusha'
];
// ГЕНЕРАТОР СЛУЧАЙНЫХ ЧИСЕЛ
const getRandomInteger = (minNumber, maxNumber) => {
  // 1. Находим минимальное и максимальное значение из переданных аргументов
  const min = Math.ceil(Math.min(Math.abs(minNumber), Math.abs(maxNumber)));
  const max = Math.floor(Math.max(Math.abs(minNumber), Math.abs(maxNumber)));
  // 2. Создаем случайное число в заданном диапазоне
  const randomize = Math.random() * (max - min + 1) +
    min;
  // 3. Округляем полученное случайное число до ближайшего целого
  return Math.floor(randomize);
};

// ГЕНЕРАТОР СЛУЧАЙНОГО ИНДЕКСА
const getRandomIndex = (elements) => elements[getRandomInteger(0, elements.length - 1)];

//ГЕНЕРАТОР ID
const createGeneratorId = (firstIndex, lastIndex) => {
  const previousValues = [];
  return () => {
    let currentValue = firstIndex;

    if (previousValues.length >= lastIndex) {
      return null;
    }

    while (previousValues.includes(currentValue)) {
      currentValue++;
    }

    previousValues.push(currentValue);
    return currentValue;
  };
};

// Вспомогательные функции

const generatePhotoId = createGeneratorId(MIN_FUNCTIONS, MAX_FUNCTIONS);
const generateMessageId = createGeneratorId(MIN_FUNCTIONS, MAX_FUNCTIONS, Infinity);

//Генерируем сообщение

const generateMessage = () => {
  const message = [];
  while (message.length < getRandomInteger(MIN_FUNCTIONS,MAX_MESSAGE)) {
    message.push(getRandomIndex(messages));
  }
  return message;
};

//Генерируем коммент
const createComment = () => ({
  id: generateMessageId(),
  avatar: `img/avatar-${getRandomInteger(MIN_FUNCTIONS, MAX_AVATAR)}.svg`,
  message: generateMessage(getRandomInteger(MIN_FUNCTIONS, 2)).join(' '),
  name: getRandomInteger(NAMES),
});
//Генерируем Фото
const createPhoto = () => ({
  id: generatePhotoId(),
  url: `photos/${getRandomInteger(MIN_FUNCTIONS, MAX_FUNCTIONS)}.jpg`,
  description: getRandomInteger(DESCRIPTIONS),
  likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
  comment: Array.from({ length: getRandomInteger(MIN_COMMENT, MAX_COMMENT) }, createComment),
});
const generatePhoto = Array.from({ length: MAX_FUNCTIONS }, createPhoto);
// eslint-disable-next-line no-unused-expressions
generatePhoto();
