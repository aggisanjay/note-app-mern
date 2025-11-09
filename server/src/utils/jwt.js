import jwt from "jsonwebtoken";

export function signJwt(payload, secret, options = {}) {
  return jwt.sign(payload, secret, { expiresIn: "7d", ...options });
}

export function verifyJwt(token, secret) {
  try { return jwt.verify(token, secret); }
  catch { return null; }
}
