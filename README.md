# MTEL Javscript Test
This assignment is created to assess your skills and capabilities in JavaScript.

### Description

In this assignment, please create a an api servier using [this public api](http://universities.hipolabs.com/search?country=United+States).

### Requirements
- Use ExpressJS as a web server
- Create an endpoint that return a list of universities
  - Response must be in this following format 

    ```JSON
    {
      "total": 100
      "page": 1
      "data": [
        {
          "name": "Marywood University"
          "domains": ["marywood.edu"]
        }
      ]
    }
    ```
  - This api must handle pagination with 10 items per page as a default

### Submission
- Please create a pull request to main branch

### Note
- For anything that is not mentioned in the above requirements, feel free to use your own judgement.
- This test is not aiming for a perfect solution, but please try your best to display your understanding in backend development. 
