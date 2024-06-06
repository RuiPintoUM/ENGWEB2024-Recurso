var express = require('express');
var router = express.Router();
var axios = require('axios');

const apiURL = 'http://backend:17000';

// Rota principal
router.get('/', async (req, res, next) => {
  try {
    const response = await axios.get(apiURL);
    const books = response.data;
    res.render('index', { title: 'Lista de Livros', books: books });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const response = await axios.get(`${apiURL}/${req.params.id}`);
    const book = response.data;
    res.render('book', { title: 'Detalhes do Livro', book: book });
  } catch (error) {
    next(error);
  }
});

router.get('/authors/:author', async (req, res, next) => {
  try {
    const response = await axios.get(`${apiURL}?author=${req.params.author}`);
    const books = response.data;
    res.render('author', { title: `Livros do Autor ${req.params.author}`, author: req.params.author, books: books });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
