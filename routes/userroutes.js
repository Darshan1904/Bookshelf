import express from 'express';
import {connection}  from '../models/connect.js';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import localStorage from '../app.js';

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
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(req.body.password, salt);
		const query = `INSERT INTO Customers (name,email,password) VALUES ("${req.body.username}","${req.body.email}","${hashedPassword}")`;
		const [rows] = await connection.query(query);
		retVal.data = rows;
		customer = rows.insertId;
	} catch (error) {
		console.error(error);
		retVal.error = error;
		status = 500;
	}finally{
		const data = {
			user:{
				id: req.body.username
			}
		}
		const token = jsonwebtoken.sign(data,process.env.JWT_SECRET,{expiresIn:'1h'});
		localStorage.setItem('token',token);
		res.redirect("/bookstore");
	}
});

urouter.post("/login",async (req,res)=>{

	const id = req.body.username;

	const query = 'SELECT * FROM Customers WHERE name=?';
	const [rows] = await connection.query(query, [id]);

	if(rows[0]){
		customer = rows[0].customer_id;
		let check = await bcrypt.compare(req.body.password, rows[0].password);
	    if(check){
			const data = {
				user:{
					id: id
				}
			}
			const token = jsonwebtoken.sign(data,process.env.JWT_SECRET,{expiresIn:'1h'});
			localStorage.setItem('token',token);
			res.redirect("/bookstore");
		}
		else{
			res.render("user/err",{msg:"Please check your password .",red : "/login",btnName:"Login"});
		}
	}
	else{
		res.render("user/err",{msg:"Please Register First!!",red : "/register",btnName:"Register"})
	}

});