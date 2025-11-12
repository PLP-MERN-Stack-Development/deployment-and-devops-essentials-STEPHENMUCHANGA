// --------------------------------------------
// 🌍 Load environment variables
// --------------------------------------------
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const bodyParser = require('body-parser');

const bugsRouter = require('./routes/bugs');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// --------------------------------------------
// 🔐 Security and Middleware Setup
// --------------------------------------------
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }, // allow frontend to load assets
  contentSecurityPolicy: false // disables overly strict CSP for SPA
}));

// Compression for faster responses
app.use(compression());

// Logging – use minimal logs in production
if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
} else {
  app.use(morgan('dev'));
}

// Parse JSON request bodies
app.use(bodyParser.json());

// --------------------------------------------
// 🌍 CORS Configuration
// --------------------------------------------
const allowedOrigins = [
  process.env.FRONTEND_URL || 'https://deployment-and-devops-git-main-stephens-projects-53508f27.vercel.app',
  'http://localhost:3000' // for local testing
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`🚫 CORS blocked request from origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// --------------------------------------------
// 🧱 Routes
// --------------------------------------------
app.use('/api/bugs', bugsRouter);

// --------------------------------------------
// ⚠️ Error Handling Middleware
// --------------------------------------------
app.use(errorHandler);

// --------------------------------------------
// 🚀 Health Check Endpoint (for monitoring)
// --------------------------------------------
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    environment: process.env.NODE_ENV || 'development',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// --------------------------------------------
// ✅ Export App
// --------------------------------------------
module.exports = app;
