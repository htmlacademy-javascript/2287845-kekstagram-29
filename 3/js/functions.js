// Cтрока короче 20 символов
const checkStringLength = function (string, length) {
  if (string.length <= length) {
    return true;
  } else {
    return false;
  }
};

checkStringLength('Какая то строка', 20);
checkStringLength('123456789011123456', 18);
checkStringLength('12345678910', 10);

// Проверка на палиндромом
const isPalindrome = function (str) {
  const normalized = str.replaceAll('','').toUpperCase();
  let result = '';
  for (let i = normalized.length - 1; i >= 0; i--) {
    result += normalized.at(i);
  }
  if (result === normalized) {
    return true;
  } else {
    return false;
  }
};

isPalindrome('');
