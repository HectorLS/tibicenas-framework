/////////////////////// LIBRARIES ///////////////////////
/////////////////////////////////////////////////////////
import express    from 'express';
import bodyParser from 'body-parser';
import logger     from 'morgan';
import mongoose   from 'mongoose';

// Import enviromental variables from our variables.env file
require('dotenv').config({ path: 'variables.env'});

// Connect to our database and handle bad connections
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise; // Tell mongoose to use ES6

////////////////////// LOCAL FILES //////////////////////
/////////////////////////////////////////////////////////
// import { getSecret } from './secrets';
// import Comment from './models/comment';

// Create instances
const server = express();
const router = express.Router();

// Set our port to either a predetermined port number if you have set it up, or 3001
const API_PORT = process.env.API_PORT || 3001;


// const os = require("os");
// server.use(express.static("dist"));
// server.get("/api/getUsername", (req, res) =>
//   res.send({ username: os.userInfo().username })
// );
// server.listen(8080, () => console.log("Listening on port 8080!"));

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(3000, () => console.log('Example app listening on port 3000!'))
