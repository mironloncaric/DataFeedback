import connectToDatabase from "../../../lib/mongodb.js";
import bcrypt from "bcrypt";
import { useCreateJWT } from "../../../utils/JsonWebToken.js";
import nodemailer from "nodemailer";
import useTransporter from "../../../components/usetransporter.js";

export default async function signIn(req, res) {
  try {
    const { name, surname, email, password } = req.body;
    const { client, db } = await connectToDatabase();
    const users = db.collection("users");
    const userExists = await users.findOne({ email });
    if (userExists) {
      console.log(userExists);
      return res
        .status(409)
        .json({ msg: "User with that E-mail address already exists" });
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const newUser = await users.insertOne({
      name,
      surname,
      email,
      hash,
      isVerified: false,
      isAdmin: false,
    });
    console.log(newUser);
    const JsonWebToken = useCreateJWT({
      id: newUser.insertedId,
      email: email,
    });
    let transporter = await useTransporter();
    const message = await transporter.sendMail({
      from: "Data Feedback",
      to: email,
      subject: "Verify your login",
      text: "This is just a test",
      html: `
<h4>Howdy,</h4>
<p>Please click the following link to verify your account</p>
<a href=\"http://localhost:3000/?emailVerifyToken=${JsonWebToken}\">Verify</a>
`,
    });
    return res.status(200).json({ msg: "OK" });
  } catch (err) {
    console.log(err);
  }
}
