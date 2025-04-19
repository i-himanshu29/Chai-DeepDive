import crypto from "crypto";

//Generate a  secure random state parameter for CSRF(cross site resource sharing) protection

export const generateState = () => {
    return crypto.randomBytes(32).toString("hex");
};

//generate a nonce value to prevent attacks
export const generateNonce = () => {
    return crypto.randomBytes(32).toString("hex");
};