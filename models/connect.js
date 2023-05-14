import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

export const connection = mysql.createPool(process.env.USER + process.env.PASSWORD + process.env.HOST + process.env.DATABASE + process.env.MYSQL_ATTR_SSL_CA);

connection.getConnection().then((err,result)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log(result);
    }
});