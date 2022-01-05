import child_process from "child_process";
import { env } from "../constants/variables.js";

export default function Authorize(msg, id) {
    if (id !== env.ADMIN_ID) {
        msg.channel.send("I need Admin Bitch!");
    }

    const [command, ...args] = msg.content.split("!cmd")[1].trim().split(" ");
    msg.channel.send("```" + child_process.spawnSync(command, args).stdout.toString() + "```");
}
