import { newsList } from '../Utils/const';

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
  </li>`
}

export default showArticles;
