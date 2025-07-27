import md5 from "md5";
import * as https from "node:https";
import * as querystring from "node:querystring";
import { appId, appSecret } from "./private";

const errMap: { [key: string]: string } = {
  "52003": "未授权用户",
};

type TBaiduRes = {
  error_code?: string;
  error_msg?: string;
  from: string;
  to: string;
  trans_result: {
    src: string;
    dst: string;
  }[];
};

export const translate = (word: string) => {
  // console.log("word是---", word);
  let [from, to] = ["en", "zh"];
  // 如果不是英文，则说明输入的是中文
  if (!/[a-zA-Z]/.test(word[0])) {
    [from, to] = ["zh", "en"];
  }
  const salt = Math.random() * 9999;
  const sign = md5(appId + word + salt + appSecret);
  const query = querystring.stringify({
    q: word,
    appid: appId,
    from,
    to,
    salt,
    sign,
  });

  const options = {
    hostname: "api.fanyi.baidu.com",
    port: 443,
    path: "/api/trans/vip/translate?" + query,
    method: "GET",
  };

  const req = https.request(options, (res) => {
    let chunks: Buffer[] = [];
    res.on("data", (chunk: Buffer) => {
      chunks.push(chunk);
    });

    res.on("end", () => {
      const temp = Buffer.concat(chunks).toString();
      const resObj: TBaiduRes = JSON.parse(temp);
      // console.log("resObj", resObj);
      if (resObj.error_code) {
        console.error(errMap[resObj.error_code] || resObj.error_msg);
        process.exit(2);
      } else {
        console.log(resObj.trans_result.map((item) => item.dst).join(","));
        process.exit(0);
      }
    });

    res.on("error", (err) => {
      console.log("err", err);
    });
  });

  req.end();
};
