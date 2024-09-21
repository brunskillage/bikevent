import { handler } from './handler.js';
import express from 'express';
import fs from "node:fs";
import https from "node:https";
import dotenv from "dotenv"; // not working?
const app = express();
import path from 'path';
import url from 'url';

const port = 8004;
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// add a route that lives separately from the SvelteKit app
app.get('/healthcheck', (req, res) => {
	res.end('ok');
});

// let SvelteKit handle everything else, including serving prerendered pages and static assets
app.use(handler);


// https
const options = {
    pfx: fs.readFileSync(`${__dirname}/cert.pfx`),
    passphrase: "123",
};

var server = https.createServer(options, app).listen(port, function () {
    console.log(`⚡️[server]: Bikevent is running at https://localhost:${port}`);
});

process.on("exit", function () {
    console.log("Connection has closed.");
});
