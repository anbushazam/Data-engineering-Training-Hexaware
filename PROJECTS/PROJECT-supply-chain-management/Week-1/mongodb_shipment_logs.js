use SupplyChainDB
db.shipments.insertMany([
  {
    shipment_id: ObjectId(),
    order_id: 1,
    status_history: [
      { timestamp: ISODate("2025-07-25T10:00:00Z"), status: "dispatched" },
      { timestamp: ISODate("2025-07-26T14:00:00Z"), status: "in_transit" },
      { timestamp: ISODate("2025-07-27T18:00:00Z"), status: "delivered" }
    ],
    metadata: {
      carrier: "FastShip",
      weight_kg: 12.5,
      tracking_number: "FS123456789"
    }
  },
  {
    shipment_id: ObjectId(),
    order_id: 2,
    status_history: [
      { timestamp: ISODate("2025-07-26T09:30:00Z"), status: "dispatched" },
      { timestamp: ISODate("2025-07-27T16:45:00Z"), status: "in_transit" }
    ],
    metadata: {
      carrier: "QuickLogix",
      weight_kg: 8.2,
      tracking_number: "QL987654321"
    }
  },
  {
    shipment_id: ObjectId(),
    order_id: 3,
    status_history: [
      { timestamp: ISODate("2025-07-27T11:00:00Z"), status: "dispatched" }
    ],
    metadata: {
      carrier: "SpeedyExpress",
      weight_kg: 15.0,
      tracking_number: "SE112233445"
    }
  }
]);

// Create indexes for efficient querying
db.shipments.createIndex({ order_id: 1 });
db.shipments.createIndex({ "status_history.timestamp": -1 });