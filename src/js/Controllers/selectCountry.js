import { renderNewsBtn } from '../Utils/const';
import showArticles from './showArticles';

function selectCountry(news, event) {
  if (event.target.className === "country-list_item__link") {
    renderNewsBtn.classList.add('non-visible')
    const country = event.target.getAttribute("data-country");
    news.getData(country).then(data => showArticles(data));
  }
}

export default selectCountry;
