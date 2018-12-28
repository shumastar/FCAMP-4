# Project Title

Front Camp MongoDB Part 2

## Import collection

```
db.airlines.find().count()
```

```
186648
```

### Task 1 How many records does each airline class have? Use $project to show result as { class:"Z", total: 999 }

```
db.airlines.aggregate(
  [
    {
      $group: {
        _id: '$class',
        total: {
          $sum: 1
        }
      }
    },
    {
      $project: {
        _id: 0,
        class: '$_id',
        total: 1
      }
    }
  ]
```

```
/* 1 */
{
    "total" : 140343.0,
    "class" : "F"
}

/* 2 */
{
    "total" : 23123.0,
    "class" : "L"
}

/* 3 */
{
    "total" : 5683.0,
    "class" : "P"
}

/* 4 */
{
    "total" : 17499.0,
    "class" : "G"
}
```

### Task 2 What are the top 3 destination cities outside of the United States (destCountry field, notincluded) with the highest average passengers count? Show result as { "avgPassengers" : 2312.380, "city" : "Minsk, Belarus" }


```
db.airlines.aggregate(
  [
    {
      $match: {
        destCountry: {
          $ne: 'United States'
        }
      }
    },
    {
      $group: {
        _id: '$destCity',
        avgPassengers: {
          $avg: '$passengers'
        }
      }
    },
    {
      $sort: {
        avgPassengers: -1
      }
    },
    { $limit: 3 },
    {
      $project: {
        avgPassengers: 1,
        _id: 0,
        city: '$_id'
      }
    }
  ]
)
```

```
/* 1 */
{
    "avgPassengers" : 8052.38095238095,
    "city" : "Abu Dhabi, United Arab Emirates"
}

/* 2 */
{
    "avgPassengers" : 7176.59663865546,
    "city" : "Dubai, United Arab Emirates"
}

/* 3 */
{
    "avgPassengers" : 7103.33333333333,
    "city" : "Guangzhou, China"
}
```

### Task 3 Which carriers provide flights to Latvia (destCountry)? Show result as one document { "_id" : "Latvia", "carriers" : [ "carrier1", " carrier2", …] }

```
db.airlines.aggregate(
  [
    {
      $match: {
        destCountry: 'Latvia'
      }
    },
    {
      $group: {
        _id: '$destCountry',
        carriers: {
          $addToSet: '$carrier'
        }
      }
    }
  ]
)
```

```
/* 1 */
{
    "_id" : "Latvia",
    "carriers" : [
        "Uzbekistan Airways",
        "Blue Jet SP Z o o",
        "JetClub AG"
    ]
}
```

### Task 4 What are the carriers which flue the most number of passengers from the United State to either Greece, Italy or Spain? Find top 10 carriers, but provide the last 7 carriers (do not include the first 3). Show result as { "_id" : "<carrier>", "total" : 999}


```
db.airlines.aggregate(
  [
    {
      $match: {
        originCountry: 'United States',
        destCountry: {
          $in: ['Greece', 'Italy', 'Spain']
        },
        passengers: {
          $gt: 0
        }
      }
    },
    {
      $group: {
        _id: '$carrier',
        totalPassengers: {
          $sum: '$passengers'
        }
      }
    },
    {
      $sort: {
        totalPassengers: -1
      }
    },
    { $limit: 10 },
    { $skip: 3 }
  ]
)
```

```
/* 1 */
{
    "_id" : "Compagnia Aerea Italiana",
    "totalPassengers" : 280256
}

/* 2 */
{
    "_id" : "United Air Lines Inc.",
    "totalPassengers" : 229936
}

/* 3 */
{
    "_id" : "Emirates",
    "totalPassengers" : 100903
}

/* 4 */
{
    "_id" : "Air Europa",
    "totalPassengers" : 94968
}

/* 5 */
{
    "_id" : "Meridiana S.p.A",
    "totalPassengers" : 20308
}

/* 6 */
{
    "_id" : "Norwegian Air Shuttle ASA",
    "totalPassengers" : 13344
}

/* 7 */
{
    "_id" : "VistaJet Limited",
    "totalPassengers" : 183
}
```

### Task 5 Find the city (originCity) with the highest sum of passengers for each state (originState) of the United States (originCountry). Provide the city for the first 5 states ordered by state alphabetically (you should see the city for Alaska, Arizona and etc). Show result as { "totalPassengers" : 999, "location" : { "state" : "abc", "city" : "xyz" } }


```
db.airlines.aggregate(
  [
    {
      $match: {
        originCountry: 'United States'
      }
    },
    {
      $group: {
        _id: { state: '$originState', city: '$originCity' },
        totalPassengers: {
          $sum: '$passengers'
        }
      }
    },
    {
      $sort: {
        totalPassengers: -1
      }
    },
    {
      $group: {
        _id: '$_id.state',
        totalPassengers: {
          $first: '$totalPassengers'
        },
        city: {
          $first: '$_id.city'
        }
      }
    },
    {
      $sort: {
        _id: 1
      }
    },
    { $limit: 5 },
    {
      $project: {
        _id: 0,
        totalPassengers: 1,
        location: {
          state: '$_id',
          city: '$city'
        }
      }
    }
  ]
)
```

```
/* 1 */
{
    "totalPassengers" : 760120,
    "location" : {
        "state" : "Alabama",
        "city" : "Birmingham, AL"
    }
}

/* 2 */
{
    "totalPassengers" : 1472404,
    "location" : {
        "state" : "Alaska",
        "city" : "Anchorage, AK"
    }
}

/* 3 */
{
    "totalPassengers" : 13152753,
    "location" : {
        "state" : "Arizona",
        "city" : "Phoenix, AZ"
    }
}

/* 4 */
{
    "totalPassengers" : 571452,
    "location" : {
        "state" : "Arkansas",
        "city" : "Little Rock, AR"
    }
}

/* 5 */
{
    "totalPassengers" : 23701556,
    "location" : {
        "state" : "California",
        "city" : "Los Angeles, CA"
    }
}
```

## Restore Enron Collection

## Task 1 Aggregate Enron Collection

#### Inspect a few of the documents to get a basic understanding of the structure. Enron was an American corporation that engaged in a widespread accounting fraud and subsequently failed. In this dataset, each document is an email message. Like all Email messages, there is one sender but there can be multiple recipients. For this task you will use the aggregation framework to figure out pairs of people that tend to communicate a lot. To do this, you will need to unwind the To list for each message. This problem is a little tricky because a recipient may appear more than once in the To list for a message. You will need to fix that in a stage of the aggregation before doing your grouping and counting of (sender, recipient) pairs. Which pair of people have the greatest number of messages in the dataset? For you reference the number of messages from phillip.love@enron.co to sladanaanna.kulic@enron.com is 144.

```
db.enron.aggregate(
  [
    {
      $project: {
        sender: '$headers.From',
        recipients: '$headers.To'
      }
    },
    {
      $unwind: {
        path: '$recipients'
      }
    },
    {
      $group: {
        _id: {
          _id: '$_id',
          sender: '$sender',
          recipients: '$recipients'
        }
      }
    },
    {
      $group: {
        _id: {
          sender: '$_id.sender',
          recipient: '$_id.recipients'
        },
        count: {
          $sum: 1
        }
      }
    },
    {
      $sort: {
        count: -1
      }
    },
    { $limit: 1 }
  ],
  { allowDiskUse: true }
)
```

```
/* 1 */
{
    "_id" : {
        "sender" : "susan.mara@enron.com",
        "recipient" : "jeff.dasovich@enron.com"
    },
    "count" : 750.0
}
```
