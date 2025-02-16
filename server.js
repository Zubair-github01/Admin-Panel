const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB (replace with your connection string)
mongoose.connect('mongodb://localhost:27017/serviceSiderDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Define Mongoose Schemas
const studentSchema = new mongoose.Schema({ name: String, grade: String, busRoute: String });
const busSchema = new mongoose.Schema({ busNumber: String, driverName: String, capacity: Number, route: String });
const routeSchema = new mongoose.Schema({ routeName: String, startPoint: String, endPoint: String, stops: String, estimatedTime: String });
const paymentSchema = new mongoose.Schema({ studentId: String, amount: Number, dueDate: Date, description: String, paid: Boolean });

const Student = mongoose.model('Student', studentSchema);
const Bus = mongoose.model('Bus', busSchema);
const Route = mongoose.model('Route', routeSchema);
const Payment = mongoose.model('Payment', paymentSchema);

// Example API Route
app.get('/api/students', async (req, res) => { const students = await Student.find(); res.json(students); });

// Add other CRUD API routes similarly for Buses, Routes, and Payments

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { console.log(`Server running on port ${PORT}`); });
