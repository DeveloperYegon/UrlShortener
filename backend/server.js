const express = require("express");
const dotenv = require("dotenv");
const app = express();
dotenv.config();
const cors = require('cors');
const axios = require("axios");

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON bodies

app.post("/link", async (req, res) => {
    const link = req.body.link;

    try {
        const response = await axios.post(
            "https://api-ssl.bitly.com/v4/shorten",
            {
                long_url: link,
            },
            {
                headers: { Authorization: `Bearer ${process.env.ACCESS_TOKEN}` },
            }
        );
        console.log(response.data);
        res.json(response.data); // Return the shortened link to the client
    } catch (error) {
        console.log("Error in shortening the link", error);
        res.status(500).json({ error: "Failed to shorten link" });
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));
