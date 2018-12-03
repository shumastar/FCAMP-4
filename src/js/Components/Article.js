export const articleTemplate = (article) => {
  return (
  `<li class="article">
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
  );
};
