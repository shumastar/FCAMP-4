const News = require('./newsModel');

class NewsController {
  constructor() {
    if (typeof NewsController._instance === 'object') {
      return NewsController._instance;
    }

    NewsController._instance = this;
  }

  static getInstance() {
    return new NewsController();
  }

  async getAll() {
    return await News.find();
  }

  async getById(id) {
    return await News.findById(id);
  }

  async add(news) {
    await News.create([news]);
  }

  async update(id, newNews) {
    await News.findByIdAndUpdate(id, newNews);
  }

  async delete(id) {
    await News.findByIdAndDelete(id);
  }

  async deleteAll() {
    await News.deleteMany();
  }
}

module.exports = NewsController.getInstance();
