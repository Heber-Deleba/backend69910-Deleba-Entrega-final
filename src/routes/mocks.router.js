import express from 'express';
import { generateMockUsers } from '../utils/mocking.js'; 
import bcrypt from 'bcrypt';

const router = express.Router();


router.get('/mockingusers', (req, res) => {
    const users = generateMockUsers(50);
    res.json(users);
});


router.post('/generateData', (req, res) => {
    const { users, pets } = req.body;
    const generatedUsers = generateMockUsers(users, pets);
    res.json(generatedUsers);
});

export default router;

