const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const { testConnection, initializeDatabase } = require('./config/database');

const app = express();
const PORT = process.env.PORT || 5000;

// Function to find available port
const findAvailablePort = (startPort) => {
  return new Promise((resolve, reject) => {
    const server = require('http').createServer();
    
    server.listen(startPort, () => {
      const port = server.address().port;
      server.close(() => resolve(port));
    });
    
    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        resolve(findAvailablePort(startPort + 1));
      } else {
        reject(err);
      }
    });
  });
};

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Test database connection on startup
testConnection();

// Initialize database tables
initializeDatabase();

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/properties', require('./routes/properties'));
app.use('/api/users', require('./routes/users'));

// Serve static files from React build
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Catch all handler for React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server with port conflict handling
const startServer = async () => {
  try {
    const availablePort = await findAvailablePort(PORT);
    app.listen(availablePort, () => {
      console.log(`🚀 Server running on port ${availablePort}`);
      console.log(`📱 Frontend: http://localhost:5173`);
      console.log(`🔧 Backend API: http://localhost:${availablePort}/api`);
      console.log(`\n💡 Para poblar la base de datos con datos de muestra, ejecuta:`);
      console.log(`   node src/scripts/seedDatabase.js`);
    });
  } catch (error) {
    console.error('❌ Error starting server:', error);
    process.exit(1);
  }
};

startServer();