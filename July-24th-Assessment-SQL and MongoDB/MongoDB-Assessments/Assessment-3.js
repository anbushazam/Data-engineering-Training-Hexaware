//creating and inserting sample data for job portal database
db.jobs.insertMany([
  { job_id: 1, title: "Software Engineer", company: "TechCorp", location: "Bangalore", salary: 1200000, job_type: "remote", posted_on: new Date("2024-07-01") },
  { job_id: 2, title: "Data Analyst", company: "DataWorks", location: "Delhi", salary: 800000, job_type: "on-site", posted_on: new Date("2024-06-15") },
  { job_id: 3, title: "DevOps Engineer", company: "InfraTech", location: "Remote", salary: 1300000, job_type: "remote", posted_on: new Date("2024-07-10") },
  { job_id: 4, title: "UI/UX Designer", company: "Designify", location: "Chennai", salary: 900000, job_type: "hybrid", posted_on: new Date("2024-06-25") },
  { job_id: 5, title: "ML Engineer", company: "TechCorp", location: "Remote", salary: 1500000, job_type: "remote", posted_on: new Date("2024-07-05") }
])

db.applicants.insertMany([
  { applicant_id: 101, name: "Ravi Kumar", skills: ["Python", "MongoDB", "AWS"], experience: 2, city: "Hyderabad", applied_on: new Date("2024-07-02") },
  { applicant_id: 102, name: "Anita Mehta", skills: ["SQL", "Power BI"], experience: 3, city: "Delhi", applied_on: new Date("2024-06-28") },
  { applicant_id: 103, name: "Sahil Khan", skills: ["MongoDB", "React", "Node.js"], experience: 4, city: "Mumbai", applied_on: new Date("2024-07-04") },
  { applicant_id: 104, name: "Priya Iyer", skills: ["Java", "Spring Boot"], experience: 1, city: "Hyderabad", applied_on: new Date("2024-07-03") },
  { applicant_id: 105, name: "Aarav Singh", skills: ["MongoDB", "Python"], experience: 2, city: "Bangalore", applied_on: new Date("2024-07-06") }
])


db.applications.insertMany([
  { application_id: 1, applicant_id: 101, job_id: 1, application_status: "interview scheduled", interview_scheduled: true, feedback: "Positive" },
  { application_id: 2, applicant_id: 103, job_id: 3, application_status: "applied", interview_scheduled: false, feedback: "" },
  { application_id: 3, applicant_id: 105, job_id: 5, application_status: "interview scheduled", interview_scheduled: true, feedback: "Pending" },
  { application_id: 4, applicant_id: 101, job_id: 5, application_status: "applied", interview_scheduled: false, feedback: "" }
])


// Part 2: Write the Following Queries
 //1. Find all remote jobs with a salary greater than 10,00,000.\
db.jobs.find({ job_type: "remote", salary: { $gt: 1000000 } })
 //2. Get all applicants who know MongoDB.  
db.applicants.find({ skills: "MongoDB" })
 //3. Show the number of jobs posted in the last 30 days.   
 db.jobs.find({post_on:{$gte:new Date(new Date().setDate(new Date().getDate()-30))}}).count()
 //4. List all job applications that are in ‘interview scheduled’ status.
db.applications.find({ application_status: "interview scheduled" })
// 5. Find companies that have posted more than 2 jobs
db.jobs.aggregate([
  { $group: { _id: "$company", jobCount: { $sum: 1 } } },
  { $match: { jobCount: { $gt: 2 } } }
])

// Part 3: Use $lookup and Aggregation
 //6. Join applications with jobs to show job title along with the applicant’sname.
db.applications.aggregate([
  {
    $lookup: {
      from: "jobs",
      localField: "job_id",
      foreignField: "job_id",
      as: "job_info"
    }
  },
  { $unwind: "$job_info" },
  {
    $lookup: {
      from: "applicants",
      localField: "applicant_id",
      foreignField: "applicant_id",
      as: "applicant_info"
    }
  },
  { $unwind: "$applicant_info" },
  {
    $project: {
      applicant_name: "$applicant_info.name",
      job_title: "$job_info.title",
      application_status: 1
    }
  }
])



 //7. Find how many applications each job has received.
 db.applications.aggregate([
  {$group:{_id:"$job_id",total_apllications:{$sum:1}}}
])
 ////8. List applicants who have applied for more than one job.
db.applications.aggregate([
  {$group:{_id:"$applicant_id",jobs_applied:{$sum:1}}},
  { $match: { jobs_applied: { $gt: 1 } } },
  {$lookup:{from:"applicants",localField:"_id",foreignField:"applicant_id",as:"applicant_info"}},{$unwind:"$applicant_info"},
  {$project:{_id:0,applicant_id:"$_id",applicant_name:"$applicant_info.name",jobs_applied:1}}
]);

 //9. Show the top 3 cities with the most applicants.

 db.applicants.aggregate([
  {
    $group: {
      _id: "$city",
      applicant_count: { $sum: 1 }
    }
  },
  { $sort: { applicant_count: -1 } },
  { $limit: 3 }
])

 //10. Get the average salary for each job type (remote, hybrid, on-site).
db.jobs.aggregate([
  {
    $group: {
      _id: "$job_type",
      avg_salary: { $avg: "$salary" }
    }
  }
])


//Part 4: Data Updates
 //11. Update the status of one application to "offer made".
db.applications.updateOne(
  { application_id: 1 },
  { $set: { application_status: "offer made" } }
)


 //12. Delete a job that has not received any applications.
 db.jobs.aggregate([
  {$lookup:{from:"applications",localField:"job_id",foreignField:"job_id",as:"job_details"}},
  {$addFields:{applied_count:{$size:"$job_details"}}},
  {$match:{applied_count:{$eq:0}}},
  {$project:{_id:0,job_id:1}}
])

db.jobs.deleteMany({
  jobs_id: { $in: [102,104] }
})
 //13. Add a new field shortlisted to all applications and set it to false.


 db.applications.updateMany({},{$set:{shortlisted:false}})
 //14. Increment experience of all applicants from "Hyderabad" by 1 year.
 db.applicants.updateMany({city:"Hyderabad"},{$inc:{experience:1}})
// 15. Remove all applicants who haven’t applied to any job.
db.applicants.aggregate([
  {$lookup:{from:"applications",localField:"applicant_id",foreignField:"applicant_id",as:"applicant_details"}},
  {$match:{applicant_details:[]}},
  {$project:{_id:0,applicant_id:1}}
])

db.applicants.deleteMany({
  applicant_id: { $in: [102,104] }
})