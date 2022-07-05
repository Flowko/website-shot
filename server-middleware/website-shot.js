const bodyParser = require("body-parser");
const app = require("express")();
let scrollToBottom = require("scroll-to-bottomjs");

import captureWebsite from "./capture";
import pMap from "p-map";
import JSZip from "jszip";
import CustomBufferBuilder, { generateFilename, saveFile } from "./utils";

require("dotenv").config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/screenshot", async (req, res) => {
  const params = req.body;
  const url = params.url ? params.url.toString().trim() : null;
  const urls = params.urls
    .filter((url) => {
      if (url.url == null || url.url.trim() == "") {
        return false;
      }
      return true;
    })
    .map((url) => url.url.toString().trim());
  if (
    params.type != "multiple-imgs" &&
    (url == "" || url == null || url.length == 0)
  ) {
    res.status(400).send({
      error: "URL is required",
      success: false,
    });
    return;
  }

  if (params.type == "multiple-imgs" && urls.length == 0 && urls == null) {
    res.status(400).send({
      error: "URLS are required",
      success: false,
    });
    return;
  }

  const styles = [];
  const scripts = [];

  if (params.style) {
    styles.push(params.style);
  }

  if (params.script) {
    scripts.push(params.script);
  }

  var args = [
    "--no-sandbox",
    "--disable-setuid-sandbox",
    params.proxy && params.proxy.length > 0
      ? `--proxy-server=${params.proxy}`
      : null,
  ].filter((arg) => arg != null);

  var options = {
    url: params.url,
    urls: urls,
    size: params.size || "1920x1080",
    fullPage: params.fullPage,
    darkMode: params.darkMode,
    format: params.type === "pdf" ? "pdf" : params.format || "png",
    delay: params.delay || 1,
    overwrite: true,
    width: params.width || 1920,
    height: params.height || 1080,
    filename: "<%= url %>-<%= size %><%= crop %>",
    scaleFactor: params.scale || 1,
    save: params.save,
    scripts,
    styles,
    pdf:
      params.type == "pdf"
        ? {
            format:
              params.pdf.format == "resolution" ? null : params.pdf.format,
            printBackground: true,
            landscape: params.pdf.landscape || false,
            width: params.width || 1920,
            height: params.height || 1080,
          }
        : false,
    launchOptions: {
      headless: true,
      args,
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

  const mimeType = params.mimeType;

  if (urls && urls.length > 0 && params.type == "multiple-imgs") {
    var zip = new JSZip();

    const mapper = async (site) => {
      const { filename } = await generateFilename(options, site);

      await captureWebsite
        .buffer(site, options)
        .then(async (buffer) => {
          var customBufferBuilder = new CustomBufferBuilder();
          customBufferBuilder.append(buffer);
          var bufferContent = customBufferBuilder.getBuffer();
          var newFilename = !params.keepUrlStructure
            ? filename
            : filename.replaceAll("!", "/");
          await zip.file(newFilename, bufferContent, {
            binary: true,
            createFolders: true,
          });
        })
        .catch((e) => {
          console.log(e);
          res.status(400).send({
            error: "Error while capturing website",
            success: false,
          });
        });

      return;
    };

    await pMap(urls, mapper, { concurrency: 2 });
    zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" }).then(
      async function callback(buffer) {
        const result = await saveFile(
          options.save,
          "screenshots.zip",
          buffer,
          "application/zip"
        );

        res.status(200).send(result);
      },
      function (e) {
        console.log(e);
        res.status(400).send({
          error: "Error while generating zip file",
          success: false,
        });
      }
    );
  } else {
    const { filename } = await generateFilename(options);
    await captureWebsite
      .buffer(options.url, options)
      .then(async (buffer) => {
        const result = await saveFile(options.save, filename, buffer, mimeType);
        res.status(200).send(result);
      })
      .catch((e) => {
        console.log(e);
        res.status(400).send({
          error: "Error while capturing website",
          success: false,
        });
      });
  }
});

module.exports = app;
