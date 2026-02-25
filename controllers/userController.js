import user from "../models/users.js";
import content from "../models/contents.js"

export async function viewUsers(req, res, next){
    try {
        const all_users = await user.find();
        console.log(all_users);
    } catch (error) {
        error.message = "failed to fetch users";
        next(error);
    }
}

export async function createUser(req, res, next){
    try {
        var {username, password} = req.body;

        const existingUsers = await user.find();

        let n = existingUsers.length;

        for (let i = 0; i < n; i++) {
            if (existingUsers[i].username.toLowerCase() === username.toLowerCase()) {
                const err = new Error("Username already exists");
                err.status = 400;
                return next(err);
            }
        }

        await user.create({ username, password });
        res.redirect('/');
    }
    catch (error) {
        next(error);
    }
}

export async function updateUser(req, res, next) {
    try {
        var { username, password, new_password} = req.body;

        if (username != req.user.username)
        {
            const error = new Error("Use Your Current username");
            error.status = 400;
            next(error);
            return;
        }

        if (password != new_password)
        {
            const error = new Error("Passwords do not match");
            error.status = 400;
            next(error)
            return;
        }
        
        await user.findOneAndUpdate({username}, { password });
        res.redirect("/users");
    }
    catch (error) {
        error.message = "failed to update user";
        next(error);
    }
}


export function redirectToCreate(req, res) {
    res.render("user/createUser", {title: "Let's create account"})
}

export async function redirectToHome(req, res, next){
    try{
        var username = req.user.username;
        const note = await content.find({username: username})
        const noteCount = note.length;
        res.render("user/userHome", {title: "User Home", username: username, noteCount:noteCount})
    }
    catch (error){
        error.message = "failed to redirect to Home";
        next(error);
    }
}

export function redirectToUpdate(req, res){
    res.render("user/update", {title: "Updating Password"});
}