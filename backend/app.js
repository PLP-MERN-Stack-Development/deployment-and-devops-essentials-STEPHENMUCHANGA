// Load environment variables
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const bugsRouter = require('./routes/bugs');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// ------------------------------
// 🔐 Security and Middleware Setup
// ------------------------------
app.use(helmet()); // Sets secure HTTP headers
app.use(morgan('combined')); // Logs requests in production
app.use(bodyParser.json());

// ------------------------------
// 🌍 CORS Configuration
// ------------------------------
const allowedOrigins = [
  process.env.FRONTEND_URL || 'https://deployment-and-devops-git-main-stephens-projects-53508f27.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests from approved origins only
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// ------------------------------
// 🧱 Routes
// ------------------------------
app.use('/api/bugs', bugsRouter);

// ------------------------------
// ⚠️ Error Handling Middleware
// ------------------------------
app.use(errorHandler);

// ------------------------------
// 🚀 Health Check (for monitoring)
// ------------------------------
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', environment: process.env.NODE_ENV || 'development' });
});

module.exports = app;
