import connectToDatabase from "../../../lib/mongodb.js";
import jwt from "jsonwebtoken";

export default async function JWT(req, res) {
  const { verifyJWT } = req.body;
  try {
    const decoded = await jwt.verify(verifyJWT, process.env.JWT_SECRET);
  } catch (err) {
    console.log(err);
  }
}
