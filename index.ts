import express, { Express } from 'express';
import  cors  from 'cors';
import dotenv from "dotenv";
import * as database from "./config/database";
import routerAdmin from './routes/admin/index.route';
import routerClient from './routes/client/index.route';

dotenv.config();
database.connect();


const app: Express = express();
const port: Number | String = process.env.PORT || 3006;

//cort
var corsOptions = {
    origin: 'https://benhvien-hospital.vercel.app/',
    credentials: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));


// Dùng đc req.body
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//routes
routerAdmin(app);
routerClient(app);


app.listen(port, ()=>{
    console.log(`Đã chạy được cổng ${port}`)
})
