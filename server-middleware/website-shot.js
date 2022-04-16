const bodyParser = require("body-parser");
const app = require("express")();
const path = require("path");
const fs = require("fs");
let scrollToBottom = require("scroll-to-bottomjs");
const dateFns = require("date-fns");

import captureWebsite from "capture-website";
import makeDir from "make-dir";
import template from "lodash.template";
import filenamifyUrl from "filenamify-url";
import { parse as parseUrl } from "url";
import filenamify from "filenamify";

require("dotenv").config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

function generateFilename(options) {
  let hash = parseUrl(options.url).hash ?? "";
  // Strip empty hash fragments: `#` `#/` `#!/`
  if (/^#!?\/?$/.test(hash)) {
    hash = "";
  }

  const now = Date.now();
  const basename = fs.existsSync(options.url)
    ? path.basename(options.url)
    : options.url;

  // const filename = `${params.url.replace(/\//g, "-")}.${params.format}`;
  const filenameTemplate = template(`${options.filename}.${options.format}`);
  let filename = filenameTemplate({
    crop: options.fullPage ? "" : "-cropped",
    date: dateFns.format(now, "yyyy-MM-dd"),
    time: dateFns.format(now, "HH-mm-ss"),
    size: options.size,
    width: options.width,
    height: options.height,
    url: `${filenamifyUrl(basename)}${filenamify(hash)}`,
  });

  const filepath = path.join(__dirname + "/../screenshots", filename);

  return {
    filepath,
    filename,
  };
}

app.post("/screenshot", async (req, res) => {
  const params = req.body;

  if (params.url) {
    const styles = [];
    const scripts = [];

    if (params.style) {
      styles.push(params.style);
    }

    if (params.script) {
      scripts.push(params.script);
    }

    var options = {
      url: params.url,
      size: params.size || "1920x1080",
      fullPage: params.fullPage,
      darkMode: params.darkMode,
      format: params.format || "png",
      delay: params.delay || 1,
      overwrite: true,
      width: params.width || 1920,
      height: params.height || 1080,
      filename: "<%= url %>-<%= size %><%= crop %>",
      scaleFactor: params.scale || 1,
      save: params.save,
      scripts,
      styles,
      launchOptions: {
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
        product: "chrome",
        waitUntil: "load",
      },
      beforeScreenshot: async (page, browser) => {
        if (params.fullPage) {
          await page.evaluate(scrollToBottom);
        }
      },
    };

    if (process.env.RUNNING_HEROKU == null) {
      options.launchOptions.executablePath = "/usr/bin/chromium-browser";
    }

    const { filename, filepath } = await generateFilename(options);

    await captureWebsite
      .buffer(options.url, options)
      .then(async (buffer) => {
        const mimeType = options.format
          ? `image/${options.format}`
          : "image/png";
        const b64 = Buffer.from(buffer).toString("base64");
        const base64Data = `data:${mimeType};base64,${b64}`;
        if (options.save) {
          await makeDir(__dirname + "/../screenshots");
          await fs.writeFileSync(filepath, buffer);
        }
        res.status(200).json({
          image: base64Data,
          filename: filename,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    res.status(500).json({ succes: false, result: "No url provided!" });
  }
});

module.exports = app;
