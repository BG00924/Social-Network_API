const { User } = require('../models')

const userController = {
    getAllUsers(req, res) {
        User.find({})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1})
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err)
                res.status(400).json(err)
            })
    },

    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({ 
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No User with this id' })
                    return
                }
                res.json(dbUserData)
            })
            .catch(err => {
                console.log(err)
                res.status(400).json(err)
            })
    },

    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err))
    },

    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true})
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No User with this id' })
                    return
                }
            res.json(dbUserData)
            })
            .catch(err => res.status(400).json(err))
    },

    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No User with this id' })
                    return
                }
                res.json(dbUserData)
            })
            .catch(err => res.status(400).json(err))
    },

    // addFriend({ params, body }, res) {
    //     let friend = body
    //     User.findOneAndUpdate(
    //         { _id: params.userId },
    //         { $push: { friends: [friend] } },
    //         { new: true}
    //     )
    //         .then(dbUserData => {
    //             if (!dbUserData) {
    //                 res.status(404).json({ message: 'No User with this id' })
    //                 return
    //             }
    //             res.json(dbUserData)
    //         })
    //         .catch(err => res.json(err))            
    // }

    addFriend({ params, body }, res) {
        console.log(body)
        User.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { friends: _id } },
                    { new: true }
                )
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No User with this id' })
                    return
                }
                res.json(dbUserData)
            })
            .catch(err => res.json(err))
    }

    // addThought({ params, body }, res) {
    //     console.log(body)
    //     Thought.create(body)
    //         .then(({ _id }) => {
    //             return User.findOneAndUpdate(
    //                 { _id: params.userId },
    //                 { $push: { thoughts: _id } },
    //                 { new: true }
    //             )
    //         })
    //         .then(dbUserData => {
    //             if (!dbUserData) {
    //                 res.status(404).json({ message: 'No User with this id' })
    //                 return
    //             }
    //             res.json(dbUserData)
    //         })
    //         .catch(err => res.json(err))
    // },
}

module.exports = userController