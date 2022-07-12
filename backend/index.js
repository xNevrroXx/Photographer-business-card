const routes = require("./routes/routes");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());

const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

routes(app)

app.listen(port, (error) => {
    if(error) console.log(error);

    console.log(`http://localhost:${port}`);
});