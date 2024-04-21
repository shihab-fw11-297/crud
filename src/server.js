const express = require("express");
const { config } = require("dotenv");
const cors = require('cors');
const {connect} = require("./config/index");
const routes = require("./routes/routes");
const authRoutes = require("./routes/authRoute");

const { errorMiddleware } = require("./utils/asyncHandler");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

config({
    path: "./.env",
});

const PORT = process.env.PORT || 2000;

app.use("/api/v1/post", routes);
app.use("/api/v1/user", authRoutes);

app.use(errorMiddleware);

app.listen(PORT, async function () {
    connect();
   console.log(`listening on port ${PORT}`);
})