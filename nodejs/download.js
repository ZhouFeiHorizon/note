const fs = require("fs");
const path = require("path");
const axios = require("axios");
const cheerio = require("cheerio");

const userAgents = require("./userAgents");



// 请求拦截
axios.interceptors.request.use(
  (config) => {
    config.headers = {
      "user-agent": userAgents[parseInt(Math.random() * userAgents.length)],
      Referer: "https://www.xxx.com",
      ...config.headers,
    };

    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

let homePage = requestHtml(
  "https://www.cnblogs.com/JasmineLily/p/11157701.html"
);

startRequestHomePage(homePage);

function startRequestHomePage(data) {
  const $ = cheerio.load(data);
  let detailPageLinks = $("#pins span a");

  detailPageLinks.forEach((item, index) => {
    loadDetail(item.attribs["href"], item.children[0].data);
  });
}

// 请求html
async function requestHtml(url) {
  return axios.get(url, { responseType: "text" });
}

/**
 * 加载详情页面
 */
async function loadDetail(pageUrl, pageName) {
  let { data: html } = await requestHtml(pageUrl);
  let $ = cheerio.load(html);
  let imgUrl = getDetailPageImageSrc($);

  if (imgUrl) {
    requestImageSave(imgUrl, pageName);
  }

  // 判断是否还有下一张
  let nextPageUrl = getNextDetailPageUrl($);
  if (nextPageUrl) {
    loadDetail(nextPageUrl, pageName);
  }
}

// 获取详情页的图片地址
function getDetailPageImageSrc($) {
  // let $ = cheerio.load(html);
  let imgTag = $(".main-image img")[0];
  return imgTag && imgTag.attribs && imgTag.attribs.src;
}

// 获取下一个页面的url
function getNextDetailPageUrl($) {
  // let $ = cheerio.load(html);
  let img = $(".main-image a")[0];
  return img && img.attribs && img.attribs.href;
}

// 请求图片保存
function requestImageSave(url, imageName) {
  return new Promise((resolve, reject) => {
    axios.get({ url, responseType: "stream" }).then((res) => {
      const fileWriteStream = fs.createWriteStream(
        path.resolve(__dirname, "image", imageName)
      );

      res.data.pipe(fileWriteStream);

      fileWriteStream.on("finish", () => {
        // console.log("SUCCESS");
        resolve();
      });
      fileWriteStream.on("error", () => {
        // console.log("ERROR");
        reject();
      });
    });
  });
}
