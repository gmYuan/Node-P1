import * as http from "node:http";
import { IncomingMessage, ServerResponse } from "node:http";

const server = http.createServer();

server.on("request", (req: IncomingMessage, res: ServerResponse) => {
  console.log("request.method：", req.method);
  console.log("request.url：", req.url);
  console.log("request.headers：", req.headers);
  // 处理请求体数据
  const body: Array<Buffer> = [];
  req.on("data", (chunk) => {
    body.push(chunk);
  });
  // 处理请求体数据结束
  req.on("end", () => {
    const data = Buffer.concat(body).toString();
    console.log("body：", data);

    res.statusCode = 201;
    res.setHeader("ygm-name", "yc-star");
    res.write("hello world \n");
    res.write("my friends \n");
    res.end();
  });
});

server.listen(8888);

console.log("server is running");
