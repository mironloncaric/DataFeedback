import nodemailer from "nodemailer";

export default async function useTransporter() {
  let transporter = nodemailer.createTransport({
    host: "mail.dfeed.org",
    port: 465,
    auth: {
      user: "bot@dfeed.org",
      pass: "asdf",
    },
  });
  return transporter;
}
