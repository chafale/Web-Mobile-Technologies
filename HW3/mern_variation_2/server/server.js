// To connect with your mongoDB database
const mongoose = require('mongoose');

// CHANGE the username,password,link to be yours!
mongoose.connect('mongodb+srv://chafaleao:B1V7Gyo16e0eINeN@cluster0.mrvra.mongodb.net',{
    dbName: 'mybusiness',
    useNewUrlParser: true,
    useUnifiedTopology: true
});


// schema for our table called 'users'
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});
const User = mongoose.model('users', UserSchema); // creates a 'users' table
//\\User.createIndexes();

// express middleware
const express = require('express');
const app = express();
const cors = require("cors");
console.log("App listen at port 5001");
app.use(express.json());
app.use(cors());
app.get("/", (req, resp) => {
  resp.send("App is Working");
  // go to http://localhost:5000 to see this
});

app.post("/register", async (req, resp) => {
    try {
        const user = new User(req.body);
        // .save() sends data to our cloud DB, more here: https://masteringjs.io/tutorials/mongoose/save
        let result = await user.save(); 
        result = result.toObject();
        if (result) {
            delete result.password;
            resp.send(req.body);  
            console.log(result);
        } else {
            console.log("User already registered");
        }

    } catch (e) {
        resp.send("Something went wrong");
    }
});
app.listen(5001);