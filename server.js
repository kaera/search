const http = require("http");
const url = require("url");
const data = require("./api/_search.get");

const server = http.createServer((req, res) => {
  const queryObject = url.parse(req.url, true).query;
  res.end(
    JSON.stringify({
      ...data,
      suggestions: data.suggestions.filter((suggestion) =>
        suggestion.searchterm
          .toLowerCase()
          .includes((queryObject.q ?? "").toLowerCase())
      ),
    })
  );
});
server.listen(5000);
