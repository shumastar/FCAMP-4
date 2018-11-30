class News {
  constructor(apiKey, baseURL) {
    this.apiKey = apiKey;
    this.baseURL = baseURL;
  }

  getUrl(country) {
    return `${this.baseURL}country=${country}&apiKey=${this.apiKey}`
  }

  async getData(country) {
    const url = this.getUrl(country);
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
}

export default News ;
