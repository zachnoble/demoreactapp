const express = require("express");
const app = express();
const hostname = "localhost";
const port = process.env.PORT || 5000;

let handles = 0;

app.listen(port, hostname, () => {
    console.log(`Listening on port http://${hostname}:${port}`);
});

app.get("/status", (req_, res) => {
    res.set("Access-Control-Allow-Origin", `http://${hostname}:3000`);
    res.send({
        handles: handles++,
        status: "online",
        time: new Date().toISOString(),
    });
});
