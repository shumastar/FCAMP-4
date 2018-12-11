# Project Title

Front Camp MongoDB

## Task 3 Querying Restaurants Collection

```
db.restaurants.findOne()
```

```
{
    "_id" : ObjectId("5c0f5c27382cde8b0bff20a0"),
    "address" : {
        "building" : "1007",
        "coord" : [ 
            -73.856077, 
            40.848447
        ],
        "street" : "Morris Park Ave",
        "zipcode" : "10462"
    },
    "borough" : "Bronx",
    "cuisine" : "Bakery",
    "grades" : [ 
        {
            "date" : ISODate("2014-03-03T00:00:00.000Z"),
            "grade" : "A",
            "score" : 2
        }, 
        {
            "date" : ISODate("2013-09-11T00:00:00.000Z"),
            "grade" : "A",
            "score" : 6
        }, 
        {
            "date" : ISODate("2013-01-24T00:00:00.000Z"),
            "grade" : "A",
            "score" : 10
        }, 
        {
            "date" : ISODate("2011-11-23T00:00:00.000Z"),
            "grade" : "A",
            "score" : 9
        }, 
        {
            "date" : ISODate("2011-03-10T00:00:00.000Z"),
            "grade" : "B",
            "score" : 14
        }
    ],
    "name" : "Morris Park Bake Shop",
    "restaurant_id" : "30075445"
}
```

### Task 3.1 How many “Chinese” (cuisine) restaurants are in “Queens” (borough)

```
db.restaurants.find({ cuisine: "Chinese", borough: "Queens" }).count()
```

```
728
```

### Task 3.2 What is the _id of the restaurant which has the grade with the highest ever score

```
db.restaurants.aggregate([
  { $unwind: "$grades" },
  { $sort: { "grades.score": -1 } },
  { $limit: 1 },
  { $project: { _id: 1, score: "$grades.score" } }
])
```

```
{
  "_id" : ObjectId("5c0f5c27382cde8b0bff235c"),
  "score" : 131
}
```

### Task 3.3 Add a grade { grade: "A", score: 7, date: ISODate() } to every restaurant in “Manhattan” (borough)

```
db.restaurants.updateMany(
  { borough: "Manhattan" },
  {
		$push: {
			grades:
				{
					grade: "A",
					score: 7,
					date: new ISODate()
				}
		}
	}
)
```

```
{
  "acknowledged" : true,
  "matchedCount" : 10259.0,
  "modifiedCount" : 10259.0
}
```

### Task 3.4 What are the names of the restaurants which have a grade at index 8 with score less then 7? Use projection to include only names without _id

```
db.restaurants.find({ "grades.8.score": {$lt: 7}}, { name: 1, _id: 0 })
```

```
/* 1 */
{
  "name" : "Silver Krust West Indian Restaurant"
}

/* 2 */
{
  "name" : "Pure Food"
}
```

### Task 3.5. What are _id and borough of “Seafood” (cuisine) restaurants which received at least one “B” grade in period from 2014-02-01 to 2014-03-01? Use projection to include only _id and borough

```
db.restaurants.find(
  {
    cuisine: "Seafood",
    grades: {
      $elemMatch: {
        grade: "B",
        $and: [{"date": {$gt: ISODate("2014-02-01")}}, {"date": {$lt: ISODate("2014-03-01")}}]
      }
    }
  },
  { borough: 1 })
```

```
/* 1 */
{
  "_id" : ObjectId("5c0f5c29382cde8b0bff8b5b"),
  "borough" : "Bronx"
}

/* 2 */
{
  "_id" : ObjectId("5c0f5c29382cde8b0bff9049"),
  "borough" : "Manhattan"
}
```

## Task 4 Indexing Restaurants Collection

### Task 4.1 Create an index which will be used by this query and provide proof (from explain() or Compass UI) that the index is indeed used by the winning plan

```
db.restaurants.find({ name: "Glorious Food" })
```

