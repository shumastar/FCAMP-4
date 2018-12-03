import onLoad from '../Utils/loader';

class News {
  constructor(apiKey, baseURL) {
    this.apiKey = apiKey;
    this.baseURL = baseURL;
  }

  getUrl(country) {
    return `${this.baseURL}country=${country}&apiKey=${this.apiKey}`
  }

  async getData(country) {
    onLoad(true);
    const url = this.getUrl(country);
    const response = await fetch(url);
    const data = await response.json();
    onLoad(false);
    return data;
  }
}

export default News ;
