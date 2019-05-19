const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const BookRoutes = express.Router();
const PORT = 4000;
const server = require('repl');

app.use(cors());
app.use(bodyParser.json());
app.use('/books', BookRoutes);

mongoose.connect('mongodb://127.0.0.1:27017/sellnbye', {useNewUrlParser: true})
    .then(() => {
        return server.start();
    }).catch(err => {
    console.error(err);
    process.exit(1);
});

const connection = mongoose.connection;
connection.once('open', function () {
    console.log('MongoDB database connection established successfully');
});

require('./routes/api/BookDetailsManagement')(app);
require('./routes/api/UserDetailsManagement')(app);

app.listen(PORT, function () {
    console.log("Server is Running on Port :" + PORT);
});