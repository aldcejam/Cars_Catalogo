import { Router } from "express";
import uploadConfig from "@config/upload";
import multer from "multer";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateUserController } from "@infra/controllers/accounts/CreateUserController";
import { FindByEmailController } from "@infra/controllers/accounts/FindByEmailController";
import { FindByIdController } from "@infra/controllers/accounts/FindByIdController";
import { UpdateUserAvatarController } from "@infra/controllers/accounts/UpdateUserAvatarController";

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