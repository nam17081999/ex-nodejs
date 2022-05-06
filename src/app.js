import express from 'express';
import { engine } from 'express-handlebars';
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import './config/db.js'
import { Friends } from './model/friends.js';
import methodOverride from 'method-override'
import axios from 'axios';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

app.use(express.static(path.join(__dirname, '/public')));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

app.get('', (req, res, next) => {
    const name = req.query.search
    if (!name) {
        Friends.find({})
            .then(friend => {
                friend = friend.map(fri => fri.toObject())
                console.log('get1', friend)
                res.render('home', { friend })
            })
            .catch(next)
    } else {
        console.log(name)
        Friends.find({})
            .then(friend => {
                console.log(friend)
                friend = friend.map(fri => fri.toObject())
                // friend = friend.find(e => e.name == name)
                friend = friend.filter(user => !user.name.indexOf(name))
                res.render('home', { friend })
            })
            .catch(next)
    }

})

app.get('/search', (req, res, next) => {
    const name = req.query.search
    console.log(name)
    Friends.find({})
        .then(friend => {
            console.log(friend)
            friend = friend.map(fri => fri.toObject())
            // friend = friend.find(e => e.name == name)
            friend = friend.filter(user => !user.name.indexOf(name))
            res.render('home', { friend })
        })
        .catch(next)

})

app.post('/', (req, res, next) => {
    // console.log(req.body)
    const friend = new Friends(req.body)
    friend.save()
        .then(() => res.redirect('/'))
        .catch(next)
})


app.delete('/:id', (req, res, next) => {
    Friends.deleteOne({ _id: req.params.id })
        .then(() => res.redirect('/'))
        .catch(next)
})

app.put('/:id', (req, res, next) => {
    // console.log(req.body)
    Friends.updateOne({ _id: req.params.id }, req.body)
        .then(() => res.redirect('/'))
        .catch(next)
})

app.listen(4000);