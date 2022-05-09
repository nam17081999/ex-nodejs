import express from "express";
import { Friends } from "../model/friends.js";

const router = express.Router()

router.get('', (req, res) => {
    const name = req.query.search
    if (!name) {
        Friends.find({})
            .then(friend => {
                friend = friend.map(fri => fri.toObject())
                res.render('home', { friend })
            })
            .catch(er => res.status(400).send(er))

    } else {
        Friends.find({})
            .then(friend => {
                friend = friend.map(fri => fri.toObject())
                friend = friend.filter(user => !user.name.indexOf(name))
                res.render('home', { friend })
            })
            .catch(er => res.status(400).send(er))

    }

})

router.get('/search', (req, res) => {
    const name = req.query.search
    Friends.find({})
        .then(friend => {
            friend = friend.map(fri => fri.toObject())
            friend = friend.filter(user => !user.name.indexOf(name))
            res.render('home', { friend })
        })
        .catch(er => res.status(400).send(er))

})

router.post('/', (req, res) => {
    const friend = new Friends(req.body)
    friend.save()
        .then(() => res.redirect('/'))
        .catch(er => res.status(400).send(er))

})


router.delete('/:id', (req, res) => {
    Friends.deleteOne({ _id: req.params.id })
        .then(() => res.redirect('/'))
        .catch(er => res.status(400).send(er))
})

router.put('/:id', (req, res) => {
    Friends.updateOne({ _id: req.params.id }, req.body)
        .then(() => res.redirect('/'))
        .catch(er => res.status(400).send(er))
})

export default router