import express from "express";
import session from "express-session";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/connectDB.js";
import passport from "passport";
import {ensureAuthentication} from "./controllers/authController.js"
import chalk from "chalk";

// -------------- ROUTES --------------------
import userRoutes from "./routes/userRoutes.js";
import contentRoutes from "./routes/contentRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set up server communication with express
const app = express();
const PORT = 3000;

// Connect to MongoDB
connectDB();

// Session setup (must be done before initializing Passport.js)
app.use(session({
    secret: "chocolate cookie", // random string used to sign the session ID cookie
    resave: false, // don't save session if unmodified
    saveuninitialized: false // don't create a session until something is stored
}));

// Initialize Passport.js for authentication
app.use(passport.initialize());
app.use(passport.session());

// Middleware to parse incoming request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app-level (global) middlewares
// logging all requests
app.use((req, res, next) => {

    // color the log based on the request method
    const method = req.method;
    let color = chalk.blue;
    let time = chalk.blue;
    let url = chalk.bgBlueBright;
    if (method === "GET")
    {
        color = chalk.green;
    }
    if (method === "POST")
    {
        color = chalk.yellow;
    }

    // log the request method, url, and timestamp
    const timestamp = new Date().toLocaleDateString(`en-us`, {
        year: `numeric`,
        month: `2-digit`,
        day: `2-digit`,
        hour: `2-digit`,
        minute: `2-digit`,
        seconds: `2-digit`,
        hour12: false //use 24-hour clock
    });
    console.log(color(`${req.method}`), url(`${req.url}`), `received at `, time(`${timestamp}`));
    next(); //forces the request to go to the next stage (another middleware or the end)
});

// Set up routes
app.use("/login", authRoutes);
app.use("/users", userRoutes);
app.use("/notes", ensureAuthentication, contentRoutes);

// Set up EJS as the view engine and specify the views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
 
// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Default route for the home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Middleware for catching if route is not found
app.use((req, res, next) => {
    const error = new Error(`Route not found: ${req.method}, ${req.url}`);
    error.status = 404;
    next(error);
});

// Error handling middleware
app.use((err, req, res, next) => {
    const error = err.status || 500;

    res.status(error).json({
        error: {
            message: err.message || "internal server error",
            status: error
        },
    });
});

// Open local domain
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});