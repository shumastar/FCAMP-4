import { renderNewsBtn } from '../Utils/const';
import showArticles from './showArticles';

function seacrhByKeyWord(news, keyWord) {
  renderNewsBtn.classList.add('non-visible')
  news.getData('', keyWord).then(data => showArticles(data));
}

export default seacrhByKeyWord;
