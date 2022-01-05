import Discord from "discord.js";
import dotenv from "dotenv";
import { env } from "./constants/variables.js";

dotenv.config();
const client = new Discord.Client();

client.on("ready", () => {
    console.log(`${client.user.tag} olarak giriş yapıldı!`);
});

client.on("message", async (msg) => {
    if (msg.content.includes("!oynat") && msg.author.id != client.user.id) {
        const song = msg.content.split("!oynat")[1];
        if (!song) {
            return msg.channel.send("Lütfen bir şarkı adı yazınız!");
        }

        msg.react("▶️");
        if (msg.content.includes("list")) {
            const playlistId = song.split("list=")[1];
            const playlist = await ytpl(playlistId);

            msg.content = playlist.items[0].shortUrl;
            await playMusic(msg, serverQueue, playlist.items.length);
            serverQueue = queue.get(msg.guild.id);
            if (serverQueue !== undefined) {
                playlist.items.forEach(async (video, index) => {
                    if (index !== 0) {
                        const song = {
                            title: video.title,
                            url: video.shortUrl,
                        };
                        serverQueue.songs.push(song);
                    }
                });
            }
        } else {
            playMusic(msg, serverQueue);
        }
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
