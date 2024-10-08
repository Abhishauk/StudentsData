import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import studentRoutes from './routes/Students.js'




const PORT = 5000;
const app = express();
app.use(cors())
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/StudentsData');
const db = mongoose.connection;

db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});

db.once('open', () => {
    console.log('Connected to MongoDB');
});

db.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
});

app.use('/api', studentRoutes);
app.listen(PORT , () => {
   console.log("connected port ");
   
})