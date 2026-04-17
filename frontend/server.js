const fs = require("fs");
const http = require("http");
const path = require("path");

const port = Number(process.env.PORT || 10000);
const apiBaseUrl = process.env.API_BASE_URL ? `http://${process.env.API_BASE_URL}` : "http://127.0.0.1:10001";
const indexHtml = fs.readFileSync(path.join(__dirname, "public", "index.html"), "utf8");

function sendHtml(response, body) {
  response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  response.end(body);
}

function sendJson(response, statusCode, body) {
  response.writeHead(statusCode, { "Content-Type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(body));
}

const server = http.createServer(async (request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`);

  if (request.method === "GET" && url.pathname === "/health") {
    return sendJson(response, 200, { ok: true, service: "frontend" });
  }

  if (request.method === "GET" && url.pathname === "/api/message") {
    try {
      const upstream = await fetch(`${apiBaseUrl}/api/message`);
      const body = await upstream.text();

      response.writeHead(upstream.status, {
        "Content-Type": upstream.headers.get("content-type") || "application/json; charset=utf-8"
      });
      response.end(body);
    } catch (error) {
      return sendJson(response, 502, {
        error: "API service unavailable",
        detail: error.message
      });
    }
    return;
  }

  if (request.method === "GET" && url.pathname === "/") {
    return sendHtml(response, indexHtml);
  }

  return sendJson(response, 404, { error: "Not found" });
});

server.listen(port, () => {
  console.log(`Frontend service listening on ${port}`);
});

