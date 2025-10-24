import { withX402Express } from "x402-express";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(
  withX402Express({
    price: "0.05",
    recipient: "0x958a676a5cfe006cb6e3d321309cd377803644ee",
    network: "base-mainnet"
  })
);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/meme.html"));
});

export default app;
