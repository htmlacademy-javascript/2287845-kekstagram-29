const BASE_URL = 'https://29.javascript.pages.academy/kekstagram';
const Endpoint = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};
const RequestMethod = {
  GET: 'GET',
  POST: 'POST',
};
const ErrorMessage = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу!',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз!',
};

const load = (endpoint, errorMessage, method = RequestMethod.GET, body = null) =>
  fetch(`${BASE_URL}${endpoint}`, { method, body })
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      throw new Error(errorMessage);
    });

const getData = () => load(Endpoint.GET_DATA, ErrorMessage.GET_DATA);

const sendData = (body) => load(Endpoint.SEND_DATA, ErrorMessage.SEND_DATA, RequestMethod.POST, body);

export { getData, sendData };
