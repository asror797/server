import express from "express";
import { dataSource } from "./config/ormconfig";
const PORT = 5050;
import cors from "cors"
import router from "./routes"

const app:express.Application = express()

app.use(cors())
app.use(express.json())

dataSource
    .initialize()
    .then(() => console.log("Initialized  database"))
    .catch((err) => console.log(err));

app.use(router)


app.listen(PORT , () => {
   console.log('Server is runing at 5050')
})