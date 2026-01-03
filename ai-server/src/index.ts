import {loadEnvFile} from "node:process";
loadEnvFile();
import express from "express";
import cors from "cors";
import {AuthController} from "./controller/AuthController";
import {UserController} from "./controller/UserController";
import {CategoryController} from "./controller/CategoryController";
import {PromptController} from "./controller/PromptController";


const app = express();

app.use(express.json());
app.use(cors());

AuthController.init(app);
UserController.init(app);
CategoryController.init(app);
PromptController.init(app);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});