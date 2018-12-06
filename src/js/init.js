import { newsWithLog } from './Components/News';
import showArticles from './Controllers/showArticles';
import {
  apiKey,
  baseURL,
  renderNewsBtn,
  searchInput,
  searchButton,
} from './Utils/const';
import selectCountry from './Controllers/selectCountry';
import seachByKeyWord from './Controllers/searchByKeyWord';

const news = newsWithLog(apiKey, baseURL);
export default class RenderNews {
  constructor() {
    document.addEventListener('DOMContentLoaded', this.init.bind(this));
  }

  init() {
    renderNewsBtn.addEventListener('click', () => news.getData('us').then(data => showArticles(data)));
    renderNewsBtn.addEventListener('click', () => renderNewsBtn.classList.add('non-visible'));
    document.addEventListener('click', event => selectCountry(news, event));
    searchInput.addEventListener('keydown', event => {
      if (event.keyCode === 27) event.target.value = '';
      if (event.keyCode === 13 && event.target.value !== '') seachByKeyWord(news, event.target.value);
    });
    searchButton.addEventListener('click', () => {
      (searchInput.value !== '')
      ? seachByKeyWord(news, searchInput.value)
      : null;
    });
  }
}
