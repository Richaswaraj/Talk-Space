import jwt from "jsonwebtoken";
import User from "../models/user.models.js";
import dotenv from "dotenv"

const protectRoute = async (req, res, next) => {
	try {
		const token = req.cookies.jwt;
		//console.log("ye chl rha");
		if (!token) {
			return res.status(401).json({ error: "Unauthorized - No Token Provided" });
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		//console.log("ye chl rha");
		if (!decoded) {
			return res.status(401).json({ error: "Unauthorized - Invalid Token" });
		}else {
			console.log("Token generated successfully"); // Message indicating token is present
		}

		const user = await User.findById(decoded.userId).select("-password");
		//console.log("ye chl rha");
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}else {
			console.log("User found"); // Message indicating token is present
		}

		req.user = user;

		next();
	} catch (error) {
		console.log("Error in protectRoute middleware: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export default protectRoute;