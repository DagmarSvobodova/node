const express = require("express");
const app = express();
const testRoute = require('./routes/testRoute');



app.post("/post", (req, res) => {
    console.log("Connected to React");
    res.redirect("/");
});

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));

app.use("/test", testRoute)

module.exports = app;