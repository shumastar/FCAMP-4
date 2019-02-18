const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const NewsSchema = new Schema({
  id: ObjectId,
  source: {
    id: String,
    name: String
  },
  author: String,
  title: String,
  description: String,
  url: String,
  publishedAt: {
    type: Date,
    validate: {
      validator: d => d <= new Date(),
      message: 'Check entered date'
    }
  }
});

const News = mongoose.model('News', NewsSchema);

module.exports = News;
