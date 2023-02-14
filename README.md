## This is a Fashify API for handling the routes for CRUD operations on 
1. Users
2. Products
3. Cart
4. Orders

## The routes are JWT authorized

## Payment gateway stripe is used to process the payments of the orders


## How to run?
1. Clone this repo
2. install dependencies
    npm install
3. add .env file. It should have following variables
    PORT : where the api runsJS
    MONGODB_URL: mongo db connection url
    JWT_SECRET: secret token to sign 
    PWD_SECRET: to encrypt the password, I have used Crypto
    STRIPE_SECRET: stripe secret key for backend payment processing
                 : To get the key , sign up in stripe, go to developer tab, slick on API keys
4. Finally :- npm run start
