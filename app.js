import express from 'express';
import ejs from 'ejs';
import bodyParser from 'body-parser';
import { brouter } from './routes/bookroutes.js';
import { arouter } from './routes/adminroutes.js';
import { urouter } from './routes/userroutes.js';
import { LocalStorage } from 'node-localstorage';
const localStorage = new LocalStorage('./scratch');

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.set('views','views');
app.use(express.static("public"));

app.use(brouter);
app.use(urouter);
app.use(arouter);

let PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log('App is running');
});

export default localStorage;