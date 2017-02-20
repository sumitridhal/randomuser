# randomuser
random user api

## Problem
You need to connect to the random user API following the documentation available at the following link.
 
https://randomuser.me/documentation
 
You need to fetch 3500 random users with nationality as 'US' and perform the following analysis.
 
·  Give a percentage distribution of Male and Female in your list of users
·  GIve the count of user based on age in the following category
o 0-15 (Group A)
o 15-30 (Group B) 
o 30-60 (Group C)
o above 60 (Group D)
·  Find top 5 postal codes with the maximum number of user. Provide the postal code along with the number of users
Build a REST API for your node application with the following URL and response format.
 
GET http://localhost:<port>/nodeapi/user-stats?count=3500
 
Response:
 
 
Text JSON format:
```{
  "user-count": 3500,
  "status": "success",
  "sexDistribution": {
    "male": 65,
    "female": 35
  },
  "ageDistribution": {
    "A": 800,
    "B": 1000,
    "C": 1500,
    "D": 200
  },
  "topLocation": {
    "61515": 12,
    "62417": 33,
    "64317": 45,
    "66617": 5,
    "69217": 50
  }
}```
