import express from 'express';
import { addFav, findAllBook, findGenre, findfav, removeFav, search, sort } from '../controller/book.js';

export const brouter = express.Router();

brouter.get('/',async (req,res)=>{
	res.render(__dirname + "bookshop/home");
});

brouter.get('/bookstore', findAllBook);

brouter.post('/bookstore', search)

brouter.get('/bookstore/:id', findGenre);

brouter.get('/favs', findfav);

brouter.get('/fav/:id', addFav);

brouter.post('/fav/:id', removeFav);

let count = 0;
brouter.get('/sort', sort)