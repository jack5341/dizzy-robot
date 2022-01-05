import axios from "axios";
import { env } from "../../constants/variables.js";

export default async function sendCommand(msg, cmd) {
    return await axios({
        headers: {
            Authorization: `Bearer ${env.SECRET_KEY}`,
        },
        method: "POST",
        url: "http://loaclhost:3000/",
        data: {
            cmd: 1111,
        },
    });

    // if (!cmd) {
    //     return msg.channel.send("Missing command or argument");
    // }

    //     // .then((res) => msg.channel.send(res.data))
    //     .catch((err) => console.error(err));
}
