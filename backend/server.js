const http = require("http");

const port = Number(process.env.PORT || 10001);

function sendJson(response, statusCode, body) {
  response.writeHead(statusCode, { "Content-Type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(body));
}

const server = http.createServer((request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`);

  if (request.method === "GET" && url.pathname === "/health") {
    return sendJson(response, 200, { ok: true, service: "api" });
  }

  if (request.method === "GET" && url.pathname === "/api/message") {
    return sendJson(response, 200, {
      message: "Hello from the API service",
      service: "api",
      timestamp: new Date().toISOString()
    });
  }

  return sendJson(response, 404, { error: "Not found" });
});

server.listen(port, () => {
  console.log(`API service listening on ${port}`);
});
