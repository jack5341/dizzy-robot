import axios from "axios";
import { env } from "../../constants/variables.js";

axios.defaults.baseURL = `http://${env.DOMAIN}`;

export default async function sendCommand(msg, cmd) {
    if (!cmd) {
        return msg.channel.send("Missing command or argument");
    }

    return await axios({
        url: "/",
        headers: {
            Authorization: `Bearer ${msg.author.id}`,
        },
        method: "POST",
        data: {
            cmd: cmd,
        },
    })
        .then((res) => msg.channel.send("`" + res.data + "`"))
        .catch((err) => msg.channel.send(err.response.data));
}
