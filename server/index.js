import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import userModel from './models/user.js';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));
app.use(express.json());

// Connect to MongoDB
const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI, {
})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log('MongoDB connection error:', err));


// Routes
app.get('/', async (req, res) => {
  try {
    const users = await userModel.find({});
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching users' });
  }
});



app.get('/getUser/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.findById(id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching user' });
  }
});

app.post('/createUser', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // This is the most appropriate way to create a new element in the model.
    const user = new userModel({ name, email, password });
    // const user = await userModel.create({name,email,password});

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Error creating user' });
  }
});

app.put('/updateUser/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;
  try {
     
    // databasemodel.findByIdAndUpdate takes 2 parameters 1 is id that it has to match , and the second one is the data that that we want to update with 
    const user = await userModel.findByIdAndUpdate(id, { name, email, age }, { new: true });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Error updating user' });
  }
});

app.delete('/deleteUser/:id', async (req, res) => {
  const { id } = req.params;
  try {
    // here we find the id
    const user = await userModel.findByIdAndDelete(id);
    // if id is not found  return a response 
    if (!user) return res.status(404).json({ error: 'User not found' });
    // else i.e if id is found and is deleted successfull we return as res in json with message ({ message:'user deleted});
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting user' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
