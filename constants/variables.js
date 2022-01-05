import dotenv from "dotenv";

dotenv.config();

export const env = {
    LOGIN_TOKEN: process.env.LOGIN_TOKEN || "",
    DOMAIN: process.env.DOMAIN || "",
    ADMIN_ID: process.env.ADMIN_ID || "",
};
