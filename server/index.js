const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UsersModel = require('./Models/Users.js')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')

const app = express()
dotenv.config();
app.use(express.json())
// app.set('trust proxy' , true)
app.use(cors())

const PORT = process.env.port || 5000

// const DATABASE = process.env.REACT_APP_DATABASE_URL
// mongoose.connect(DATABASE)
mongoose.connect(process.env.REACT_APP_DATABASE_URL)

app.post('/TrackUserInformation', async (req, res) => {
  const { email } = req.body;
  
  try {
    const existingUser = await UsersModel.findOne({ email });
    
    if (existingUser) {
      return res.json({ Status: "Email already exists" });
      
    }
    
    const newUser = await UsersModel.create(req.body);
    
    return res.json(newUser);
  } catch (error) {
    console.error('Error during user registration:', error);
    return res.status(500).json({ Status: "Internal server error" });
  }
});


app.post('/Login', async (req, res) => {
  const secretKey = process.env.REACT_APP_JWT_SECRET_KEY;
  const { email, password , ipAddress } = req.body;

  try {
    const user = await UsersModel.findOne({ email: email });

    if (!user) {
      return res.json({ Status: "No record exists" });
    }

    if (user.password !== password) {
      return res.json({ Status: "The password is incorrect" });
    }
    const token = jwt.sign({ email: email }, secretKey, { expiresIn: '1h' });

    const loginTime = new Date();
    const loginHistoryEntry = {
      loginTime: loginTime,
      ipAddress: ipAddress, 
    };

    user.loginHistory.push(loginHistoryEntry);

    await user.save();

    return res.json({ Status: "Success", token });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ Status: "Internal server error" });
  }
});


app.get('/LoginHistory/:email', async (req, res) => {
  const { email } = req.params; 
   console.log('User Email:', email);
  try {
    const user = await UsersModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ Status: "User not found" });
    }

    const loginHistory = user.loginHistory;

    const loginHistoryData = loginHistory.map((entry) => ({
      ipAddress: entry.ipAddress,
      loginTime: entry.loginTime,
    }));

    return res.json({ LoginHistory: loginHistoryData });
  } catch (error) {
    console.error('Error fetching login history:', error);
    return res.status(500).json({ Status: "Internal server error" });
  }
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)

})
