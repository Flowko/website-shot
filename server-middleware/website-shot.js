const bodyParser = require("body-parser");
const app = require("express")();
const Pageres = require("pageres");
const path = require("path");
const { env } = require("process");
require("dotenv").config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve, reject) => {
      var totalHeight = 0;
      var distance = 100;
      var timer = setInterval(() => {
        var scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight - window.innerHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
}

app.all("/screenshot", async (req, res) => {
  const params = req.body;

  if (params.url) {
    var data = {
      crop: params.crop || false, // false for full size, true for cropped
      darkMode: params.darkMode || false, // true for dark mode, false for light mode
      format: params.format || "png", // png, jpeg
      delay: params.delay || 1, // seconds
      scale: params.scale || 1, // scale factor
      width: params.width || 1280, // width
      height: params.height || 1280, // height
      script: "window.scrollTo(0, document.body.scrollHeight);" || null, // true to load with custom javascript, null for no javascript,
      css: params.style || null, // true to load with custom css, null for no css
      launchOptions: {
        headless: true, // true for headless mode, false for normal mode
        args: ["--no-sandbox"],
        waitUntil: "networkidle2",
        product: "chrome",
      },
      useragent:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.75 Safari/537.36 WAIT_UNTIL=load",

      beforeScreenshot: async (page) => {
        await autoScroll(page); // scroll through the page to load all the images
      },
    };

    if (process.env.RUNNING_HEROKU == null) {
      data.launchOptions.executablePath = "/usr/bin/chromium-browser";
    }

    if (params.save) {
      await new Pageres(data)
        .dest(__dirname + "/../screenshots")
        .src(params.url, params.size || ["1280x1280"])
        .run()
        .then((streams) => {
          const mimeType = params.format
            ? `image/${params.format}`
            : "image/png";
          const b64 = Buffer.from(streams[0]).toString("base64");
          const base64Data = `data:${mimeType};base64,${b64}`;
          const filename = `${params.url.replace(/\//g, "-")}.${params.format}`;
          res.status(200).json({
            image: base64Data,
            filename: filename,
            path: path.join(__dirname + "/../screenshots", streams[0].filename),
          });
        });
    } else {
      await new Pageres(data)
        .src(params.url, params.size || ["1280x1280"])
        .run()
        .then((streams) => {
          const mimeType = params.format
            ? `image/${params.format}`
            : "image/png";
          const b64 = Buffer.from(streams[0]).toString("base64");
          const base64Data = `data:${mimeType};base64,${b64}`;
          const filename = `${params.url.replace(/\//g, "-")}.${params.format}`;
          res.status(200).json({ image: base64Data, filename: filename });
        });
    }
  } else {
    res.status(500).json({ succes: false, result: "No url provided!" });
  }
});

module.exports = app;
