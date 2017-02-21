export const HOST = process.env.CLIENT_HOST || process.env.HOST || 'localhost';
export const PORT = process.env.CLIENT_PORT || process.env.PORT || 3000;
export const ROOT = `http://${HOST}:${PORT}`
export const SERVER_HOST = process.env.SERVER_HOST || 'localhost';
export const SERVER_PORT = process.env.SERVER_POST || 8080;
export const SERVER_ROOT = `http://${SERVER_HOST}:${SERVER_PORT}`