```
{
    "_id" : ObjectId("5c0f5c27382cde8b0bff20c4"),
    "address" : {
        "building" : "522",
        "coord" : [
            -73.95171,
            40.767461
        ],
        "street" : "East   74 Street",
        "zipcode" : "10021"
    },
    "borough" : "Manhattan",
    "cuisine" : "American",
    "grades" : [
        {
            "date" : ISODate("2014-09-02T00:00:00.000Z"),
            "grade" : "A",
            "score" : 12
        },
        {
            "date" : ISODate("2013-12-19T00:00:00.000Z"),
            "grade" : "B",
            "score" : 16
        },
        {
            "date" : ISODate("2013-05-28T00:00:00.000Z"),
            "grade" : "A",
            "score" : 9
        },
        {
            "date" : ISODate("2012-12-07T00:00:00.000Z"),
            "grade" : "A",
            "score" : 13
        },
        {
            "date" : ISODate("2012-03-29T00:00:00.000Z"),
            "grade" : "A",
            "score" : 11
        },
        {
            "grade" : "A",
            "score" : 7.0,
            "date" : ISODate("2018-12-11T08:35:03.178Z")
        }
    ],
    "name" : "Glorious Food",
    "restaurant_id" : "40361521"
}
```

```
db.restaurants.createIndex( { name: 1 } )
```

```
{
  "createdCollectionAutomatically" : false,
  "numIndexesBefore" : 1,
  "numIndexesAfter" : 2,
  "ok" : 1.0
}
```

```
db.restaurants.find({ name: "Glorious Food" } ).explain()
```

```
{
    "queryPlanner" : {
        "plannerVersion" : 1,
        "namespace" : "restaurants.restaurants",
        "indexFilterSet" : false,
        "parsedQuery" : {
            "name" : {
                "$eq" : "Glorious Food"
            }
        },
        "winningPlan" : {
            "stage" : "FETCH",
            "inputStage" : {
                "stage" : "IXSCAN",
                "keyPattern" : {
                    "name" : 1.0
                },
                "indexName" : "name_1",
                "isMultiKey" : false,
                "multiKeyPaths" : {
                    "name" : []
                },
                "isUnique" : false,
                "isSparse" : false,
                "isPartial" : false,
                "indexVersion" : 2,
                "direction" : "forward",
                "indexBounds" : {
                    "name" : [
                        "[\"Glorious Food\", \"Glorious Food\"]"
                    ]
                }
            }
        },
        "rejectedPlans" : []
    },
    "serverInfo" : {
        "host" : "EPBYGOMW0448",
        "port" : 27017,
        "version" : "4.0.4",
        "gitVersion" : "f288a3bdf201007f3693c58e140056adf8b04839"
    },
    "ok" : 1.0
}
```

### Task 4.2 Drop index from Task 4.1

```
db.restaurants.getIndexes()
```

```
[
    {
        "v" : 2,
        "key" : {
            "_id" : 1
        },
        "name" : "_id_",
        "ns" : "restaurants.restaurants"
    },
    {
        "v" : 2,
        "key" : {
            "name" : 1.0
        },
        "name" : "name_1",
        "ns" : "restaurants.restaurants"
    }
]
```

```
db.restaurants.dropIndex( { "name": 1 })
```

```
{
    "nIndexesWas" : 2,
    "ok" : 1.0
}
```

### Task 4.3 Create an index to make this query covered and provide proof (from explain() or Compass UI) that it is indeed covered

```
db.restaurants.find({ restaurant_id: "41098650" }, { _id: 0, borough: 1 })
```

{
    "borough" : "Queens"
}

```
db.restaurants.createIndex( { "restaurant_id": 1, "borough": 1 })
```

```
{
    "createdCollectionAutomatically" : false,
    "numIndexesBefore" : 1,
    "numIndexesAfter" : 2,
    "ok" : 1.0
}
```

```
db.restaurants.find({ restaurant_id: "41098650" }, { _id: 0, borough: 1 }).explain()
```

