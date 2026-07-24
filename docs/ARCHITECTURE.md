# ChatLog Vision - Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Client Layer                            │
│  ┌──────────────────────────────────────────────────────┐   │
│  │         Flutter Mobile Application                  │   │
│  │  ┌─────────────┬────────────┬──────────────────┐    │   │
│  │  │   UI Layer  │ State Mgmt │  Local Storage   │    │   │
│  │  └─────────────┴────────────┴──────────────────┘    │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                          ↓
                    [HTTPS / Socket.IO]
                          ↓
┌─────────────────────────────────────────────────────────────┐
│                  Communication Layer                         │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Nginx Reverse Proxy                      │   │
│  │   Load Balancing • SSL/TLS • Rate Limiting           │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│                    Backend Layer                             │
│  ┌──────────────────────────────────────────────────────┐   │
│  │           Express.js API Server                      │   │
│  │  ┌──────────────┬──────────────┬──────────────┐     │   │
│  │  │   REST API   │  Socket.IO   │ Middleware   │     │   │
│  │  └──────────────┴──────────────┴──────────────┘     │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│                   Data Layer                                 │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  MongoDB Database                                    │   │
│  │  ┌──────────┬──────────┬──────────┬──────────────┐   │   │
│  │  │ Users    │Messages  │ Chats    │ Attachments  │   │   │
│  │  └──────────┴──────────┴──────────┴──────────────┘   │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Firebase Services                                   │   │
│  │  ┌──────────────┬──────────────┬──────────────┐     │   │
│  │  │ Authentication │ Notifications │ Storage   │     │   │
│  │  └──────────────┴──────────────┴──────────────┘     │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Technology Stack

### Frontend (Mobile)
- **Flutter**: Cross-platform mobile development
- **Provider/Riverpod**: State management
- **Dio**: HTTP client
- **Socket.IO Client**: Real-time messaging
- **Hive**: Local encrypted storage
- **Firebase**: Auth, messaging, storage

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web framework
- **MongoDB**: NoSQL database
- **Mongoose**: Database ODM
- **Socket.IO**: Real-time communication
- **Firebase Admin SDK**: Server integration

### Infrastructure
- **Docker**: Containerization
- **Nginx**: Reverse proxy & load balancing
- **GitHub Actions**: CI/CD automation

## Data Flow

### Real-time Messaging
1. User sends message → Socket.IO event
2. Server validates & saves to MongoDB
3. Broadcasts to recipients
4. Firebase notification delivery
5. UI updates in real-time
