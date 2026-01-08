import {loadEnvFile} from "node:process";
loadEnvFile();
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import {createServer} from "node:http";
import {WebSocketServer} from "ws";
import {AuthController} from "./controller/AuthController";
import {UserController} from "./controller/UserController";
import {CategoryController} from "./controller/CategoryController";
import {PromptController} from "./controller/PromptController";
import {ChatRoomController} from "./controller/ChatRoomController";
import {ChatController} from "./controller/ChatController";


const app = express();
const server = createServer(app);
const wss = new WebSocketServer({server});

app.use(bodyParser.json());
app.use(express.static("public")); //nur für den test WS
app.use(cors());

AuthController.init(app);
UserController.init(app);
CategoryController.init(app);
PromptController.init(app);
ChatRoomController.init(app);
ChatController.init(wss);

server.listen(3000, () => {
    console.log("Server is running on port 3000");
});