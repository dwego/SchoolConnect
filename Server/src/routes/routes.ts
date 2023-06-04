import {
  RegisterController,
  LoginController,
  InfoController,
} from "../auth/controllers/AuthController";
import tokenMiddleware from "../auth/middlewares/tokenMiddleware";
import express from "express";
import path from "path";

const router = express.Router();

router.get("/email", tokenMiddleware, InfoController.listenEmail);
router.get("/name", InfoController.listenName);
router.get("/:id", InfoController.infoData);
router.get("/create/user", RegisterController.createUser);
router.post("/login", LoginController.login);
router.delete("/delete/user", RegisterController.deleteAllUsers);

export default router;
