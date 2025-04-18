// 1. Find the User, Who are in India 
[
    {
        $match:{
           "profile.country":"India",
        },
    }
]

// *************************************************
// go particular collection (courses) and then apply 
[
    {
        $match:{
            "category":"Database",
         },
    }
]


//2. How many students are there in each country ?


[
    {
        $group:{
            _id:"$profile.country",
            userCount:{
                $sum:1
            }
        },
    }
   
]


//3. How many unique contries students are their ?
[
    {
       $group:{
        _id:"$profile.country",// $ - referencing
       }
    },
    {
        $count:"No_of_unique_country"
    }
]

// 4. Count the number of users who are from the country "India"
    [
        {
            $group:{
                id:"$course"
            }
        }
    ]
//5. Count ow many users are enrolled in each course using the enrollment collection.
[
    {
        $group:{
            _id:"$courseId",
            numberOfStudents:{
                $sum:1
            }
        }
    }
]
//6. Find the couse which has the most number of students 
[
    {
        $group:{
            _id:"$courseId",
            numberOfStudents:{
                $sum:1
            }
        }
    },
    {
        $sort:{
            // numberOfStudents:1 //incre
            numberOfStudents:-1 // decre
        }
    }
]



[
    {
        $group:{
            _id:"$courseId",
            numberOfStudents:{
                $sum:1
            }
        }
    },
    {
        $sort:{
            // numberOfStudents:1 //incre
            numberOfStudents:-1 // decre
        }
    },
    {
        $limit: 1
    }
]
//7. Find the total number of users whose age is greater than 30

[
    {
        $match:{
            "profile.age":{$gt:35}
        },
    }
]

//8. Find the average age in db?
[
    {
        $group:{
            id:null,
            averageAge:{
                $avg:"$profile.age"
            }
        }
    }
]

//9. Find the students who have "Frontend" in their interests
[
    {
        $match:{
            "interests":{$in:["Frontend"]}
        }
    }
]

// 10. Show names and emails of all students
[
    {
        $project:{
            name:true,//1
            email:true, //1
            _id:false,
            interests:true
        }
    },
    {
        $match:{
            "interests":{$in:["Frontend"]}
        }
    }
]

// 11. Count how many students have each interests ?
[
    {
        $unwind:{
            path:"$interests"
        }
    }
]

[
    {
        $group:{
            _id:"interests",
            studentCount:{
                $sum:1
            }
        }
    }
]

//12. Join students with enrollment to show name and courseId
[
    {
        $lookup:{
            from : "enrollments",
            localFiels:"_id",
            foreignField:"userId",
            as:"enrollments"
        }
    },
    {
        $project:{
            name:1,
            _id:0,
            numberOfCourses:{$size:"enrollments"}
        }
    }
]

// 12.Pagination : Display the 2nd page of students (3 per page) and sorted by name
[
    {
        $sort:{
            name:1
        }
    },
    {
        $skip:3
    },
    {
        $limit:3
    }
]