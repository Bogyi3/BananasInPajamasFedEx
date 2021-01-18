import express from 'express';
import { helloController, registrationController, sessionsController } from '../controllers';

const cors = require('cors');

const router = express.Router();

router.use(cors());
router.use(express.json());

router.post('/registration', registrationController.post);
router.post('/sessions', sessionsController.post);

router.get('/hello', helloController.get);

export default router;
