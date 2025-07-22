db.createCollection("users");
db.createCollection("movies")
db.createCollection("watch_history")

// inserting sample data in created collections
db.users.insertMany([
  {
    user_id: 1,
    name: "Anjali Mehta",
    email: "anjali@example.com",
    country: "India"
  },
  {
    user_id: 2,
    name: "Carlos Diaz",
    email: "carlos@example.com",
    country: "Mexico"
  },
  {
    user_id: 3,
    name: "Sarah Johnson",
    email: "sarah@example.com",
    country: "USA"
  },
  {
    user_id: 4,
    name: "Liu Wei",
    email: "liu@example.com",
    country: "China"
  },
  {
    user_id: 5,
    name: "Emma Smith",
    email: "emma@example.com",
    country: "UK"
  }
]);

db.movies.insertMany([
  {
    movie_id: 101,
    title: "Dream Beyond Code",
    genre: "Sci-Fi",
    release_year: 2022,
    duration: 120
  },
  {
    movie_id: 102,
    title: "Love in the Air",
    genre: "Romance",
    release_year: 2021,
    duration: 95
  },
  {
    movie_id: 103,
    title: "The Hacker's Quest",
    genre: "Thriller",
    release_year: 2023,
    duration: 110
  },
  {
    movie_id: 104,
    title: "Laugh Out Loud",
    genre: "Comedy",
    release_year: 2020,
    duration: 90
  },
  {
    movie_id: 105,
    title: "World at War",
    genre: "Action",
    release_year: 2019,
    duration: 130
  },
  {
    movie_id: 106,
    title: "Nature's Fury",
    genre: "Documentary",
    release_year: 2022,
    duration: 100
  }
]);

db.watch_history.insertMany([
  {
    watch_id: 1,
    user_id: 1,
    movie_id: 101,
    watched_on: ISODate("2023-06-15"),
    watch_time: 120
  },
  {
    watch_id: 2,
    user_id: 1,
    movie_id: 102,
    watched_on: ISODate("2023-06-17"),
    watch_time: 95
  },
  {
    watch_id: 3,
    user_id: 1,
    movie_id: 103,
    watched_on: ISODate("2023-07-01"),
    watch_time: 90
  },
  {
    watch_id: 4,
    user_id: 2,
    movie_id: 104,
    watched_on: ISODate("2023-06-20"),
    watch_time: 80
  },
  {
    watch_id: 5,
    user_id: 3,
    movie_id: 101,
    watched_on: ISODate("2023-06-22"),
    watch_time: 110
  },
  {
    watch_id: 6,
    user_id: 3,
    movie_id: 101,
    watched_on: ISODate("2023-07-03"),
    watch_time: 120
  },
  {
    watch_id: 7,
    user_id: 4,
    movie_id: 106,
    watched_on: ISODate("2023-06-25"),
    watch_time: 70
  },
  {
    watch_id: 8,
    user_id: 5,
    movie_id: 105,
    watched_on: ISODate("2023-06-30"),
    watch_time: 130
  }
]);

//  PART 3: Query Tasks
// Basic:
 //1. Find all movies with duration > 100 minutes.
db.movies.find({duration:{$gt:100}})
 //2. List users from 'India'.
 db.users.find({country:"India"})
 //3. Get all movies released after 2020.
 db.movies.find({release_year:{$gt:2020}})

 //Intermediate:
// 4. Show full watch history: user name, movie title, watch time.
db.watch_history.aggregate([
  {
    $lookup:{
      from:"movies",
      localField:"movie_id",
      foreignField:"movie_id",
      as:"movie"
    }
  },{$unwind:"$movie"},
  {
    $lookup:{
      from:"users",
      localField:"user_id",
      foreignField:"user_id",
      as:"user"
    }
  },{$unwind:"$user"},
  {
    $project:{
      _id:0,
      user_name:"$user.name",
      movie_title:"$movie.title",
      watch_time:1
    }
  }
]);


 //5. List each genre and number of times movies in that genre were watched.
db.watch_history.aggregate([
  {
    $lookup:{
      from:"movies",
      localField:"movie_id",
      foreignField:"movie_id",
      as:"movie"
    }
  },{$unwind:"$movie"},
  {
    $group:{
      _id:"$movie.genre",
      watch_count: { $sum: 1 }
    }
  }
]);

 //6. Display total watch time per user.

 db.watch_history.aggregate([
  {
    $group:{
      _id:"$user_id",
      total_watchtime:{$sum:"$watch_time"}
    }
  }
]);

 //Advanced:
// 7. Find which movie has been watched the most (by count).
db.watch_history.aggregate([
  {
    $group: {
      _id: "$movie_id",
      watched_count: { $sum: 1 }
    }
  },
  {
    $sort: { watched_count: -1 }
  },
  {
    $lookup: {
      from: "movies",
      localField: "_id",            
      foreignField: "movie_id",
      as: "movie"
    }
  },
  {
    $unwind: "$movie"
  },
  {
    $project: {
      _id: 0,
      movie_id: "$_id",
      movie_name: "$movie.title",
      watched_count: 1
    }
  }
]);
// 8. Identify users who have watched more than 2 movies.
db.watch_history.aggregate([
  {
    $group:{
      _id:"$user_id",
      movie_count:{$sum:1}
    }
  },{
    $match:{
      movie_count:{$gt:2}
    }
  }
]);
 //9. Show users who watched the same movie more than once.
 db.watch_history.aggregate([
  {
    $group:{
    _id:{user_id:"$user_id",movie_id:"$movide_id"},
    watch_count:{$sum:1}
    
    }
  },{
    $match: {
      watch_count: { $gt: 1 }
    }
  },{
    $project:{
      _id:0,
      user_id:"$_id.user_id",
      watch_count:1
    }
  }
]);
 //10. Calculate percentage of each movie watched compared to its full duration

 //(
 //watch_time/duration * 100 ).
 db.watch_history.aggregate([
  {
    $lookup: {
      from: "movies",
      localField: "movie_id",
      foreignField: "movie_id",
      as: "movie"
    }
  },
  { $unwind: "$movie" },
  {
    $project: {
      _id: 0,
      watch_id: 1,
      user_id: 1,
      movie_id: 1,
      movie_title: "$movie.title",
      watch_time: 1,
      duration: "$movie.duration",
      percentage_watched: {
        $multiply: [
          { $divide: ["$watch_time", "$movie.duration"] },
          100
        ]
      }
    }
  }
]);