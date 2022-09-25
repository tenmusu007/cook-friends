import type { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "../../../utils/connectMongo";
import User from "../../../models/user";
const bcrypt = require("bcrypt");

export default async function login(req: NextApiRequest, res: NextApiResponse<any>) {
	if (req.method === "POST") {
		try {
			await connectMongo();
			console.log(req.body.username)
			const user = await User.findOne({ username: req.body.username })
			if (!user) return res.json("We can't find the user");
			const isUserMatch = await bcrypt.compare(req.body.password, user.password);
			if (!isUserMatch) return res.json("password is wrong");
			return res.json({ 
				id: user._id.toString(),
				username: user.username,
				email: user.email,
				password: user.password,
				favoriterecipe: user.favoriterecipe,
				historyrecipe: user.historyrecipe
			});
	} catch (error) {
		console.log(error)
			res.json({ error });
	}
	}
}