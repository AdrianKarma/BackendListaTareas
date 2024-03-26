import express from 'express';
import 'dotenv/config'; 
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import recetasRouter from './src/Routes/tareas.routes.js'
import './src/database/database.js'

//1  puerto
const app = express();

app.set('port', process.env.PORT || 4000 );
app.listen(app.get('port'), ()=>{
    console.log('Estoy en el puerto '+ app.get('port'))
})
//2 middlewares
app.use(cors()); 
app.use(morgan('dev'))
app.use(express.json()); 
app.use(express.urlencoded({extended:true})) 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname,'/public')))

//3  rutas

app.use('/api', recetasRouter )

