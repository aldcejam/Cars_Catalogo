import { Router } from 'express';
import { authenticateUserController } from '../modules/accounts/useCases/authenticateUser/authenticateUserContreoller';

const authenticateRoutes = Router();

const authenticateUserContreoller = new authenticateUserController();

authenticateRoutes.post("/sessions", authenticateUserContreoller.handle);


export { authenticateRoutes };