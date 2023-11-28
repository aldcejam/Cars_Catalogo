import { Router } from 'express';
import { AuthenticateUserController } from '@infra/controllers/accounts/authenticateUserController';

const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();

authenticateRoutes.post("/sessions", authenticateUserController.handle);


export { authenticateRoutes };