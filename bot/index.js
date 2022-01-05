import Discord from "discord.js";
import { env } from "../constants/variables.js";
import sendCommand from "./utils/request.js";

const client = new Discord.Client();

client.on("ready", () => {
    console.log(`${client.user.tag} is online!`);
});

client.on("message", async (msg) => {
    if (msg.content.includes("!cmd") && msg.author.id != client.user.id) {
        msg.channel.send("Waiting for response...");
        return await sendCommand(msg, msg.content.split("!cmd")[1].trim());
    }
});

process.stdout.on("error", function (err) {
    if (err.code == "EPIPE") {
        process.exit(0);
    }
});

process.on("uncaughtException", (err) => {
    console.log("whoops! There was an uncaught error", err.stack);
});

client.on("shardError", (error) => {
    console.error("A websocket connection encountered an error:", error);
});

client.login(env.LOGIN_TOKEN);
