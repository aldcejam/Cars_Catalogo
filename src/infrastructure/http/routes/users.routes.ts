import { Router } from "express";
import uploadConfig from "@config/upload";
import multer from "multer";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateUserController } from "@application/accounts/createUser/CreateUserController";
import { FindByEmailController } from "@application/accounts/findByEmail/FindByEmailController";
import { FindByIdController } from "@application/accounts/findById/FindByIdController";
import { UpdateUserAvatarController } from "@application/accounts/updateUserAvatar/UpdateUserAvatarController";

const usersRoutes = Router();
const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

const createUserController = new CreateUserController();
usersRoutes.post("/", createUserController.handle);

const findByEmailController = new FindByEmailController();
usersRoutes.get("/email", findByEmailController.handle);

const findByIdController = new FindByIdController();
usersRoutes.get("/:id", findByIdController.handle);

const updateUserAvatarController = new UpdateUserAvatarController();
usersRoutes.patch(
    "/avatar",
    ensureAuthenticated,
    uploadAvatar.single("avatar"),
    updateUserAvatarController.handle
);

export { usersRoutes }