import { createServer } from "node:http";
import { randomUUID } from "node:crypto";

const shipments = [];

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk.toString();
    });
    req.on("end", () => resolve(data));
    req.on("error", reject);
  });
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (url.pathname !== "/api/shipments") {
    res.writeHead(404);
    res.end(JSON.stringify({ error: "Not found" }));
    return;
  }

  if (req.method === "GET") {
    res.writeHead(200);
    res.end(JSON.stringify(shipments));
    return;
  }

  if (req.method === "POST") {
    const raw = await readBody(req);
    const body = JSON.parse(raw);
    const now = new Date().toISOString();
    const eta = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString();
    const shipment = {
      ...body,
      id: `SH-${randomUUID().slice(0, 8).toUpperCase()}`,
      status: "Preparing",
      estimatedArrival: eta,
      createdAt: now,
      lastUpdated: now,
    };
    shipments.unshift(shipment);
    res.writeHead(201);
    res.end(JSON.stringify(shipment));
    return;
  }

  res.writeHead(405);
  res.end(JSON.stringify({ error: "Method not allowed" }));
});

server.listen(3001, () => {
  console.log("API dev server → http://localhost:3001");
});
