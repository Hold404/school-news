import jwt from "jsonwebtoken";

export const generateAccessToken = (id: number, email: string, name: string, reporter: boolean) => {
  const payload = {
    userId: id,
    email: email,
    name: name,
    reporter: reporter
  }
  return jwt.sign(payload, '$2a$10$1zx46JdIYGSC7CMpIeeMFu7s8TkyWTxXmqGfPkJWeSPhfncikQtCm', {expiresIn: "30d"})
}