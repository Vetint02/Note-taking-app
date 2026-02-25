# NOTE APP

# Dependencies

This project will require you to download the following:

* mongoose
* nodemon
* passport
* passport-local
* express
* express-session
* ejs
* chalk

if code doesn't work after npm install, you may need to manually download these dependencies.

# Set up

Project requires you to have pre-setup mongoDB

Requires following hierarchy

```text
localhost:27017
│
└── Notes  <------- DataBase
    ├── contents <--------- collection
    └── users  <--------- collection

```

After mongoDB set up is complete, run `npm start` or `npm dev`

if you recieved :
```
Server is running at http://localhost:3000
MongoDB connected
```
then my project is running successfully on local conditions

# Function

My app is divided into many sub ejs files that can be navigated through GET requests linked to the buttons.

Every request made within the app is logged and presented to the terminal with color coded logs.

When you login, session will be created to bypass `ensureAuthentication` function, allowing you to navigate personal notes and user homepage.

logout will deserialize the session and force user back to login page.

Anytime request is made to change data in DB, POST request will be passed.