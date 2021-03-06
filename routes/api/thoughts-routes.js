const router = require('express').Router()
const { getAllThoughts, getThoughtById, addThought, updateThought, removeThought, addReaction, removeReaction } =require('../../controllers/thoughts-controller')

router  
    .route('/')
    .get(getAllThoughts)

router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)

router
    .route('/:userId')
    .post(addThought)

router
    .route('/:userId/:thoughtId')
    .put(addReaction)
    .delete(removeThought)

router
    // notes for assignment says no userId
    .route('/:userId/:thoughtId/:reactionId')
    .delete(removeReaction)

module.exports = router