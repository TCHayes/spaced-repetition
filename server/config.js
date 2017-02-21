const HOST = process.env.SERVER_HOST || process.env.HOST || 'localhost';
const PORT = process.env.SERVER_PORT || process.env.PORT || 8080;
const ROOT = `http://${HOST}:${PORT}`;
const CLIENT_HOST = process.env.CLIENT_HOST || 'localhost';
const CLIENT_PORT = process.env.CLIENT_PORT || 3000;
const CLIENT_ROOT = `http://${CLIENT_HOST}:${CLIENT_PORT}`;

module.exports = {
    HOST,
    PORT,
    ROOT,
    CLIENT_HOST,
    CLIENT_PORT,
    CLIENT_ROOT
};

