const show = (req, res) => {
    res.status(200).send(req.params.id)
}

const create = (req, res) => {
    res.status(201).send({body: req.body, message: "created"})
}

const update = (req, res) => {
    res.status(201).send({body: req.body, message: "created"})
}

const destroy = (req, res) => {
    res.status(204).send({message: "entry deleted"})
}

module.exports = { show, create, update, destroy }