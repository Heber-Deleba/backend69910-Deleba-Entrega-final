import http from 'http';
import { products } from './products.js';

const server = http.createServer((req, res)=>{
    //res.end('mi primer servidor con http')
    console.log(req.url);
    if(req.url=== '/products'){
        res.end(JSON.stringify(products))
    }
})

server.listen(8080,  () => console.log('server ok en puerto 8080'))