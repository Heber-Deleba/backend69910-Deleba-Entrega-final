import { Router } from 'express';
import { validate } from '../middlewares/validation.middleware.js';
import { createUserDto, updateUserDto } from '../dtos/user.dto.js';
import { userController } from '../controllers/user.controllers.js';
import { authorizations } from '../middlewares/authorization.middleware.js';

const router = Router();


router.get('/', async (req, res) => {
  try {
    const users = await userController.getAll(req, res);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.post(
  '/',
  validate(createUserDto),
  async (req, res) => {
    try {
      await userController.create(req, res);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);


router.put(
  '/:id',
  validate(updateUserDto),
  async (req, res) => {
    try {
      const { id } = req.params;
      await userController.update(req, res, id);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

export default router;
