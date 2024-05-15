import express from 'express'
import userRouter from './routes/user-routes.js'
import petRouter from './routes/pets.router.js'
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

console.log(__dirname) 

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}));





app.use(express.static(__dirname + '/public'))

__dirname

app.use('/users' , userRouter);
app.use('/pets', petRouter)



const PORT = 8080;

app.listen(PORT, ()=>console.log(`Server on port ${PORT}`))