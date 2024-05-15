import { Router } from "express";
const router = Router();

const pets = [];

router.get('/' , (req, res) => {
    res.status(200).json(pets)
})

router.post('/', (req, res) =>{
    const pet = req.body;
    pets.push(pet)
    res.status(200).json({msg: 'mascota garegada con exito', pet})

})


export default router;