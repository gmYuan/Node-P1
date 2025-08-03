import * as http from "node:http";
import { IncomingMessage, ServerResponse } from "node:http";
import * as fs from "node:fs";
import * as path from "node:path";
import * as url from "node:url";

const publicDir = path.resolve(__dirname, "public");
const server = http.createServer();
const cacheDay = 3600 * 24 * 20

server.on("request", (req: IncomingMessage, res: ServerResponse) => {
  const { url: originUrl = "", method } = req;
  const obj = url.parse(originUrl, true);
  const { pathname, query } = obj;
  const fileName = pathname?.slice(1) || "index.html";

  // 静态服务器不支持 非GET请求
  if (method !== "GET") {
    res.writeHead(405, { "Content-Type": "text/plain;charset=utf-8" });
    res.end("Method Not Allowed");
    return;
  }
  
  // 尝试读取文件
  fs.readFile(path.resolve(publicDir, fileName), (err, data) => {
    if (err) {
      console.log("err是", err);
      // 如果文件不存在，则返回404
      if (err.code === "ENOENT") {
        fs.readFile(path.resolve(publicDir, "404.html"), (err, data) => {
          if (err) {
            res.writeHead(500, { "Content-Type": "text/plain;charset=utf-8" });
            res.end("读取文件出错啦");
            // 添加 return，防止继续执行
            return;
          }
          res.writeHead(404, { "Content-Type": "text/html;charset=utf-8" });
          res.end(data);
        });
        // 添加 return，防止继续执行
        return;
      } else {
        res.writeHead(500, { "Content-Type": "text/plain;charset=utf-8" });
        res.end("服务器繁忙，请稍后再试");
        return;
      }
    }
    // 如果文件存在，则返回文件内容 + 添加缓存
    res.statusCode = 200;
    res.setHeader("Cache-Control", `public, max-age=${cacheDay}`);
    res.end(data);
  });
});

server.listen(3000);

console.log("server is running");
