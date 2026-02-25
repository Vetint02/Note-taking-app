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

dependencies should download after `npm install`
if code doesn't work after `npm install`, you may need to manually download these dependencies.

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

`npm start` or `npm dev`

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



# Reflection

The development process started off pretty easy, when I created kanban chart and separated what needed to be worked on and finished. The process was well stream lined enough for me.

However, when the project started getting bit more complex, issues I never even thought about started to emerging, and to accommodate and update my code, it suddenly became a hellscape where if I forgot to implement the changes somewhere in my code, suddenly the functionality of the app stops working and throws error. 

I'd have to dig through and test each function everytime some major changes happened which took majority of my time.

Sometimes I'd find different method of throwing error, which led me to change how error is handled entirely. Unfortunately that meant it was time for another process of going through my code to change every code that was depending on how errors were being handled before changes.

CSS was also an incredibly tediouse job, it's simple and straight forward, but so many things on html, ejs need custom style that over time, the css file just ends up being very big and bloated.

I also had some changes in how I wanted to present ui which made some css to be abandoned but pretty sure is still part of the file.

overall, I think the biggest difficulties of this project was the fact that I had to back track so many times to accommodate changes which meant going line by line on functions or methods, what data is exported to the view engine, and such.

Biggest takeaway from this project is the definitely the importance of having clear goal and thinking about how it may be implemented, requirements, fallbacks before making function and end up having to change it later.