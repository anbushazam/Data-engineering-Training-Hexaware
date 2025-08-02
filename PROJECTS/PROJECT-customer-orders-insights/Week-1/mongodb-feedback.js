// switch to your database
use customer_insightsDB;

// 1. insert sample unstructured customer feedback
db.customer_feedbacks.insertMany([
  {
    feedback_id: ObjectId(),
    customer_id: 1,
    order_id: 1,
    submitted_at: ISODate("2025-07-28T12:00:00Z"),
    comments: "package arrived quickly and intact, very satisfied!"
  },
  {
    feedback_id: ObjectId(),
    customer_id: 2,
    order_id: 2,
    submitted_at: ISODate("2025-07-29T09:45:00Z"),
    comments: "delivery was delayed by two days, please improve communication."
  },
  {
    feedback_id: ObjectId(),
    customer_id: 3,
    order_id: 3,
    submitted_at: ISODate("2025-07-30T14:20:00Z"),
    comments: "received wrong item, returned and awaiting restock."
  }
]);

// 2. create index for fast lookups by customer_id
db.customer_feedbacks.createIndex(
  { customer_id: 1 }
);