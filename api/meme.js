import express from "express";
import { X402Provider } from "@coinbase/x402";
import path from "path";
import { fileURLToPath } from "url";

// Khusus di serverless, __dirname harus pakai fileURLToPath
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

const x402 = new X402Provider({
  network: "base-mainnet",
  recipient: "0x958a676a5cfe006cb6e3d321309cd377803644ee",
  price: "0.05"
});

// Middleware untuk x402
app.use(async (req, res, next) => {
  try {
    const authorized = await x402.verifyRequest(req);
    if (!authorized) {
      return res.status(402).json({ error: "Payment Required" });
    }
    next();
  } catch (error) {
    // Ini supaya error x402 tidak bikin 500
    return res.status(500).json({ error: "X402 Internal Error", details: error.message });
  }
});

// Route utama
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/meme.html"));
});

// ---- MAGIC: Export plain handler, not Express app! ----
export default function handler(req, res) {
  app(req, res);
}
