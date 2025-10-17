import express from "express";
import path from "path";
import shortid from "shortid";
import { fileURLToPath } from "url";
import pool from "./db.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/:shortUrl", async (req, res) => {
  const shortUrl = `${req.protocol}://${req.get("host")}/${
    req.params.shortUrl
  }`;

  const result = await pool.query(`SELECT * FROM urls WHERE shorten_url = $1`, [
    shortUrl,
  ]);

  const url = result.rows[0];

  if (url) {
    res.status(301).redirect(url.original_url);
  } else {
    res.status(404).render("index", {
      message: "URL not found",
      messageType: "error",
    });
  }
});

app.post("/", async (req, res) => {
  const { originalUrl } = req.body;
  const baseUrl = `${req.protocol}://${req.get("host")}`;
  try {
    const result = await pool.query(
      `SELECT * FROM urls WHERE original_url = $1`,
      [originalUrl]
    );
    const url = result.rows[0];

    if (url) {
      const shortUrl = url.shorten_url;

      res.render("index", {
        shortUrl: shortUrl,
        message: "URL already exists!",
        messageType: "success",
      });
    } else {
      const shortCode = shortid.generate();
      const shortUrl = `${baseUrl}/${shortCode}`;

      await pool.query(
        `INSERT INTO urls (shorten_url, original_url) VALUES ($1, $2)`,
        [shortUrl, originalUrl]
      );

      res.render("index", {
        shortUrl: shortUrl,
        message: "URL shortened successfully!",
        messageType: "success",
      });
    }
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).render("index", {
      message: "Internal Server Error",
      messageType: "error",
    });
  }
});

app.listen(3000, () => console.log("🚀 Server running on port 3000"));
