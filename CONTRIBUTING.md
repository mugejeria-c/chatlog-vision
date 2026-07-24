# Contributing to ChatLog Vision

Thank you for your interest in contributing! 

## Getting Started

### Prerequisites
- Node.js 18+
- Flutter 3+
- MongoDB
- Git

### Setup

1. **Fork & Clone**
   ```bash
   git clone https://github.com/YOUR_USERNAME/chatlog-vision.git
   cd chatlog-vision
   ```

2. **Create feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Backend setup**
   ```bash
   cd backend
   cp .env.example .env
   npm install
   npm run dev
   ```

4. **Mobile setup** (new terminal)
   ```bash
   cd mobile
   flutter pub get
   flutter run
   ```

## Development Workflow

### Commit Messages
```
feat: Add message search functionality
fix: Resolve Socket.IO connection timeout
docs: Update security guidelines
test: Add tests for user authentication
refactor: Simplify message validation
```

### Pull Request Process
1. Update documentation if needed
2. Add tests for new features
3. Run tests locally
4. Push and create PR with clear description
5. Respond to review feedback

## Code Style

### JavaScript (Backend)
- 2-space indentation
- Semicolons required
- camelCase for variables/functions
- PascalCase for classes

### Dart (Mobile)
- Follow Dart style guide
- camelCase for variables/methods
- PascalCase for classes

## Testing

### Backend
```bash
cd backend
npm test
npm run test:watch
```

### Mobile
```bash
cd mobile
flutter test
```

## License

BSD 3-Clause License - See LICENSE file
