(function () {
  const apiKey = "85e168742c28431db328204ff1cfb6e8";
  const baseURL = "https://newsapi.org/v2/top-headlines?";
  const newsList = document.getElementById('news-list');

  class News {
    constructor(apiKey, baseURL) {
      this.apiKey = apiKey;
      this.baseURL = baseURL;
    }

    getUrl(country) {
      return `${this.baseURL}country=${country}&apiKey=${this.apiKey}`
    }

    getData(country) {
      const url = this.getUrl(country);
      return fetch(url)
        .then(response => response.json());
    }
  }

  function showArticles(data) {
    newsList.innerHTML = "";
    const articles = data.articles
    articles.forEach(createArticle);
  }

  function createArticle(article) {
    newsList.innerHTML += `
    <li class="article">
      <section class="article_image-container">
        <img class="article_image"
          ${article.urlToImage ?
            `src=${article.urlToImage}`
            : `src="./img/nofoto.jpeg"`
          }
        >
      </section>
      <div class="article_info">
        <div class="info_source-name">${article.source.name}</div>
        <div class="info_date"> ${new Date(article.publishedAt).toLocaleString()}</div>
        <h3 class="info_title">${article.title}</h3>
        <p class="info_context">
          ${article.content || ""}
        </p>
        <a class="info_link" href=${article.url} target="_blank">
          Read More
        </a>
      </div>
    </li>`;
  }

  function onCountryClick(event) {
    if (event.target.className === "country-list_item__link") {
      const country = event.target.getAttribute("data-country");
      news.getData(country).then(data => showArticles(data));
    }
  }

  document.addEventListener("click", onCountryClick);

  const news = new News(apiKey, baseURL);

  news.getData('us').then(data => showArticles(data));
})()
