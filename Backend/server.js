const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

const GITHUB_CLIENT_ID = 'github clientid';
const GITHUB_CLIENT_SECRET = 'github clientsecret';


app.get("/", (req, res) => {
    res.send("Hello, World!");
})
// Endpoint to handle the GitHub OAuth token exchange
app.post("/github/oauth", async (req, res) => {
  const { code } = req.body;

  try {
    const response = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code: code,
        redirect_uri: "http://localhost:3000",
      },
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    const data = response.data;
    res.json(data); // Return the access token to the client
  } catch (error) {
    console.error("Error exchanging code for access token:", error);
    res.status(500).json({ error: "Token exchange failed" });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
