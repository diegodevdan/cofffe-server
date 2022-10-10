const dotenv = require('dotenv').config()
const morgan = require('morgan');
const cors = require('cors');
const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const {dbConnection, dbDisconnect} = require('./database/config')

const userRoutes = require('./routes/users')

//Database
const connectDb = async () => {
    await dbConnection();
};
connectDb();

// const disconnectDb = async () => {
//     await dbDisconnect();
// }


//Middlewares
app.use(morgan('tiny'));
app.use(cors())
app.use(express.static('public'))
app.use(express.json());


//Paths
const usersPath = 'users'

app.use(`/api/${usersPath}`, userRoutes)


app.listen(port, () => {
    console.log(`Server running in port ${port}`)
})