```
{
    "queryPlanner" : {
        "plannerVersion" : 1,
        "namespace" : "restaurants.restaurants",
        "indexFilterSet" : false,
        "parsedQuery" : {
            "restaurant_id" : {
                "$eq" : "41098650"
            }
        },
        "winningPlan" : {
            "stage" : "PROJECTION",
            "transformBy" : {
                "_id" : 0.0,
                "borough" : 1.0
            },
            "inputStage" : {
                "stage" : "IXSCAN",
                "keyPattern" : {
                    "restaurant_id" : 1.0,
                    "borough" : 1.0
                },
                "indexName" : "restaurant_id_1_borough_1",
                "isMultiKey" : false,
                "multiKeyPaths" : {
                    "restaurant_id" : [],
                    "borough" : []
                },
                "isUnique" : false,
                "isSparse" : false,
                "isPartial" : false,
                "indexVersion" : 2,
                "direction" : "forward",
                "indexBounds" : {
                    "restaurant_id" : [
                        "[\"41098650\", \"41098650\"]"
                    ],
                    "borough" : [
                        "[MinKey, MaxKey]"
                    ]
                }
            }
        },
        "rejectedPlans" : []
    },
    "serverInfo" : {
        "host" : "EPBYGOMW0448",
        "port" : 27017,
        "version" : "4.0.4",
        "gitVersion" : "f288a3bdf201007f3693c58e140056adf8b04839"
    },
    "ok" : 1.0
}
```

### Task 4.4 Create a partial index on cuisine field which will be used only when filtering on borough equal to “Staten Island”

```
db.restaurants.find({ borough: "Staten Island", cuisine: "American" })  - uses index
db.restaurants.find({ borough: "Staten Island", name: "Bagel Land" }) - does not use index
db.restaurants.find({ borough: "Queens", cuisine: "Pizza" }) - does not use index
```

```
db.restaurants.createIndex(
  { cuisine: 1 },
  { partialFilterExpression: { borough: "Staten Island" } }
)
```

```
{
    "createdCollectionAutomatically" : false,
    "numIndexesBefore" : 2,
    "numIndexesAfter" : 3,
    "ok" : 1.0
}
```

```
db.restaurants.find({ borough: "Staten Island", cuisine: "American" }).explain()
```

```
{
    "queryPlanner" : {
        "plannerVersion" : 1,
        "namespace" : "restaurants.restaurants",
        "indexFilterSet" : false,
        "parsedQuery" : {
            "$and" : [
                {
                    "borough" : {
                        "$eq" : "Staten Island"
                    }
                },
                {
                    "cuisine" : {
                        "$eq" : "American"
                    }
                }
            ]
        },
        "winningPlan" : {
            "stage" : "FETCH",
            "filter" : {
                "borough" : {
                    "$eq" : "Staten Island"
                }
            },
            "inputStage" : {
                "stage" : "IXSCAN",
                "keyPattern" : {
                    "cuisine" : 1.0
                },
                "indexName" : "cuisine_1",
                "isMultiKey" : false,
                "multiKeyPaths" : {
                    "cuisine" : []
                },
                "isUnique" : false,
                "isSparse" : false,
                "isPartial" : true,
                "indexVersion" : 2,
                "direction" : "forward",
                "indexBounds" : {
                    "cuisine" : [
                        "[\"American\", \"American\"]"
                    ]
                }
            }
        },
        "rejectedPlans" : []
    },
    "serverInfo" : {
        "host" : "EPBYGOMW0448",
        "port" : 27017,
        "version" : "4.0.4",
        "gitVersion" : "f288a3bdf201007f3693c58e140056adf8b04839"
    },
    "ok" : 1.0
}
```

```
db.restaurants.find({ borough: "Staten Island", name: "Bagel Land" }).explain()
```

