import {loadEnvFile} from "node:process";
loadEnvFile();

import express from "express";
import cors from "cors";
import {AuthController} from "./controller/authController";
import {UserController} from "./controller/userController";

const app = express();

app.use(express.json());
app.use(cors());

AuthController.init(app);
UserController.init(app);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});