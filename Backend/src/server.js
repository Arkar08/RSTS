import http from "http";
import app from "./index.js";
import dotenv from "dotenv";
import connectToDb from "./db/connectToDb.js";
import { Server } from "socket.io";

//config env
dotenv.config();

//server calling
const server = http.createServer(app);


//socket connected
export const io = new Server(server,{
  cors:{
    origin:"https://rstsvintageshop.com.au",
    methods:['GET',"POST"]
  }
})

//localhost
const PORT = process.env.PORT || 8000;

server.listen(PORT, async () => {
  await connectToDb();
  console.log(`server is running on ${PORT}`);
});
