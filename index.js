//IMPORTS
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import { webRoutes } from "./routes/webRoutes.js";
import { apiRoutes } from "./routes/apiRoutes.js";

// SETUP CONFIG
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
global.mock_db = path.join(__dirname, "./data/mock_db.json");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static("public", { mimetype: "text/css" }));
app.use(express.json());
app.use(bodyParser.json());
//API ROUTES
app.use("/api", apiRoutes);

//WEB ROUTES
app.use("/", webRoutes);

//LISTENING TO THE SERVER
const PORT = 4000;
app.listen(PORT, () => {
  console.log("Server is running on port:", PORT);
  console.log("http://localhost:4000");
});
