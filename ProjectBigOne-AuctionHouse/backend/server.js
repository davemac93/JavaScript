const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
const saltRounds = 10;



app.use(cors({ origin: 'http://127.0.0.1:5500', credentials: true }));
app.use(express.json());



//Connection To MongoDV
mongoose.connect('mongodb+srv://dawidmac:BxsbFg0hl0WO3a5O@auctionhouse-dev-v1.1ggmddb.mongodb.net/')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });



// Define the User schema directly in server.js
const userSchema = new mongoose.Schema({
  name: String,
  lastname: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

//Endpoint POST REGISTER
app.post('/user', async (req, res) => {
  try {
    const { name, lastname, email, password } = req.body;
    const hashedPassword =  bcrypt.hash(password, saltRounds, function(err, hash) {
      // Store hash in your password DB.
  });
    console.log(name + lastname + email + password);


    const newUser = new User({
      name,
      lastname,
      email,
      password: hashedPassword,
    });

    console.log(newUser);

    await newUser.save();
    res.send('User added successfully!');
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).send(error.message);
  }
});

app.post('/login', async (req, res) => {
  
  try {
    const { email, password } = req.body;


    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).send('Invalid email');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).send('Invalid password');
    }
    console.log(user.email)
    res.send('Login successful!');
  } catch (error) {
    console.error('Error during login:', error);
    res.status(405).send(error.message);
  }
});

app.use((req, res) => {
  res.status(404).send('Not Found');
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
