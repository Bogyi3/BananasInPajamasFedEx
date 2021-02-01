import express from 'express';
import {
  helloController,
  registrationController,
  sessionsController,
  challengeController,
  usersController,
  userCommitmentController,
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
router.get('/challenge-commitment', challengeController.getCommitments);
router.put('/commitment', challengeController.saveSingleCommitment);
router.get('/user/:username', usersController.getUserByUsername);
router.get('/allUsers', userCommitmentController.getAllUsers);
router.use(authHandler);
router.post('/commitment', userCommitmentController.post);
router.delete('/commitment', userCommitmentController.delete);
router.get('/commitment', userCommitmentController.getUserCommitments);
router.get('/commitment/:commitmentId', userCommitmentController.getSingleUserCommitments);
router.put('/commitment/:commitmentId', userCommitmentController.updateCompleted);
router.use(adminAuthHandler);
router.post('/challenge', challengeController.post);
router.delete('/challenge', challengeController.deleteChallenge);

router.get('/hello', helloController.get);

export default router;
