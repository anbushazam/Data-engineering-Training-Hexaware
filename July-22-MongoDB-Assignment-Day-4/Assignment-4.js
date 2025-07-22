db.createCollection("trainers")
db.createCollection("seissions")
db.createCollection("members")

 //Step 2: Long List of Query Challenges
 //Basic Queries
// 1. Find all members from Mumbai.
db.members.find({ city: "Mumbai" })
//2. List all trainers with experience greater than 6 years.
db.trainers.find({ experience: { $gt: 6 } })
 //3. Get all Yoga sessions.
 db.sessions.find({ session_type: "Yoga" })
// 4. Show all sessions conducted by trainer Swati Nair.
db.sessions.find({ trainer_name: "Swati Nair" })
// 5. Find all members who attended a session on 2024-08-05.
db.sessions.find({date:ISODate("2024-08-05")})
 //Intermediate Queries
 //6. Count the number of sessions each member has attended.
  db.sessions.aggregate([
   { $group: { _id: "$member_id", session_count: { $sum: 1 } } }
 ]);
// 7. Show average duration of sessions for each session_type.
 db.sessions.aggregate([
   { $group: { _id: "$session_type", 
    avg_duration: { $avg: "$duration" } } }
 ]);
 //8. Find all female members who attended a session longer than 60 minutes.
  db.sessions.aggregate([
   { $match: { duration: { $gt: 60 } } },
   {
     $lookup: {
       from: "members",
       localField: "member_id",
       foreignField: "member_id",
       as: "member"
     }
   },
   { $unwind: "$member" },
   { $match: { "member.gender": "Female" } },
   {
     $project: {
       _id: 0,
       member_name: "$member.name",
       duration: 1,
       session_type: 1
     }
   }
 ]);
 //9. Display sessions sorted by duration (descending).
 db.sessions.find().sort({ duration: -1 });
 //10. Find members who have attended sessions with more than one trainer.
  db.sessions.aggregate([
   { $group: { _id: { member_id: "$member_id", trainer_id: "$trainer_id" } } },
   { $group: { _id: "$_id.member_id", trainer_count: { $sum: 1 } } },
   { $match: { trainer_count: { $gt: 1 } } }
 ]);
 //Advanced Queries with Aggregation & Lookup
 //11. Use 
//$lookup to display sessions with member name and trainer name.
 db.sessions.aggregate([
   {
     $lookup: {
       from: "members",
       localField: "member_id",
       foreignField: "member_id",
       as: "member"
     }
   },
   { $unwind: "$member" },
   {
     $lookup: {
       from: "trainers",
       localField: "trainer_id",
       foreignField: "trainer_id",
       as: "trainer"
     }
   },
   { $unwind: "$trainer" },
   {
     $project: {
       _id: 0,
       session_id: 1,
       date: 1,
       duration: 1,
       member_name: "$member.name",
       trainer_name: "$trainer.name"
     }
   }
 ]);
 //12. Calculate total session time per trainer.
 db.sessions.aggregate([
   { $group: { _id: "$trainer_id", total_duration: { $sum: "$duration" } } }
 ]);
 //13. List each member and their total time spent in the gym.
 db.sessions.aggregate([
   { $group: { _id: "$member_id", total_time: { $sum: "$duration" } } }
 ]);
 //14. Count how many sessions each trainer has conducted.
  db.sessions.aggregate([
   { $group: { _id: "$trainer_id", session_count: { $sum: 1 } } }
 ]);
 //15. Find which trainer has conducted the longest average session duration.
  db.sessions.aggregate([
   { $group: { _id: "$trainer_id", avg_duration: { $avg: "$duration" } } },
   { $sort: { avg_duration: -1 } },
   { $limit: 1 }
 ]);

 //16. Show how many unique members each trainer has trained.
  db.sessions.aggregate([
   { $group: { _id: { trainer_id: "$trainer_id", member_id: "$member_id" } } },
   { $group: { _id: "$_id.trainer_id", unique_members: { $sum: 1 } } }
 ]);
 //17. Find the most active member (by total session duration).
 db.sessions.aggregate([
   { $group: { _id: "$member_id", total_duration: { $sum: "$duration" } } },
   { $sort: { total_duration: -1 } },
   { $limit: 1 }
 ]);

 //18. List all Gold membership members who took at least one Strength session.
  db.sessions.aggregate([
   { $match: { session_type: "Strength" } },
   {
     $lookup: {
       from: "members",
       localField: "member_id",
       foreignField: "member_id",
       as: "member"
     }
   },
   { $unwind: "$member" },
   { $match: { "member.membership_type": "Gold" } },
   {
     $project: {
       member_name: "$member.name",
       membership_type: "$member.membership_type",
       session_type: 1
     }
   }
 ]);
 //19. Display a breakdown of sessions by membership type.
  db.sessions.aggregate([
   {
     $lookup: {
       from: "members",
       localField: "member_id",
       foreignField: "member_id",
       as: "member"
     }
   },
   { $unwind: "$member" },
   {
     $group: {
       _id: "$member.membership_type",
       session_count: { $sum: 1 }
     }
   }
 ]);
 //20. Find members who have not attended any session yet (hint: simulate later by
 //adding a new member).
  db.members.aggregate([
   {
     $lookup: {
       from: "sessions",
       localField: "member_id",
       foreignField: "member_id",
       as: "sessions"
     }
   },
   { $match: { sessions: { $eq: [] } } },
   { $project: { _id: 0, member_id: 1, name: 1 } }
 ]);