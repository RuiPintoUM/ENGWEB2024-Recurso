// controllers/bookController.js
const Book = require('../models/livros');

module.exports.list = async () => {
  return await Book.find().exec();
}

module.exports.findById = async (id) => {
  return await Book.findById(id).exec();
}

module.exports.findByCharacter = async (charater) => {
  console.log(`Fetching books with character: ${charater}`);
  const books = await Book.find({ characters: { $regex: charater, $options: 'i' } }).exec();
  console.log(`Found books: ${books.length}`);
  return books;
}

module.exports.findByGenre = async (genre) => {
  return await Book.find({ genres: { $regex: genre, $options: 'i' } }).exec();
}

module.exports.listGenres = async () => {
  const genres = await Book.distinct('genres');
  return genres.sort();
}

module.exports.listCharacters = async () => {
  const characters = await Book.distinct('characters');
  return characters.sort();
}

module.exports.insert = async (book) => {
  return await Book.create(book);
}

module.exports.removeById = async (id) => {
  return await Book.findByIdAndDelete(id).exec();
}

module.exports.updateById = async (id, book) => {
  return await Book.findByIdAndUpdate(id, book, { new: true }).exec();
}