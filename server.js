require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");

const sequelize = require("./config/connection");
const userRouter = require("./controllers/userApis");

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/user", userRouter);

sequelize.sync().then(() => {
    app.listen(PORT, () => 
    {
        console.log(`App listening on port ${PORT}!`);
    }
    );
});
