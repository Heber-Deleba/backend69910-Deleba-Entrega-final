
/*

import express from 'express'
import { products } from './products.js';
import {  UserManager } from './user.manager.js';
const userManager = new UserManager ('./users.json');

const app = express();

app.get('/products', (req,res) => {
    res.json(products);
});

app.get('/users' , async (req, res) =>{
    try{
        const users = await userManager.getUsers();
        res.status(200).json(users);
    }catch (error) {
        res.status(500).json({msg: 'server error'})
    }
})


const PORT = 8080;

app.listen(PORT, ()=>console.log(`Server on port ${PORT}`))

*/