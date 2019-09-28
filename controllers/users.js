const Users = require('../config/relations').users; // Users model imported
const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');

// send all user specific fields as mentioned in user model 
exports.createUser = (req, res, next) => {
    try {
        const user = req.body;

        user.password = bcrypt.hashSync(user.password, 8);

        Users.create(user)
            .then(user => {
                res.status(httpStatus.CREATED).json({ message: 'User created successfully', user });
            })
            .catch(error => {
                res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ message: 'User creation error', error });
            })

    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Please try again ...', error })
    }
}

// send username and password
exports.userLogin = (req, res, next) => {
    try {
        const user = req.body;

        Users.findOne({
            where: {
                username: user.username
            }
        })
            .then(userFound => {
                if (userFound === null) {
                    res.status(httpStatus.NOT_FOUND).json({ message: 'User does not exist' });
                } else {
                    let passKeyTrue = bcrypt.compareSync(user.password, userFound.password);
                    if (passKeyTrue) {
                        res.status(httpStatus.OK).json({ message: 'User verified' })
                    } else {
                        res.status(httpStatus.UNAUTHORIZED).json({ message: 'Wrong password!' })
                    }
                }
            })
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Please try again ...', error })
    }
}