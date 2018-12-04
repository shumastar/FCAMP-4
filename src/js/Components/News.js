import onLoad from '../Utils/loader';
import { errorHandler } from '../Utils/errorHandler';

class News {
  constructor(apiKey, baseURL) {
    this.apiKey = apiKey;
    this.baseURL = baseURL;
  }

  getUrl(country) {
    return `${this.baseURL}country=${country}&apiKey=${this.apiKey}`
  }

  async getData(country) {
    try {
      onLoad(true);
      const url = this.getUrl(country);
      const response = await fetch(url);
      const data = await response.json();
      onLoad(false);
      return data;
    } catch(e) {
      return errorHandler.getInstance().getError();
    };
  }
}

export default News;
