 //Part B: Questions for Students
 //Basic Queries
 //1. Find all products in the Electronics category.
db.products.find({ category: "Electronics" });

// 2. List all sales made by Ravi.
db.sales.find({ salesperson: "Ravi" });
 //3. Get details of products whose price is more than 5,000.
db.products.find({ price: { $gt: 5000 } });
 //4. Find all products with stock less than 50.
db.products.find({ stock: { $lt: 50 } });
 //5. Show all products sold on 2024-08-14.
 db.sales.find({date:ISODate("2024-08-14")});

  //Aggregation & Join-style Operations
 //6. For each product, show total quantity sold.
 db.sales.aggregate([
  {
    $group: {
      _id: "$product_id",
      total_quantity_sold: { $sum: "$quantity" }
    }
  },
  {
    $lookup: {
      from: "products",
      localField: "_id",             // _id is product_id
      foreignField: "product_id",
      as: "product"
    }
  },
  { $unwind: "$product" },
  {
    $project: {
      _id: 0,
      product_id: "$_id",
      product_name: "$product.name",
      total_quantity_sold: 1
    }
  }
]);
 //7. Display the total revenue (price × quantity) generated per product.
 db.sales.aggregate([
  {
    $lookup: {
      from: "products",
      localField: "product_id",             
      foreignField: "product_id",
      as: "product"
    }
  },{$unwind:"$product"},
  {
    $group:{
      _id:"$product_id",
      name:{ $first: "$product.name" },

      total_revenue:{$sum:{$multiply:["$quantity","$product.price"]}}
    }
  },
  {
    $project:{
      _id:0,
      product_id:"$_id",
      name:1,
      total_revenue:1
      
    }
  }
]);
 //8. List customers who purchased more than 3 items in any sale.

 db.sales.aggregate([
  {
    $group:{
      _id:"$customer",
      purchased:{$sum:"$quantity"}
    }
  },{$project:{_id:0,customer:"$_id",purchased:1}},
  {$match:{purchased:{$gt:3}}}
]);
 //9. Sort products by stock in descending order.
 db.products.find()
           .sort({ stock: -1 });
 //10. Find the top 2 best-selling products based on quantity.
 db.sales.aggregate([
  {
    $lookup: {
      from:         "products",
      localField:   "product_id",
      foreignField:  "product_id",
      as:           "product"
    }
  },
  {
    $unwind: "$product"
  },
  {
    $group: {
      _id:          "$product_id",
      product_name: { $first: "$product.name" },
      total_sold:   { $sum: "$quantity" }
    }
  },
  {
    $sort: { total_sold: -1 }
  },
  {
    $limit: 2
  },
  {
    $project: {
      _id:        0,
      product_id: "$_id",
      product_name: 1,
      total_sold:   1
    }
  }
]);