const router = require("express").Router()
const { isAuthenticated } = require("../middleware/jwt.middleware")
const List = require('./../models/List.model')


router.get("/getAllLists", (req, res) => {

    List
        .find()
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.get("/getOneList/:list_id", (req, res, next) => {

    const { list_id } = req.params

    List
        .findById(list_id)
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.post("/createList", isAuthenticated, (req, res, next) => {

    const { imageUrl, title, type, description, public, task1, task2, task3 } = req.body

    let tasks = [task1, task2, task3]

    let { _id: owner } = req.payload

    List
        .create({ imageUrl, title, type, description, public, tasks, owner })
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.put("/updateList/:list_id", (req, res) => {

    const { list_id } = req.params

    const { imageUrl, title, type, description, public, task1, task2, task3 } = req.body

    let tasksUpdate = [task1, task2, task3]

    List
        .findByIdAndUpdate(list_id, { imageUrl, title, type, description, public, tasksUpdate })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


router.delete("/deleteList/:list_id", (req, res) => {

    const { list_id } = req.params

    List
        .findByIdAndDelete(list_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.put("/deleteOneTask/:list_id/:task", (req, res) => {


    const { list_id, task } = req.params
    console.log('esta es la tarea a borrar', typeof (task))
    const { task1, task2, task3 } = req.body
    let tasksArray = [task1, task2, task3]
    List

        .findByIdAndUpdate(list_id, { $pull: { tasks: task } }, { new: true })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))

})

module.exports = router