import passport from "passport";
import Strategy from "passport-local";
import User from "../models/users.js";

passport.use(new Strategy(
    async function (username, password, done) {
        try {
            const currentUser = await User.findOne({ username: username}); // fetch the user from the database using the provided username
            // Check if the user exists and if the password is correct
            if (!currentUser || currentUser.password !== password) {
                return done(null, false, { message: "Incorrect username or password" });
            }

            return done(null, currentUser); // If the user is found and the password is correct, authentication succeeds, and the user object is passed to the next middleware
        }
        catch (err) {
            return done(err); // If there's an error during the database query, it is passed to the next middleware
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    // Fetch information from database
    try {
        const loggedInUser = await User.findById(id);;
        done(null, loggedInUser);
    } catch (error) {
        console.error("Failed to deserialize user:", error);
        done(error, null);
    }
});

export default passport;