```
{
    "queryPlanner" : {
        "plannerVersion" : 1,
        "namespace" : "restaurants.restaurants",
        "indexFilterSet" : false,
        "parsedQuery" : {
            "$and" : [
                {
                    "borough" : {
                        "$eq" : "Staten Island"
                    }
                },
                {
                    "name" : {
                        "$eq" : "Bagel Land"
                    }
                }
            ]
        },
        "winningPlan" : {
            "stage" : "COLLSCAN",
            "filter" : {
                "$and" : [
                    {
                        "borough" : {
                            "$eq" : "Staten Island"
                        }
                    },
                    {
                        "name" : {
                            "$eq" : "Bagel Land"
                        }
                    }
                ]
            },
            "direction" : "forward"
        },
        "rejectedPlans" : []
    },
    "serverInfo" : {
        "host" : "EPBYGOMW0448",
        "port" : 27017,
        "version" : "4.0.4",
        "gitVersion" : "f288a3bdf201007f3693c58e140056adf8b04839"
    },
    "ok" : 1.0
}
```

```
db.restaurants.find({ borough: "Queens", cuisine: "Pizza" }).explain()
```

```
{
    "queryPlanner" : {
        "plannerVersion" : 1,
        "namespace" : "restaurants.restaurants",
        "indexFilterSet" : false,
        "parsedQuery" : {
            "$and" : [
                {
                    "borough" : {
                        "$eq" : "Queens"
                    }
                },
                {
                    "cuisine" : {
                        "$eq" : "Pizza"
                    }
                }
            ]
        },
        "winningPlan" : {
            "stage" : "COLLSCAN",
            "filter" : {
                "$and" : [
                    {
                        "borough" : {
                            "$eq" : "Queens"
                        }
                    },
                    {
                        "cuisine" : {
                            "$eq" : "Pizza"
                        }
                    }
                ]
            },
            "direction" : "forward"
        },
        "rejectedPlans" : []
    },
    "serverInfo" : {
        "host" : "EPBYGOMW0448",
        "port" : 27017,
        "version" : "4.0.4",
        "gitVersion" : "f288a3bdf201007f3693c58e140056adf8b04839"
    },
    "ok" : 1.0
}
```

### Task 4.5 Create an index to make query from task 3.4 covered and provide proof (from explain() or Compass UI) that it is indeed covered

```
db.restaurants.find({ "grades.8.score": {$lt: 7}}, { _id: 0, name: 1})
```

```
db.restaurants.createIndex(
  { "grades.8.score": 1, name: 1 },
  { partialFilterExpression: { "grades.8.score": { $lt: 7 } } }
)
```

```
{
    "createdCollectionAutomatically" : false,
    "numIndexesBefore" : 3,
    "numIndexesAfter" : 4,
    "ok" : 1.0
}
```

```
db.restaurants.find({ "grades.8.score": {$lt: 7}}, { _id: 0, name: 1}).explain()
```

```
{
    "queryPlanner" : {
        "plannerVersion" : 1,
        "namespace" : "restaurants.restaurants",
        "indexFilterSet" : false,
        "parsedQuery" : {
            "grades.8.score" : {
                "$lt" : 7.0
            }
        },
        "winningPlan" : {
            "stage" : "PROJECTION",
            "transformBy" : {
                "_id" : 0.0,
                "name" : 1.0
            },
            "inputStage" : {
                "stage" : "IXSCAN",
                "keyPattern" : {
                    "grades.8.score" : 1.0,
                    "name" : 1.0
                },
                "indexName" : "grades.8.score_1_name_1",
                "isMultiKey" : false,
                "multiKeyPaths" : {
                    "grades.8.score" : [],
                    "name" : []
                },
                "isUnique" : false,
                "isSparse" : false,
                "isPartial" : true,
                "indexVersion" : 2,
                "direction" : "forward",
                "indexBounds" : {
                    "grades.8.score" : [ 
                        "[-inf.0, 7.0)"
                    ],
                    "name" : [ 
                        "[MinKey, MaxKey]"
                    ]
                }
            }
        },
        "rejectedPlans" : []
    },
    "serverInfo" : {
        "host" : "EPBYGOMW0448",
        "port" : 27017,
        "version" : "4.0.4",
        "gitVersion" : "f288a3bdf201007f3693c58e140056adf8b04839"
    },
    "ok" : 1.0
}
```