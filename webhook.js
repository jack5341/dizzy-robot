import express from "express";
import morgan from "morgan";
import { env } from "./constants/variables.js";
import child_process from "child_process";
const app = express();

morgan("dev");

function Authorization(req, res, next) {
    let KEY = req.headers.Authorization || req.headers.authorization;

    if (KEY.startsWith("Bearer ")) KEY = KEY.substr("Bearer ".length);

    if (KEY !== env.SECRET_KEY) {
        return res.status(401);
    }

    next();
    return;
}

app.get("/", Authorization, (req, res) => {
    if (!cmd) {
        return res.statusCode(400);
    }

    // return res.send(child_process.spawnSync(cmd).stdout.toString());
    // return res.send(child_process.spawnSync("docker", ["images"]).stdout.toString());
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
