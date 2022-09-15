const express = require("express");
const next = require("next");
const fs = require("fs");
const startup = require("./src/startup");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// Log uncaught exceptions to stderr
process.on("uncaughtException", function (err) {
    console.error("Uncaught exception:", err);
});

app.root = __dirname;

/**
 * Load config.json and config-default.json
 */
app.config = JSON.parse(
    fs.readFileSync(__dirname + "/config-default.json", "utf8")
);

try {
    let customConfig = fs.readFileSync(__dirname + "/config.json", "utf8");
    if (typeof customConfig === "string") {
        try {
            customConfig = JSON.parse(customConfig);
            Object.keys(customConfig).forEach((key) => {
                if (
                    typeof app.config[key] === "object" &&
                    typeof customConfig[key] === "object"
                ) {
                    // merge object
                    Object.assign(app.config[key], customConfig[key]);
                } else {
                    // overwrite scalar variables
                    app.config[key] = customConfig[key];
                }
            });
        } catch (err) {
            console.error("Error parsing config.json", err);
        }
    }
} catch (err) {
    console.log("Missing config.json. Using default API configuration");
}

// Add logging and mail modules
app.mail = require("./src/mail").bind(this, app);

let log = require("./src/log");
app.log = log.bind(this, app, false);
app.error = log.bind(this, app, true);

app.logger = require("./src/logger").bind(this, app);

/**
 * Validate configuration
 */
// Port
if (app.config["env-port"] && process.env.PORT) {
    app.config.port = process.env.PORT;
}

// Region file to easy identify server in CDN
if (app.config["env-region"]) {
    if (process.env.region) {
        app.config.region = process.env.region;
    } else if (process.env.REGION) {
        app.config.region = process.env.REGION;
    }
}
if (
    app.config.region !== "" &&
    (app.config.region.length > 10 ||
        !app.config.region.match(/^[a-z0-9_-]+$/i))
) {
    app.config.region = "";
    app.error("Invalid value for region config variable.");
}

// Reload secret key
if (app.config["reload-secret"] === "") {
    // Add reload-secret to config.json to be able to run /reload?key=your-secret-key that will reload collections without restarting server
    console.log(
        "reload-secret configuration is empty. You will not be able to update all collections without restarting server."
    );
}

/**
 * Continue loading modules
 */

// Get version
app.version = JSON.parse(
    fs.readFileSync(__dirname + "/package.json", "utf8")
).version;

// Files helper
app.fs = require("./src/files")(app);

// JSON loader
app.loadJSON = require("./src/json").bind(this, app);

// Add directories storage
app.dirs = require("./src/dirs")(app);
if (!app.dirs.getRepos().length) {
    console.error(
        "No repositories found. Make sure either Iconify or custom repository is set in configuration."
    );
    process.exit();
}

// Collections
app.collections = Object.create(null);
app.reload = require("./src/reload").bind(this, app);

// Sync module
app.sync = require("./src/sync").bind(this, app);

// API request and response handlers
app.response = require("./src/response").bind(this, app);
app.iconsRequest = require("./src/request-icons").bind(this, app);
app.miscRequest = require("./src/request").bind(this, app);

(async function (port) {
    try {
        await app.prepare();
        await startup(app);
        app.server = express();
        app.server.all("*", (req, res) => {
            req.collections = app.collections;
            return handle(req, res);
        });
        app.server.listen(port, () => {
            console.log(`> Ready on http://localhost:${port}`);
        });
    } catch (error) {
        console.error(error);
    }
})(3005);
