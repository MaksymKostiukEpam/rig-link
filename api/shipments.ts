import { kv } from "@vercel/kv";
import type { IncomingMessage, ServerResponse } from "node:http";
import type { Shipment } from "../src/types/shipment";
import type { InventoryItem } from "../src/types/inventory";
import type { Vehicle } from "../src/types/vehicle";

type CreateShipmentBody = {
  originId: string;
  originName: string;
  destinationId: string;
  destinationName: string;
  vehicle: Vehicle;
  cargo: InventoryItem[];
};

function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk: Buffer) => {
      data += chunk.toString();
    });
    req.on("end", () => resolve(data));
    req.on("error", reject);
  });
}

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse,
) {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === "GET") {
    const shipments = await kv.lrange<Shipment>("shipments", 0, -1);
    res.writeHead(200);
    res.end(JSON.stringify(shipments));
    return;
  }

  if (req.method === "POST") {
    const raw = await readBody(req);
    const body = JSON.parse(raw) as CreateShipmentBody;
    const now = new Date().toISOString();
    const eta = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString();
    const shipment: Shipment = {
      ...body,
      id: `SH-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
      status: "Preparing",
      estimatedArrival: eta,
      createdAt: now,
      lastUpdated: now,
    };
    await kv.lpush("shipments", shipment);
    res.writeHead(201);
    res.end(JSON.stringify(shipment));
    return;
  }

  res.writeHead(405);
  res.end(JSON.stringify({ error: "Method not allowed" }));
}
