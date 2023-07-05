 const checkStringLength = function (string, length) {
   if (string.length <= length) {
     return true;
   }
   else {
     return false;
   }
 }
 checkStringLength('Lets go world', 10)
 console.log(checkStringLength('kakaya to stroka', 20))

 /*const checkStringLength = function (string, length) {
   if (string.length <= length) {
     return true;
   }
   else {
     return false;
   }
 }*/
//
/*
function isPalindrome(str) {
  // Удаление всех пробелов из строки
  let strippedStr = str.replace(/\s/g, '');
//
  // Приведение строки к нижнему регистру
  let lowerCaseStr = strippedStr.toLowerCase();
//
  // Проверка на палиндром
  let reversedStr = lowerCaseStr.split('').reverse().join('');
  return lowerCaseStr === reversedStr;
}
console.log(isPalindrome('Топот'))
console.log(isPalindrome('kot'))
*/
