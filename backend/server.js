import express from "express";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import authRoutes from "./routes/authroutes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/users.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";

const app = express();
//const PORT = process.env.PORT || 3001;

dotenv.config();
const PORT = process.env.PORT || 6003;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
//app.get("/", (req,res) => {
//    res.send("Hello World");
//});

//app.use("/api/auth", authRoutes)

app.listen(PORT,() => {
    connectToMongoDB();
    console.log(`Server Running on port ${PORT}`);
});