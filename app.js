const dotenv = require('dotenv').config()
const morgan = require('morgan');
const cors = require('cors');
const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const {dbConnection, dbDisconnect} = require('./database/config')

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


//Routes
const userRoutes = require('./routes/users')
const authRoutes = require('./routes/auth')


//Paths
const usersPath = 'users';
const authPath = 'auth';

app.use(`/api/${usersPath}`, userRoutes)
app.use(`/api/${authPath}`, authRoutes)


app.listen(port, () => {
    console.log(`Server running in port ${port}`)
})