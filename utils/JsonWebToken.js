import jwt from "jsonwebtoken";

export function useCreateJWT(payload) {
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
  return token;
}

export function useCreateRefreshToken(payload) {
  const token = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "1y",
  });
  return token;
}

export async function useExtractPayload(token) {
  try {
    console.log(process.env.JWT_SECRET);
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    return { payload, success: true };
  } catch (err) {
    return { payload: null, success: false, error: err };
  }
}
