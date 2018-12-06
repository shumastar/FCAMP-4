import onLoad from '../Utils/loader';
import { errorHandler } from '../Utils/errorHandler';

class News {
  constructor(apiKey, baseURL, keyWord) {
    this.apiKey = apiKey;
    this.baseURL = baseURL;
    this.keyWord = keyWord;
  }

  getUrl(country, keyWord) {
    if(country) return `${this.baseURL}top-headlines?country=${country}&apiKey=${this.apiKey}`;
    if(keyWord) return `${this.baseURL}everything?q=${keyWord.trim()}&apiKey=${this.apiKey}`;
  }

  async getData(country, keyWord) {
    try {
      onLoad(true);
      const url = this.getUrl(country, keyWord);
      const response = await fetch(url);
      const data = await response.json();
      onLoad(false);
      return data;
    } catch(e) {
      return errorHandler.getInstance().getError();
    };
  }
}

export const newsWithLog = (apiKey, baseURL, keyWord) => {
  const news = new News(apiKey, baseURL, keyWord);
  const proxy = new Proxy(news, {
    get: function (target, property) {
      const value = target[property];
      if (typeof value != 'function') {
        return value;
      } else {
        return function () {
          if (property == 'getUrl') {
            console.log(`Current location: ${arguments[0] ? arguments[0] : 'no location is choosen'}`);
          }
          return value.apply(this, arguments);
        }
      }
    }
  });

  return proxy;
}
