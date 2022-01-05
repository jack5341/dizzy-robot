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
            Authorization: `Bearer ${env.SECRET_KEY}`,
        },
        method: "POST",
        data: {
            cmd: cmd,
        },
    })
        .then((res) => msg.channel.send("`" + res.data + "`"))
        .catch((err) => console.error(err));
}
