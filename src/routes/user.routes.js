import { Router } from 'express';
import { validate } from '../middlewares/validation.middleware.js';
import { createUserDto, updateUserDto } from '../dtos/user.dto.js';
import { userController } from '../controllers/user.controllers.js';
import { authorizations } from '../middlewares/authorization.middleware.js';

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         first_name:
 *           type: string
 *           description: El nombre del usuario
 *         last_name:
 *           type: string
 *           description: El apellido del usuario
 *         email:
 *           type: string
 *           description: El correo del usuario
 *         age:
 *           type: integer
 *           description: La edad del usuario
 *         role:
 *           type: string
 *           description: El rol del usuario
 */


const router = Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/', async (req, res) => {
  try {
    const users = await userController.getAll(req, res);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Crea un nuevo usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuario creado
 *       400:
 *         description: Error de validación
 */
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
