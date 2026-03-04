import Router from "express";
import { redirectToCreate, redirectToUpdate, redirectToHome, createUser, updateUser} from "../controllers/userController.js";
import { ensureAuthentication } from "../controllers/authController.js";

const router = Router();

router.get("/", ensureAuthentication, redirectToHome);
router.get("/create", redirectToCreate);
router.get("/update", ensureAuthentication, redirectToUpdate);
router.post("/create", createUser);
router.post("/update", ensureAuthentication, updateUser);

export default router;