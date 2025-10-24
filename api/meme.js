import express from "express";
import { X402Provider } from "@coinbase/x402";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// Setup X402 Provider
const x402 = new X402Provider({
  network: "base-mainnet",
  recipient: "0x958a676a5cfe006cb6e3d321309cd377803644ee",
  price: "0.5", // USDC price
});

app.use(async (req, res, next) => {
  const authorized = await x402.verifyRequest(req);
  if (!authorized) {
    return res.status(402).json({
      error: "Payment Required - X402",
      details: "Please complete payment to unlock this content."
    });
  }
  next();
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/meme.html"));
});

export default app;
