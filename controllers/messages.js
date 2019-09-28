const Messages = require('../config/relations').messages; // Messages model imported
const httpStatus = require('http-status');
const crypto = require('crypto');

let encrypt = (text) => {
    let key = config.secret;
    let algorithm = 'aes-128-cbc';
    let cipher = crypto.createCipher(algorithm, key);
    let encryptedText = cipher.update(text, 'utf8', 'hex');
    encryptedText += cipher.final('hex');
    return encryptedText;
}

let decrypt = (text) => {
    let key = config.secret;
    let algorithm = 'aes-128-cbc';
    let decipher = crypto.createDecipher(algorithm, key);
    let decryptedText = decipher.update(text, 'hex', 'utf8');
    decryptedText += decipher.final('utf8');
    return decryptedText;
}

// send senderId,receiverId and message in this api
exports.createMessage = (req, res, next) => {
    try {
        const message = req.body;

        message.text = encrypt(message.text);

        Messages.create(message)
            .then(message => {
                res.status(httpStatus.CREATED).json({ message: 'Message created successfully', message });
            })
            .catch(error => {
                res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ message: 'Message creation error', error });
            })

    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Please try again ...', error })
    }
}

// send user1 and user2 in this api in query params
exports.getMessagesOfSenderAndReceiver = async (req, res, next) => {
    try {
        let user1 = req.query.user1;
        let user2 = req.query.user2;

        let senderUser1Messages = await Messages.findAll({
            where: {
                senderId: user1,
                receiverId: user2
            }
        })

        let senderUser2Messages = await Messages.findAll({
            where: {
                receiverId: user1,
                senderId: user2
            }
        })

        let senderUser1MessagesArr = [];
        senderUser1Messages.map(item => {
            item.message = decrypt(item.message);
            senderUser1MessagesArr.push(item);
        })

        let senderUser2MessagesArr = [];
        senderUser2Messages.map(item => {
            item.message = decrypt(item.message);
            senderUser2MessagesArr.push(item);
        })

        res.status(httpStatus.OK).json({ user1sendedmessages: senderUser1MessagesArr, user2sendedmessages: senderUser2MessagesArr })

    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Please try again ...', error })
    }
}