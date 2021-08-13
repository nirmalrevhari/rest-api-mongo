REST API TO FETCH DATA FROM MONGO 

This api fetches the data from mongo and returns

Steps to run:
1. Clone
2. Run app - npm run start
3. To run test suite - npm run test

Dependency: Node version 10.x

API Spec: URL: http://localhost:5000/api/records 
API Swagger documentaion path: /api/swagger/swagger.yaml
Method: GET 
Request: {
"startDate": "2016-12-19",
"endDate": "2018-02-02",
"minCount": 2700,
"maxCount": 3000
}

Response: {
  "code": 0,
  "msg": "success",
  "records": [
    {
      "key": "ibfRLaFT",
      "createdAt": "2016-12-25T16:43:27.909Z",
      "totalCount": 2892
    }
  ]
}

Note: If the mongo query takes more time than 5seconds(default value), the operation will be killed and error response returned. To alter default value, please use the environment variable "MONGO_QUERY_TIMEOUT_SEC".