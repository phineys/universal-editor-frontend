const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

// Define your constants from the provided information
const clientId = '';
const clientSecret = ''; // You might not need this if using a private key
const imsEndpoint = '';

// Read the private key
const privateKey = // fs.readFileSync(privateKeyPath, 'utf8');

// Define the payload
const payload = {
  iss: clientId, // Issuer (your client ID)
  sub: clientId, // Subject (your client ID)
  aud: `https://${imsEndpoint}/c/${clientId}`, // Audience (Adobe's endpoint)
  exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), // Token expiration (1 hour from now)
  // Other claims as needed
};

// Define options for JWT
const options = {
  algorithm: 'RS256', // Algorithm used to sign the JWT
  expiresIn: '24h', // Token expiration
};

// Generate the JWT
const token = jwt.sign(payload, privateKey, options);

console.log('Generated JWT:', token);