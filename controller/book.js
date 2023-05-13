import { connection } from "../models/connect.js";
import { customer } from "../routes/userroutes.js";

let count = 0;
export const  sort = async (req,res)=>{
	let retVal = {};

	if(count===0){
		count++;
		count %= 3;
		try {
			const query = 'SELECT * FROM Books ORDER BY price';
			const [rows] = await connection.query(query);
			retVal.data = rows;
		} catch (error) {
			console.error(error);
			retVal.error = error;
			res.render("user/err",{msg:error,red : "/bookstore",btnName:"Retry"});
		}finally{
			res.render("bookshop/bookstore",{data:retVal.data});
		}
	}
	else if(count===1){
		count++;
		count %= 3;
		try {
			const query = 'SELECT * FROM Books ORDER BY price DESC';
			const [rows] = await connection.query(query);
			retVal.data = rows;
		} catch (error) {
			console.error(error);
			retVal.error = error;
			res.render("user/err",{msg:error,red : "/bookstore",btnName:"Retry"});
		}finally{
			res.render("bookshop/bookstore",{data:retVal.data});
		}
	}
	else{
		count++;
		count %= 3;
		try {
			const query = 'SELECT * FROM Books';
			const [rows] = await connection.query(query);
			retVal.data = rows;
		} catch (error) {
			console.error(error);
			retVal.error = error;
			res.render("user/err",{msg:error,red : "/bookstore",btnName:"Retry"});
		}finally{
			res.render("bookshop/bookstore",{data:retVal.data});
		}
	}
}

export const findfav = async function(req,res){
	const retVal = {};
	try {
		const query = `
		select * from Books where book_id in (select book_id from Favs where customer_id = ${customer});`;
		const [rows] = await connection.query(query);
		const q2 = `Select SUM(price) from Books where book_id in (select book_id from Favs where customer_id = ${customer});`
		const sum = await connection.query(q2);
		retVal.data = rows;
		retVal.sum = sum[0][0][`sum(price)`];
	} catch (error) {
		console.error(error);
		retVal.error = error;
		res.render("user/err",{msg:error,red : "/bookstore",btnName:"Retry"});
	}finally{
		res.render("bookshop/favs",{data:retVal.data, sum: retVal.sum});
	}
}

export const findAllBook = async (req,res)=>{
	let retVal = {};

	try {
		const query = 'SELECT * FROM Books';
		const [rows] = await connection.query(query);

		retVal.data = rows;
	} catch (error) {
		console.error(error);
		retVal.error = error;
		res.render("user/err",{msg:error,red : "/bookstore",btnName:"Retry"});
	}finally{
		res.render("bookshop/bookstore",{data:retVal.data});
	}
}

export const findGenre = async (req,res)=>{
	const retVal = {};
	try {
		const query = `select * from Books where genre = ?`;
		const [rows] = await connection.query(query,[req.params.id]);
		retVal.data = rows;
	} catch (error) {
		console.error(error);
		retVal.error = error;
		res.render("user/err",{msg:error,red : "/bookstore",btnName:"Retry"});
	}finally{
		res.render("bookshop/bookstore",{data:retVal.data});
	}
}

export const search = async (req,res)=>{
	const retVal = {};
	try {
		const query = `SELECT * FROM Books WHERE title = '${req.body.search}'`;
		const [rows] = await connection.query(query);
		retVal.data = rows;
	} catch (error) {
		console.error(error);
		retVal.error = error;
		res.render("user/err",{msg:error,red : "/bookstore",btnName:"Retry"});
	}finally{
		res.render("bookshop/bookstore",{data:retVal.data});
	}
}

export const addFav = async(req,res)=>{
	const query = `Insert into Favs (customer_id,book_id) values (${customer},${req.params.id})`;
	await connection.query(query);

	res.redirect('/bookstore');
}

export const removeFav = async(req,res)=>{
	const query = `delete from Favs where book_id=${req.params.id} and customer_id = ${customer};`;
	await connection.query(query);

	res.redirect('/favs');
}