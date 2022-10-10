const mongoose = require('mongoose')

const options = {
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
};

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_BD, options);
        console.log('Db online')
    } catch (e) {
        throw new Error(`Initialize Db failed`)
    }
}

const dbDisconnect = async () => {
    try {
        await mongoose.disconnect(process.env.MONGO_BD)
        console.log(`Disconnected DB`)
    } catch (e) {
        throw new Error(`Disconnect db failed`)
    }
}



module.exports = {
    dbConnection,
    dbDisconnect
}