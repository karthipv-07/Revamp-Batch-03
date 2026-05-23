const express = require('express');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

const env = process.argv[2] || "development";
dotenv.config({ path: `.env.${env}` });

const app = express();

const PORT = process.env.PORT;
const APP = process.env.APP;

// Logs folder path
const logDir = path.join(__dirname, 'logs');

// Create logs directory if not exists
if (!fs.existsSync(logDir)) {
	fs.mkdirSync(logDir);
}

// Log file path
const logFile = path.join(logDir, 'app.log');

// Logging function
function log(message) {
	const time = new Date().toISOString();
	const logMessage = `[${time}] [${env.toUpperCase()}] ${message}\n`;

	// Console log
	console.log(logMessage.trim());

	// Write logs to file
	fs.appendFileSync(logFile, logMessage);
}

// Middleware logging every request
app.use((req, res, next) => {
	log(`${req.method} ${req.url} called`);
	next();
});

app.get('/', (req, res) => {
	log("Application endpoint hit");
	res.send("Hello from " + APP);
});

app.get('/health', (req, res) => {
	log("Health check called");

	res.status(200).json({
		status: "UP"
	});
});

app.listen(PORT, () => {
	log(`Server running on port ${PORT}`);
});
