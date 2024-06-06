// routes/books.js
const express = require('express');
const router = express.Router();
const bookController = require('../controllers/livros');

router.get('/', async (req, res) => {
  if (req.query.charater) {
    console.log(`Parametos da query: ${req.query.charater}`);
    const books = await bookController.findByCharacter(req.query.charater);
    res.json(books);
  } else if (req.query.genre) {
    const books = await bookController.findByGenre(req.query.genre);
    res.json(books);
  } else {
    const books = await bookController.list();
    res.json(books);
  }
});


router.get('/genres', async (req, res) => {
  const genres = await bookController.listGenres();
  res.json(genres);
});

router.get('/characters', async (req, res) => {
  const characters = await bookController.listCharacters();
  res.json(characters);
});

router.post('/', async (req, res) => {
  const newBook = await bookController.insert(req.body);
  res.status(201).json(newBook);
});

router.get('/:id', async (req, res) => {
  const book = await bookController.findById(req.params.id);
  res.json(book);
});

router.delete('/:id', async (req, res) => {
  await bookController.removeById(req.params.id);
  res.status(204).end();
});

router.put('/:id', async (req, res) => {
  const updatedBook = await bookController.updateById(req.params.id, req.body);
  res.json(updatedBook);
});

module.exports = router;