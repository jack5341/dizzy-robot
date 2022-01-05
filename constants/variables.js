import dotenv from "dotenv";

dotenv.config();

export const env = {
    LOGIN_TOKEN: process.env.LOGIN_TOKEN || "",
    SECRET_KEY: process.env.SECRET_KEY || "",
    DOMAIN: process.env.DOMAIN || "",
};
