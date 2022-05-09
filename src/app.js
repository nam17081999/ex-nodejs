import express from 'express';
import { engine } from 'express-handlebars';
import methodOverride from 'method-override';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import './config/db.js';
import useRouter from './routers/friends.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))
app.use(useRouter)
app.use(express.static(path.join(__dirname, '/public')));


app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

app.listen(4000);