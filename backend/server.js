import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Load environment variables
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: process.env.SOCKET_CORS_ORIGIN || '*',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Database Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/chatlog-vision');
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};

// Connect to database
connectDB();

// Health Check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

app.get('/api', (req, res) => {
  res.json({
    message: 'ChatLog Vision API',
    version: '1.0.0',
    status: 'running'
  });
});

// Socket.IO Events
io.on('connection', (socket) => {
  console.log(`New client connected: ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });

  // Message events
  socket.on('send_message', (data) => {
    io.emit('receive_message', data);
  });

  // Typing indicator
  socket.on('user_typing', (data) => {
    socket.broadcast.emit('user_typing', data);
  });

  // Online status
  socket.on('user_online', (data) => {
    io.emit('user_status', { ...data, status: 'online' });
  });

  socket.on('user_offline', (data) => {
    io.emit('user_status', { ...data, status: 'offline' });
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`\n🚀 ChatLog Vision Server Running`);
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log(`🔌 Socket.IO: ws://localhost:${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
});

export { app, io };
