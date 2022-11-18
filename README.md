# Blogging API Project

This is an api for a blog app. This API has a general endpoint that shows a list of articles that have been created by different people, and anybody that calls this endpoint, should be able to read a blog created by them or other users.

---

## Requirements

1. Users should have a first name, last name, email, password.
2. A user should be able to sign up and sign in into the blog app
3. Use JWT as authentication strategy and expire the token after 1 hour
4. A blog can be in two states; draft and published
5. Logged in and not logged in users should be able to get a list of published blogs created
6. Logged in and not logged in users should be able to to get a published blog
7. Logged in users should be able to create a blog.
8. When a blog is created, it is in draft state
9. The owner of the blog should be able to update the state of the blog to published
10. The owner of a blog should be able to edit the blog in draft or published state
11. The owner of the blog should be able to delete the blog in draft or published state
12. The owner of the blog should be able to get a list of their blogs.
13. The endpoint should be paginated and filterable by state
14. When a single blog is requested, the api should return the user information(the author) with the blog. The read_count of the blog too should be updated by 1.

---

## Setup

- Install NodeJS, mongodb
- pull this repo
- update env with example.env
- run `npm run dev`

---

## Base URL

- [My blog API base URL](https://emec-blog.cyclic.app)

## Models

---

### User

| field     | data_type | constraints           |
| --------- | --------- | --------------------- |
| id        | string    | required              |
| firstName | string    | required             |
| lastName  | string    | required             |
| email     | string    | required              |
| password  | string    | required              |
| articles  | string    | reference: Blog model |

### Blog

| field        | data_type | constraints                                   |
| ------------ | --------- | --------------------------------------------- |
| id           | string    | required                                      |
| title        | string    | required , unique                             |
| state        | string    | default: "draft" enum: ['draft', 'published'] |
| description  | string    | optional                                      |
| author       | string    | required                                      |
| reading_time | string    | required                                      |
| read_count   | number    | required                                      |
| tags         | array     | required                                      |
| body         | atring    | required                                      |
| user         | string    | reference : User model                        |

## APIs

---

### Signup User

- Route: /users/signup
- Method: POST
- Body:

```
{
    "firstName": "Eze",
    "lastName": "Yusuf",
    "email":"Ezeyusuf@gmail.com",
    "password": "123456789"
}
```

- Responses

Success

```
{
  "status": "success",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNzEzNjljOGVlM2I4MGZmMjM0MjYxMSIsImlhdCI6MTY2ODM2MzkzMiwiZXhwIjoxNjY4MzY3NTMyfQ.3TYpxxdaW5PmbRStynluj_kWnLt9DgtsFeVKAC9cQjk",
  "user": {
    "email": "ezeyusuf@gmail.com",
    "firstName": "Eze",
    "lastName": "Yusuf",
    "password": "$2b$12$6nWf193YPI/Yz9s6zaeC6eZPrBwahK/Pfr.4eVLDIjc4AM6sFxr1y",
    "blog": [],
    "_id": "6371369c8ee3b80ff2342611",
    "createdAt": "2022-11-13T18:25:32.633Z",
    "updatedAt": "2022-11-13T18:25:32.633Z",
    "__v": 0
  }
}
```

---

### Login User

- Route: users/login
- Method: POST
- Body:

```
{
   "email":"ezeyusuf@gmail.com",
  "password": "123456789"
  
}
```

- Responses

Success

```
{
  "others": {
    "_id": "6371369c8ee3b80ff2342611",
    "email": "ezeyusuf@gmail.com",
    "firstName": "Eze",
    "lastName": "Yusuf",
    "blog": [],
    "createdAt": "2022-11-13T18:25:32.633Z",
    "updatedAt": "2022-11-13T18:25:32.633Z",
    "__v": 0
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNzEzNjljOGVlM2I4MGZmMjM0MjYxMSIsImlhdCI6MTY2ODUwMjA5NSwiZXhwIjoxNjY4NTA1Njk1fQ.lDj7XBmFWKp4PnsrtY0v8WSQWV2iGmqGxVp45dieONE"
}
```

---

### Create Article

- Route: /blogs
- Method: POST
- Header
  - Authorization: Bearer {token From Login}
- Body:

```
  {
  "title": "wide race",
"tags": ["sports"],

  "description": "at the end the worlfd",
  "body": " . It is not invoked for empty slots in sparse arrays.callbackFn is invoked with three arguments:the value of the elementthe index of the elementthe Array object being traversedIf a thisArg parameter is provided to filter, it will be used as the callback's this value. Otherwise, the value undefined will be used as its this value. The this value ultimately observable by callbackFn is determined according to the usuaa new array of all the values for which callbackFn returns a value that coerces to true. Array elements which do not pass the callbackFn test are skipped, and are not included in the new array.callbackFn is invoked only for array indexes which have assigned values. It is not invoked for empty slots in sparse arrays.callbackFn is invoked with three arguments:the value of the elementthe index of the elementthe Array object being traversedIf a thisArg parameter is provided to filter, it will be used as the callback's this value. Otherwise, the value undefined will be used as its this value. The this value ultimately observable by callbackFn is determined according to the usuaa new array of all the values for which callbackFn returns a value that coerces to true. Array elements which do not pass the callbackFn test are skipped, and are not included in the new array.callbackFn is invoked only for array indexes which have assigned values. It is not invoked for empty slots in sparse arrays.callbackFn is invoked with three arguments:the value of the elementthe index of the elementthe Array object being traversedIf a thisArg parameter is provided to filter, it will be used as the callback's this value. Otherwise, the value undefined will be used as its this value. The this value ultimately observable by callbackFn is determined according to the usuaa new array of all the values for which callbackFn returns a value that coerces to true. Array elements which do not pass the callbackFn test are skipped, and are not included in the new array.callbackFn is invoked only for array indexes which have assigned values. It is not invoked for empty slots in sparse arrays.callbackFn is invoked with three arguments:the value of the elementthe index of the elementthe Array object being traversedIf a thisArg parameter is provided to filter, it will be used as the callback's this value. Otherwise, the value undefined will be used as its this value. The this value ultimately observable by callbackFn is determined according to the usual rules fore"
 
}
```

- Responses

Success

```
{
  "blogPost": {
    "title": "wide raceswe",
    "description": "at the end the worlfd",
    "author": "Eze Yusuf",
    "state": "draft",
    "readCount": 0,
    "readingTime": " 3 Minute Read Time",
    "tags": [
      "sports"
    ],
    "body": " . It is not invoked for empty slots in sparse arrays.callbackFn is invoked with three arguments:the value of the elementthe index of the elementthe Array object being traversedIf a thisArg parameter is provided to filter, it will be used as the callback's this value. Otherwise, the value undefined will be used as its this value. The this value ultimately observable by callbackFn is determined according to the usuaa new array of all the values for which callbackFn returns a value that coerces to true. Array elements which do not pass the callbackFn test are skipped, and are not included in the new array.callbackFn is invoked only for array indexes which have assigned values. It is not invoked for empty slots in sparse arrays.callbackFn is invoked with three arguments:the value of the elementthe index of the elementthe Array object being traversedIf a thisArg parameter is provided to filter, it will be used as the callback's this value. Otherwise, the value undefined will be used as its this value. The this value ultimately observable by callbackFn is determined according to the usuaa new array of all the values for which callbackFn returns a value that coerces to true. Array elements which do not pass the callbackFn test are skipped, and are not included in the new array.callbackFn is invoked only for array indexes which have assigned values. It is not invoked for empty slots in sparse arrays.callbackFn is invoked with three arguments:the value of the elementthe index of the elementthe Array object being traversedIf a thisArg parameter is provided to filter, it will be used as the callback's this value. Otherwise, the value undefined will be used as its this value. The this value ultimately observable by callbackFn is determined according to the usuaa new array of all the values for which callbackFn returns a value that coerces to true. Array elements which do not pass the callbackFn test are skipped, and are not included in the new array.callbackFn is invoked only for array indexes which have assigned values. It is not invoked for empty slots in sparse arrays.callbackFn is invoked with three arguments:the value of the elementthe index of the elementthe Array object being traversedIf a thisArg parameter is provided to filter, it will be used as the callback's this value. Otherwise, the value undefined will be used as its this value. The this value ultimately observable by callbackFn is determined according to the usual rules fore",
    "user": "6371369c8ee3b80ff2342611",
    "_id": "637359e41933c82bd8002530",
    "createdAt": "2022-11-15T09:20:36.177Z",
    "updatedAt": "2022-11-15T09:20:36.177Z",
    "__v": 0
  }
}
```

---

## General Endpoints accessible to both logged in and non logged in users.

---

### Get all articles (Published articles).

- Route:/blogs
- Method: GET
- Query params : Present
- Request

```
  https://emec-blog.cyclic.app/blogs?sort=-createdAt

```

- Responses

  Success

```
[
{
"_id": "636839948e2e81da50435bda",
"title": "wide race",
"description": "at the end the worlfd",
"author": "ikem Violacordis",
"state": "published",
"readCount": 0,
"readingTime": " 2 Minute Read Time",
"tags": [
"sports"
],
"body": "  some filtered out).The range of elements processed by filter() is set before the first invocation of callbackFn. Elements which are assigned to indexes already visited, or to indexes outside the range, will not be visited by callbackFn. If existing elements of the array are deleted in the same way they will not be visited.determining the this seen by a function.The filter() method is a copying method. It does not alter this but instead returns a shallow copy that contains the same elements as the ones from the original array (with some filtered out).The range of elements processed by filter() is set before the first invocation of callbackFn. Elements which are assigned to indexes already visited, or to indexes outside the range, will not be visited by callbackFn. If existing elements of the array are deleted in the same way they will not be visited.determining the this seen by a function.The filter() method is a copying method. It does not alter this but instead returns a shallow copy that contains the same elements as the ones from the original array (with some filtered out).The range of elements processed by filter() is set before the first invocation of callbackFn. Elements which are assigned to indexes already visited, or to indexes outside the range, will not be visited by callbackFn. If existing elements of the array are deleted in the same way they will not be visited.",
"user": {
"_id": "6368281577e8145500f0b1d9",
"firstName": "ikem",
"lastName": "Violacordis"
},
"createdAt": "2022-11-06T22:47:48.775Z",
"updatedAt": "2022-11-06T23:14:20.142Z",
"__v": 0
},
{
"_id": "636838cd8e2e81da50435bc6",
"title": "the worldn",
"description": "at the end the worlfd",
"author": "ikem Violacordis",
"state": "published",
"readCount": 5,
"readingTime": " 2 Minute Read Time",
"tags": [
"heros"
],
"body": "  some filtered out).The range of elements processed by filter() is set before the first invocation of callbackFn. Elements which are assigned to indexes already visited, or to indexes outside the range, will not be visited by callbackFn. If existing elements of the array are deleted in the same way they will not be visited.determining the this seen by a function.The filter() method is a copying method. It does not alter this but instead returns a shallow copy that contains the same elements as the ones from the original array (with some filtered out).The range of elements processed by filter() is set before the first invocation of callbackFn. Elements which are assigned to indexes already visited, or to indexes outside the range, will not be visited by callbackFn. If existing elements of the array are deleted in the same way they will not be visited.determining the this seen by a function.The filter() method is a copying method. It does not alter this but instead returns a shallow copy that contains the same elements as the ones from the original array (with some filtered out).The range of elements processed by filter() is set before the first invocation of callbackFn. Elements which are assigned to indexes already visited, or to indexes outside the range, will not be visited by callbackFn. If existing elements of the array are deleted in the same way they will not be visited.",
"user": {
"_id": "6368281577e8145500f0b1d9",
"firstName": "ikem",
"lastName": "Violacordis"
},
"createdAt": "2022-11-06T22:44:29.710Z",
"updatedAt": "2022-11-06T23:05:18.579Z",
"__v": 0
}
]

```

---

### Get an article by ID (Published article).

- Route: blogs/:id
- Method: GET
- - Request

```
  https://emec-blog.cyclic.app/blogs/636838cd8e2e81da50435bc6

```

- Responses

  Success

```
{
  "_id": "636838cd8e2e81da50435bc6",
  "title": "the worldn",
  "description": "at the end the worlfd",
  "author": "ikem Violacordis",
  "state": "published",
  "readCount": 6,
  "readingTime": " 2 Minute Read Time",
  "tags": [
    "heros"
  ],
  "body": "  some filtered out).The range of elements processed by filter() is set before the first invocation of callbackFn. Elements which are assigned to indexes already visited, or to indexes outside the range, will not be visited by callbackFn. If existing elements of the array are deleted in the same way they will not be visited.determining the this seen by a function.The filter() method is a copying method. It does not alter this but instead returns a shallow copy that contains the same elements as the ones from the original array (with some filtered out).The range of elements processed by filter() is set before the first invocation of callbackFn. Elements which are assigned to indexes already visited, or to indexes outside the range, will not be visited by callbackFn. If existing elements of the array are deleted in the same way they will not be visited.determining the this seen by a function.The filter() method is a copying method. It does not alter this but instead returns a shallow copy that contains the same elements as the ones from the original array (with some filtered out).The range of elements processed by filter() is set before the first invocation of callbackFn. Elements which are assigned to indexes already visited, or to indexes outside the range, will not be visited by callbackFn. If existing elements of the array are deleted in the same way they will not be visited.",
  "user": "6368281577e8145500f0b1d9",
  "createdAt": "2022-11-06T22:44:29.710Z",
  "updatedAt": "2022-11-15T09:41:11.601Z",
  "__v": 0
}
```

---

## Author (Owner of articles) Endpoints.

---

### Get all author's articles ( Both published & Draft)

- Route: /blogs/owner/:id
- Method: GET
- Header
  - Authorization: Bearer {token From Login}
- Request

```
https://emec-blog.cyclic.app/blogs/owner/6371369c8ee3b80ff2342611

```

- Response

  Success

```
[
  {
    "_id": "637359e41933c82bd8002530",
    "title": "wide raceswe",
    "description": "at the end the worlfd",
    "author": "Eze Yusuf",
    "state": "draft",
    "readCount": 0,
    "readingTime": " 3 Minute Read Time",
    "tags": [
      "sports"
    ],
    "body": " . It is not invoked for empty slots in sparse arrays.callbackFn is invoked with three arguments:the value of the elementthe index of the elementthe Array object being traversedIf a thisArg parameter is provided to filter, it will be used as the callback's this value. Otherwise, the value undefined will be used as its this value. The this value ultimately observable by callbackFn is determined according to the usuaa new array of all the values for which callbackFn returns a value that coerces to true. Array elements which do not pass the callbackFn test are skipped, and are not included in the new array.callbackFn is invoked only for array indexes which have assigned values. It is not invoked for empty slots in sparse arrays.callbackFn is invoked with three arguments:the value of the elementthe index of the elementthe Array object being traversedIf a thisArg parameter is provided to filter, it will be used as the callback's this value. Otherwise, the value undefined will be used as its this value. The this value ultimately observable by callbackFn is determined according to the usuaa new array of all the values for which callbackFn returns a value that coerces to true. Array elements which do not pass the callbackFn test are skipped, and are not included in the new array.callbackFn is invoked only for array indexes which have assigned values. It is not invoked for empty slots in sparse arrays.callbackFn is invoked with three arguments:the value of the elementthe index of the elementthe Array object being traversedIf a thisArg parameter is provided to filter, it will be used as the callback's this value. Otherwise, the value undefined will be used as its this value. The this value ultimately observable by callbackFn is determined according to the usuaa new array of all the values for which callbackFn returns a value that coerces to true. Array elements which do not pass the callbackFn test are skipped, and are not included in the new array.callbackFn is invoked only for array indexes which have assigned values. It is not invoked for empty slots in sparse arrays.callbackFn is invoked with three arguments:the value of the elementthe index of the elementthe Array object being traversedIf a thisArg parameter is provided to filter, it will be used as the callback's this value. Otherwise, the value undefined will be used as its this value. The this value ultimately observable by callbackFn is determined according to the usual rules fore",
    "user": "6371369c8ee3b80ff2342611",
    "createdAt": "2022-11-15T09:20:36.177Z",
    "updatedAt": "2022-11-15T09:20:36.177Z",
    "__v": 0
  }
]

```

---

### Update article by author.

- Route: /blogs/owner/:id
- Method: PUT
- Header
  - Authorization: Bearer {token From Login}
- Request

```
https://emec-blog.cyclic.app/blogs/owner/636839948e2e81da50435bda

```



- Response

  Success

```
{
  "_id": "637359e41933c82bd8002530",
  "title": "wide raceswe",
  "description": "at the end the worlfd",
  "author": "Eze Yusuf",
  "state": "published",
  "readCount": 0,
  "readingTime": " 2 Minute Read Time",
  "tags": [
    "sports"
  ],
  "body": "  some filtered out).The range of elements processed by filter() is set before the first invocation of callbackFn. Elements which are assigned to indexes already visited, or to indexes outside the range, will not be visited by callbackFn. If existing elements of the array are deleted in the same way they will not be visited.determining the this seen by a function.The filter() method is a copying method. It does not alter this but instead returns a shallow copy that contains the same elements as the ones from the original array (with some filtered out).The range of elements processed by filter() is set before the first invocation of callbackFn. Elements which are assigned to indexes already visited, or to indexes outside the range, will not be visited by callbackFn. If existing elements of the array are deleted in the same way they will not be visited.determining the this seen by a function.The filter() method is a copying method. It does not alter this but instead returns a shallow copy that contains the same elements as the ones from the original array (with some filtered out).The range of elements processed by filter() is set before the first invocation of callbackFn. Elements which are assigned to indexes already visited, or to indexes outside the range, will not be visited by callbackFn. If existing elements of the array are deleted in the same way they will not be visited.",
  "user": "6371369c8ee3b80ff2342611",
  "createdAt": "2022-11-15T09:20:36.177Z",
  "updatedAt": "2022-11-16T12:44:00.435Z",
  "__v": 0
}
```

---

### Delete article by author.

- Route:/blogs/owner/:id
- Method: DELETE
- Header
  - Authorization: Bearer {token From Login}
- Request

```
  https://emec-blog.cyclic.app/blogs/owner/637359e41933c82bd8002530

```

- Response

  Success

```
{
    "status": "success",
    "message": "blog deleted successfully"
}

```

---


## Contributor

- Madu Emelie 