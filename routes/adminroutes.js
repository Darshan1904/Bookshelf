import express from 'express';
import {connection}  from '../models/connect.js';

export const arouter = express.Router();

arouter.get('/admin/books',async (req,res)=>{
	res.render("admin/admlogin");
});

arouter.post('/admin/books',async (req,res)=>{
	const id = req.body.username;

	const query = 'SELECT * FROM Admins WHERE adminName=?';
	const [rows] = await connection.query(query, [id]);

	if(rows[0]){
	    if(rows[0].admPassword===req.body.password){
			res.redirect("/admin/dashboard/book");
		}
		else{
			res.render("user/err",{msg:"Please check your password",red : "/admin/books",btnName:"Admin Login"});
		}
	}
	else{
		res.render("user/err",{msg:"You are not admin!!",red : "/",btnName:"Home"})
	}
})

arouter.get('/admin/dashboard/book',async (req,res)=>{
	res.render('admin/adminOps');
});

arouter.get('/admin/dashboard/addbook',async (req,res)=>{
	res.render('admin/bookForm', {title:"Add Book", action:"/admin/dashboard/addbook",btn:"publish"});
});

arouter.get('/admin/dashboard/removebook',async (req,res)=>{
	res.render('admin/bookrForm', {title:"Remove Book", action:"/admin/dashboard/removebook",btn:"Remove"});
});

arouter.get('/admin/dashboard/addadmin',async (req,res) => {
	res.render('admin/addadmin');
});

arouter.post('/admin/dashboard/addadmin',async (req,res) => {
	const name = req.body.message;
	const pswd = req.body.password;
	
	try{
		const query = `INSERT INTO Admins (adminName,admPassword) VALUES ("${name}","${pswd}");`;
		const [rows] = await connection.query(query);
	}catch(err){
		console.error(err);
	}finally{
		res.redirect('/admin/dashboard/book');
	}
});

arouter.post('/admin/dashboard/removebook',async (req,res)=>{
	const bookName = req.body.message;
	
	try{
		const query = `DELETE FROM Books WHERE title=?`;
		const [rows] = await connection.query(query,[bookName]);
	}catch(err){
		console.error(err);
	}finally{
		res.redirect('/admin/dashboard/book');
	}
});

arouter.post('/admin/dashboard/addbook', async (req, res) => {
	let status = 200;
	let retVal = {};

	try {
		const query = `INSERT INTO Books (title, image, author, genre, publisher, publish_date, price) VALUES ("${req.body.message}", "${req.body.image}", "${req.body.author}","${req.body.genre}","${req.body.publisher}","${req.body.publish_date}","${req.body.price}")`;
		const [rows] = await connection.query(query);
		retVal.data = rows;
	} catch (error) {
		console.error(error);
		retVal.error = error;
		status = 500;
	}finally{
		res.redirect("/admin/dashboard/book");
	}
});

arouter.get('/admin/dashboard/changeprice', async (req,res) => {
	res.render('admin/updateForm', {title:"Change Price", action:"/admin/dashboard/changeprice", btn:"Change Price"});
});

arouter.post('/admin/dashboard/changeprice', async (req, res) => {
	let status = 200;
	let retVal = {};

	try {
		const query = `Update Books set price = ${req.body.price} where title = "${req.body.title}"`;
		const [rows] = await connection.query(query);
		retVal.data = rows;
	} catch (error) {
		console.error(error);
		retVal.error = error;
		status = 500;
	}finally{
		res.redirect("/admin/dashboard/book");
	}
});