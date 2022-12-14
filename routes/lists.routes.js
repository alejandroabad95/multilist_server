const router = require("express").Router()
const { isAuthenticated } = require("../middleware/jwt.middleware")
const List = require('./../models/List.model')


router.get("/getAllLists", (req, res) => {

    List
        .find()
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

// Coger listas del usuario


router.get("/getUserLists", isAuthenticated, (req, res) => {

    let idUser = req.payload._id

    List
        .find({ "owner": idUser })
        // .find({ owner, _id })
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

    const { imageUrl, title, type, description, isPublic, task1, task2, task3 } = req.body

    let tasks = [task1, task2, task3]

    let { _id: owner } = req.payload

    List
        .create({ imageUrl, title, type, description, isPublic, tasks, owner })
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.put("/updateList/:list_id", (req, res) => {

    const { list_id } = req.params

    const { imageUrl, title, type, description, isPublic, tasks } = req.body

    List
        .findByIdAndUpdate(list_id, { imageUrl, title, type, description, isPublic, tasks })
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


// Borrar listas de un usuario concreto

router.delete("/deleteUserLists/:user_id", isAuthenticated, (req, res) => {

    const { user_id } = req.params

    List
        .deleteMany({ "owner": user_id })
        // .find({ owner, _id })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))



})














// router.delete("/deleteList", (req, res) => {

//     const { list_id } = req.body

//     List
//         .findByIdAndDelete(list_id)
//         .then(response => res.json(response))
//         .catch(err => res.status(500).json(err))
// })


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