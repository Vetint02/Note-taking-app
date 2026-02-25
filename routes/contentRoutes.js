import Router from "express";
import { viewContents, redirectToDelete, redirectToUpdate, redirectToCreate, createContent, updateContent, deleteContent } from "../controllers/contentController.js";

const router = Router();

router.get("/", viewContents);
router.get("/update/:postId", redirectToUpdate);
router.post("/", redirectToCreate);
router.post("/create", createContent);
router.post("/update/:postId", updateContent);
router.post("/delete/:postId", deleteContent);

export default router;