import type { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "../../../utils/connectMongo";
import User from "../../../models/user";

/*
	expecting body{
		user_id: 632a4e972852e67132cc00dd,
		recipe_id: string
	}
*/

export default async function login(req: NextApiRequest, res: NextApiResponse<any>) {
	try {
		await connectMongo();
		const user = await User.findOne({ user_id: req.body.user_id })
		user.historyrecipe.push(req.body.recipe_id);
		if (user.historyrecipe.length > 50) {
			user.historyrecipe.shift()
		}
		await user.save()
		res.json({user})
	} catch (error) {
			res.json({ error });
	}
}