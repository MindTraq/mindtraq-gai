# MindTraq
## About
Mental health for a better future.

## Developer Guide
**This guide assumes a Linux environment**. For Windows users, WSL 2 is recommended.

Here's a step by step guide to cloning and running the app:

1) Clone the repository
```bash
git clone https://github.com/MindTraq/mindtraq
```

2) Install `npm` dependencies
```bash
# Install backend dependencies
cd mindtraq && npm install

# Install client app dependencies
cd app && npm install && cd ../
```

3) Create RSA keypairs for JWTs.
```bash
mkdir keys && mkdir keys/auth && cd keys/auth

# Generate Private keys
ssh-keygen -t rsa -b 4096 -m PEM -f access_token.pem && ssh-keygen -t rsa -b 4096 -m PEM -f refresh_token.pem

# Generate Public keys
openssl rsa -in access_token.pem -pubout -outform PEM -out access_token.pub.pem && openssl rsa -in refresh_token.pem -pubout -outform PEM -out refresh_token.pub.pem

# Change back to root
cd ../../
```

4) Install SurrealDB
```bash
curl -sSf https://install.surrealdb.com | sh

# Upgrade to latest alpha
surreal upgrade --alpha
```

5) Run the API server and database in different terminals
```bash
npm run db # Terminal 1
node apiServer.js # Terminal 2
```

4) Run the app in development mode.
```bash
npm run app
```

The web app can be accessed at http://localhost:8080