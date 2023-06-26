import express from 'express';
import { addFav, findAllBook, findGenre, findfav, removeFav, search, sort } from '../controller/book.js';
import fetchUser from '../middleware/fetchuer.js';
import localStorage from '../app.js';

export const brouter = express.Router();

brouter.get('/',async (req,res)=>{
	localStorage.removeItem('token');
	res.render("bookshop/home");
});

brouter.get('/bookstore', fetchUser, findAllBook);

brouter.post('/bookstore', search)

brouter.get('/bookstore/:id', fetchUser, findGenre);

brouter.get('/favs', fetchUser, findfav);

brouter.get('/fav/:id', fetchUser, addFav);

brouter.post('/fav/:id', removeFav);

let count = 0;
brouter.get('/sort', fetchUser, sort)