const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
// imagegallery
mongoose.connect('mongodb+srv://imagegallery:imagegallery@firstcluster.fcybv.mongodb.net/?retryWrites=true&w=majority',{useUnifiedTopology: true});

const connection = mongoose.connection;

connection.once('open', () => console.log("connected to the mongodb"));

const app = express();

const path = require('path');

app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

const port = process.env.port || 2500;

const userRoute = require('./Routes/UserRoutes');
const ImageRoute = require('./Routes/ImagesRoutes');

app.use('/uploads', express.static(path.join('uploads')));
app.use('/users',userRoute);
app.use('/',ImageRoute);

app.listen(port, () => console.log(`running on the server ${port}`));