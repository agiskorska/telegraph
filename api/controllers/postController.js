const Post = require('../models/Post');

const show = async (req, res) => {
    try {
        const id = req.params.id;
        const post = await Post.findById(id);
        res.status(200).send(post);
    } catch (e) {
        res.status(404).send({message: "id not found"})
    }
}

const create = async (req, res) => {
    try {
        const body = req.body;
        const insert = await Post.createNew(body)
        res.status(201).json({body: insert.id, message: "created"})
    } catch (e) {
        res.status(404).send({message: "id not found"})
    }
}

const update = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        const update = await post.update(post.id, req.body.title, req.body.nickname, req.body.body);
        res.status(201).send({body: update, message: "updated"});
    } catch (e) {
        res.status(404).send({message: "id not found"})
    }
}

const destroy = async (req, res) => {
    try { 
        const destroy = await Post.destroy(req.params.id);
        res.status(202).send({message: "entry deleted"})
    } catch (e) {
        res.status(404).send({message: "id not found"})
    }
}

module.exports = { show, create, update, destroy }