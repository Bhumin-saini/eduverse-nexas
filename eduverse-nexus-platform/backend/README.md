# EduVerse Backend Architecture

This backend architecture provides the server-side infrastructure for the EduVerse platform, connecting the React frontend with blockchain functionality while providing traditional database services for performance and reliability.

## Architecture Overview

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  React Frontend │━━━━▶│  Backend API    │━━━━▶│  Database Layer │
│                 │     │                 │     │                 │
└────────┬────────┘     └────────┬────────┘     └─────────────────┘
         │                       │                       ▲
         │                       ▼                       │
         │              ┌─────────────────┐             │
         └━━━━━━━━━━━━▶│  Blockchain      │━━━━━━━━━━━━━┘
                       │  Integration     │
                       └─────────────────┘
```

## Technology Stack

### API Layer (Node.js, Express)
- RESTful API endpoints
- GraphQL API for complex queries
- WebSocket connections for real-time updates
- JWT authentication and authorization

### Database Layer (PostgreSQL)
- Relational data storage
- Student records
- Course/curriculum data
- Performance and activity logs
- Cache management

### Blockchain Integration
- Ethereum/Arbitrum L3 interaction
- Smart contract event listeners
- Transaction management
- Wallet verification
- EduPoints token operations

## Core Backend Services

### 1. Authentication Service
- User registration and login
- JWT token management
- Wallet connection verification
- 2FA support
- Session management

### 2. Student Management
- Student profiles and identity verification
- Academic record management
- Achievement tracking
- Credential verification

### 3. Course Management
- Course catalog and curriculum data
- Enrollment management
- Assignment submission and grading
- Progress tracking

### 4. Token Economy Service
- EduPoints balance tracking
- Transaction history
- Reward distribution
- Staking management
- Points redemption

### 5. Notification Service
- Email notifications
- In-app notifications
- Webhook integration for third-party services
- Event-driven notifications

### 6. DAO Governance
- Proposal management
- Voting mechanisms
- Treasury management
- Governance reporting

## Database Schema

The database uses PostgreSQL with the following core tables:

- **users**: Core user information
- **students**: Student-specific information
- **wallets**: Blockchain wallet connections
- **courses**: Course information and metadata
- **enrollments**: Student course enrollments
- **assignments**: Course assignments
- **submissions**: Student assignment submissions
- **achievements**: Student achievements
- **transactions**: EduPoints transactions
- **stakingRecords**: Staking history
- **redemptions**: Points redemption records
- **proposals**: DAO governance proposals
- **votes**: Proposal votes

## API Documentation

The API is documented using OpenAPI/Swagger specification available at `/api/docs` when running the backend server.

## Deployment

The backend is designed for containerized deployment using Docker and Kubernetes for orchestration, providing scalability and high availability.

## Development Setup

1. Clone the repository
2. Install dependencies with `npm install`
3. Set up environment variables
4. Run database migrations with `npm run migrate`
5. Start the development server with `npm run dev`

## Environment Variables

The backend requires the following environment variables:

```
# Server
PORT=3000
NODE_ENV=development

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/eduverse

# Authentication
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d

# Blockchain
CHAIN_ID=42161 # Arbitrum One
CONTRACT_ADDRESS=0x...
RPC_URL=https://...
PRIVATE_KEY=optional_for_admin_operations

# Email
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=user@example.com
SMTP_PASS=password
``` 