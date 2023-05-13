import express from 'express';
import {connection}  from '../models/connect.js';

export const urouter = express.Router();

export let customer = 0;

urouter.get("/register",function(req,res){
    res.render("user/register");
});

urouter.get("/login",function(req,res){
    res.render("user/login");
});

urouter.post("/register", async function(req,res){
	let status = 200;
	let retVal = {};

	try {
		const query = `INSERT INTO Customers (name,email,password) VALUES ("${req.body.username}","${req.body.email}","${req.body.password}")`;
		const [rows] = await connection.query(query);
		retVal.data = rows;
		customer = rows.insertId;
	} catch (error) {
		console.error(error);
		retVal.error = error;
		status = 500;
	}finally{
		res.redirect("/bookstore");
	}
});

urouter.post("/login",async (req,res)=>{

	const id = req.body.username;

	const query = 'SELECT * FROM Customers WHERE name=?';
	const [rows] = await connection.query(query, [id]);

	if(rows[0]){
		customer = rows[0].customer_id;
	    if(rows[0].password===req.body.password){
			res.redirect("/bookstore");
		}
		else{
			res.render("user/err",{msg:"Please check your password",red : "/login",btnName:"Login"});
		}
	}
	else{
		res.render("user/err",{msg:"Please Register First!!",red : "/register",btnName:"Register"})
	}

});