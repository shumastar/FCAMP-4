import News from './Components/News';
import showArticles from './Controllers/showArticles';
import {
  apiKey,
  baseURL,
  renderNewsBtn,
} from './Utils/const';
import selectCountry from './Controllers/selectCountry';

const news = new News(apiKey, baseURL);

export default class RenderNews {
  constructor() {
    document.addEventListener('DOMContentLoaded', this.init.bind(this));
  }

  init() {
    renderNewsBtn.addEventListener('click', () => news.getData('us').then(data => showArticles(data)));
    renderNewsBtn.addEventListener('click', () => renderNewsBtn.classList.add('non-visible'));
    document.addEventListener('click', (event) => selectCountry(news, event));
  }
}
