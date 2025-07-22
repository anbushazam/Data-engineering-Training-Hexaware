db.createCollection("books");
db.createCollection("customers");
db.createCollection("orders");

// inserting sample data
db.books.insertMany([
  {
    book_id: 101,
    title: "The AI Revolution",
    author: "Ray Kurzweil",
    genre: "Technology",
    price: 799,
    stock: 20
  },
  {
    book_id: 102,
    title: "Mystery of the Old House",
    author: "Agatha Christie",
    genre: "Mystery",
    price: 450,
    stock: 12
  },
  {
    book_id: 103,
    title: "Python Programming",
    author: "Guido Rossum",
    genre: "Education",
    price: 999,
    stock: 15
  },
  {
    book_id: 104,
    title: "Love in the Time of AI",
    author: "Sofia Clarke",
    genre: "Romance",
    price: 599,
    stock: 18
  },
  {
    book_id: 105,
    title: "Journey to Mars",
    author: "Elon Musk",
    genre: "Science Fiction",
    price: 349,
    stock: 25
  }
]);

db.customers.insertMany([
  {
    customer_id: 1,
    name: "Arjun Reddy",
    email: "arjun@example.com",
    city: "Hyderabad"
  },
  {
    customer_id: 2,
    name: "Meera Nair",
    email: "meera@example.com",
    city: "Mumbai"
  },
  {
    customer_id: 3,
    name: "Raj Kapoor",
    email: "raj@example.com",
    city: "Delhi"
  },
  {
    customer_id: 4,
    name: "Sneha Sinha",
    email: "sneha@example.com",
    city: "Kolkata"
  },
  {
    customer_id: 5,
    name: "Aamir Khan",
    email: "aamir@example.com",
    city: "Hyderabad"
  }
]);

db.orders.insertMany([
  {
    order_id: 201,
    customer_id: 1,
    book_id: 101,
    order_date: ISODate("2023-03-15"),
    quantity: 2
  },
  {
    order_id: 202,
    customer_id: 2,
    book_id: 104,
    order_date: ISODate("2023-02-10"),
    quantity: 1
  },
  {
    order_id: 203,
    customer_id: 3,
    book_id: 103,
    order_date: ISODate("2024-01-05"),
    quantity: 3
  },
  {
    order_id: 204,
    customer_id: 4,
    book_id: 105,
    order_date: ISODate("2022-12-20"),
    quantity: 1
  },
  {
    order_id: 205,
    customer_id: 5,
    book_id: 102,
    order_date: ISODate("2023-06-25"),
    quantity: 2
  },
  {
    order_id: 206,
    customer_id: 1,
    book_id: 104,
    order_date: ISODate("2023-07-10"),
    quantity: 1
  },
  {
    order_id: 207,
    customer_id: 1,
    book_id: 105,
    order_date: ISODate("2023-08-05"),
    quantity: 2
  }
]);

// part-3- writing queries
// 1. basic queries
db.books.find({price:{$gt:500}})
db.customers.find({city:"Hyderabad"})
db.orders.find({order_date:{$gt:ISODate("2023-01-01")}})

//2. Joins via  lookup
// Find all orders with customer details
db.orders.aggregate([
  {
    $lookup:{
      from:"customers",
      localField:"customer_id",
      foreignField:"customer_id",
      as:"customer_info"
    }
  },
  {$unwind:"$customer_info"},
  {$lookup:{
    from:"books",
    localField:"book_id",
    foreignField:"book_id",
    as:"book_info"
  }},{$unwind:"$book_info"},
  {
    $project:{
      _id:0,
      order_id:1,
      order_date:1,
      quantity:1,
      customer_name:"$customer_info.name",
      book_title:"$book_info.title"
    }
  }
]);

// Show total quantity ordered for each book.
db.orders.aggregate([{
  $group:{
  _id:"$book_id",
  total_quantity:{$sum:"$quantity"}
  }
}
]);

//Total number of orders per customer
db.orders.aggregate([{
  $group:{
  _id:"$book_id",
  total_quantity:{$sum:"$quantity"}
  }
}
]);

// Aggregation Queries:
//Calculate total revenue generated per book.
db.orders.aggregate([
  {
    $lookup: {
      from: "books",
      localField: "book_id",
      foreignField: "book_id",
      as: "book"
    }
  },
  { $unwind: "$book" },
  {
    $group: {
      _id: "$book_id",
      total_revenue: {
        $sum: { $multiply: ["$quantity", "$book.price"] }
      }
    }
  }
]);

// Find the book with the highest total revenue.
db.orders.aggregate([
  {
    $lookup: {
      from: "books",
      localField: "book_id",
      foreignField: "book_id",
      as: "book"
    }
  },
  { $unwind: "$book" },
  {
    $group: {
      _id: "$book_id",
      total_revenue: {
        $sum: { $multiply: ["$quantity", "$book.price"] }
      }
    }
  },{$sort:{total_revenue:-1}},{$limit:1}
]);

//List genres and total books sold in each genre.
db.orders.aggregate([
  {
    $lookup:{
      from:"books",
      localField:"book_id",
      foreignField:"book_id",
      as:"book_info"
    }
  
  
  },
  {$unwind:"$book_info"},
  {
    $group:{
      _id:"$book_info.genre",
      books_sold:{$sum:"$quantity"}
    }
  }
]);

// Show customers who ordered more than 2 different books.
db.orders.aggregate([
  {$group:{
    _id:{customer_id:"$customer_id",book_id:"$book_id"}
  }},{
    $group:{
    _id:"$_id.customer_id",
    different_books:{$sum:1}
    }
  },{
    $match:{
      different_books:{$gt:2}
    }
  },
  {
    $lookup:{
      from:"customers",
      localField:"_id",
      foreignField:"customer_id",
      as:"customer"
    }
  },
  {$unwind:"$customer"},
  {
    $project:{
      _id:0,
      customer_id:"$_id",
      name:"$customer.name",
      different_books:1
      
    }
  }
]);





