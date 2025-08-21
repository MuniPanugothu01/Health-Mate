const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

const { ConnectDB } = require("./config/db");
ConnectDB();

const UserRouter = require("./routes/Userrouter");

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use("/api/user", UserRouter);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
