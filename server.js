const express = require("express");
const app = express();
const universities = require("./db");

app.get("/", function (req, res) {
  res.send("Hello World!");
});

// get all results
app.get("/universities", (req, res) => {
  res.json(universities);
});

// get paginated results
app.get("/universities/page", paginatedResults(universities), (req, res) => {
  res.json(res.paginatedResults);
});

function paginatedResults(model) {
  // middleware function
  return (req, res, next) => {
    let page =
      typeof req.query.page !== "undefined" ? parseInt(req.query.page) : 1;
    const limit =
      typeof req.query.limit !== "undefined" ? parseInt(req.query.limit) : 10;

    const results = {};
    const total_items = model.length;
    const total_pages = Math.ceil(total_items / limit);

    results.total_items = total_items;
    results.total_pages = total_pages;
    if (page >= total_pages) {
      page = total_pages;
    } else if (page <= 0 || isNaN(page)) {
      page = 1;
    }

    // calculating the starting and ending index
    const startIndex = (page - 1) * limit;
    let endIndex = page * limit;
    results.page = page;
    if (endIndex < total_items) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    } else {
      endIndex = total_items;
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    //loop data
    const arr_data = [];
    for (let i = startIndex; i < endIndex; i++) {
      arr_data.push({
        name: typeof model[i].name !== "undefined" ? model[i].name : "",
        domains:
          typeof model[i].domains !== "undefined" ? model[i].domains : "",
      });
    }
    results.data = arr_data;

    //results.data = model.slice(startIndex, endIndex);

    res.paginatedResults = results;
    next();
  };
}

app.listen(3000);
