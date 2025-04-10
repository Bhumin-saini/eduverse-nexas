require('dotenv').config();

module.exports = {
  // Server configuration
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // Database configuration
  dbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/eduverse',
  
  // JWT configuration
  jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret_key',
  jwtExpiration: process.env.JWT_EXPIRATION || '24h',
  
  // Blockchain configuration
  web3Provider: process.env.WEB3_PROVIDER || 'http://localhost:8545',
  contractAddress: process.env.CONTRACT_ADDRESS,
  
  // AWS configuration (for file storage)
  awsRegion: process.env.AWS_REGION,
  awsBucket: process.env.AWS_BUCKET,
  
  // Email configuration
  emailService: process.env.EMAIL_SERVICE,
  emailUser: process.env.EMAIL_USER,
  emailPassword: process.env.EMAIL_PASSWORD,
  
  // Logging
  logLevel: process.env.LOG_LEVEL || 'info',
  
  // CORS settings
  corsOrigin: process.env.CORS_ORIGIN || '*'
}; 