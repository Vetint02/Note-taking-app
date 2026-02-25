import content from "../models/contents.js";

export async function viewContents(req, res, next){
    try {
        // Fetch data from passport session
        let username = req.user.username;

        // Find all note data from DB with logged in username
        const all_contents = await content.find({username: username});

        // redirect user with all their note data to ejs file to display
        res.render("notes/index", {title: "Your Notes", notes: all_contents});
    }
    catch (error){
        error.message = "failed to retrieve content";
        next(error);
    }
};

export function redirectToCreate(req, res){
    res.render("notes/create", {title: "New Note"});
}

export async function redirectToUpdate(req, res){
    let noteId = req.params.postId;
    var username = req.user.username;
    const currentNote = await content.findOne({username: username, postId: noteId})
    res.render("notes/update", {title: `Sticky Note ${noteId}`, content: currentNote});
}

export function redirectToDelete(req, res){
}

export async function createContent(req, res, next){
    try {
        // Fetch data from the request body
        if (!req.user) {
            const error = new Error("You must be logged in to create content.");
            error.status = 401;
            next(error);
        }
        
        var {title, note } = req.body;

        // Fetch username from passport session
        var username = req.user.username;

        // Find existing contents for the user to determine the next postId
        const existingContents = await content.find({ username: username });

        let postId = null;

        // If there are no existing contents, start with postId 1
        if (existingContents.length === 0) {
            postId = 1;
        } 
        else {
            // Otherwise, find the largest postId for the user and increment it by 1
            let n = existingContents.length;
            postId = existingContents[n - 1].postId + 1;
        }

        // Post data to database
        await content.create({ username, postId, title, note });

        // Send response back to client
        res.redirect("/notes");
    }
    catch (error){
        error.message = "failed to create content";
        next(error);
    }
};

export async function updateContent(req, res, next) {
    try {
        if (!req.user) {
            const error = new Error("You must be logged in to create content.");
            error.status = 401;
            next(error);
        }

        var {postId, title, note } = req.body;

        postId = req.params.postId;

        // Fetch username from passport session
        var username = req.user.username;

        // Change Id to a number
        postId = Number(postId);

        await content.findOneAndUpdate({ username, postId }, { title, note });
        res.redirect("/notes");
    }
    catch (error) {
        error.message = "failed to update content";
        next(error);
    }
}

export async function deleteContent(req, res, next) {
    try {
        if (!req.user) {
            const error = new Error("You must be logged in to create content.");
            error.status = 401;
            next(error);
        }

        // Fetch postId from request parameter
        var postId = req.params.postId;

        // Change Id to a number
        postId = Number(postId);

        // Fetch username from passport session
        var username = req.user.username;

        await content.findOneAndDelete({ username, postId });

        res.redirect("/notes");
    }
    catch (error) {
        error.message = "failed to delete Note";
        next(error);
    }
}