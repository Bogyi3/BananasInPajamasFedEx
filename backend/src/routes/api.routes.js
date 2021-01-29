import express from 'express';
import {
  helloController,
  registrationController,
  sessionsController,
  challengeController,
} from '../controllers';

import authHandler from '../middlewares/auth-handler';
import adminAuthHandler from '../middlewares/admin-auth-handler';

const cors = require('cors');

const router = express.Router();

router.use(cors());
router.use(express.json());

router.post('/registration', registrationController.post);
router.post('/sessions', sessionsController.post);
router.get('/challenge', challengeController.get);
router.use(authHandler);
router.use(adminAuthHandler);
router.post('/challenge', challengeController.post);

router.get('/hello', helloController.get);

export default router;
