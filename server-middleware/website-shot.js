const bodyParser = require("body-parser");
const app = require("express")();
const Pageres = require("pageres");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.all("/screenshot", async (req, res) => {
  const params = req.body;

  if (params.url) {
    await new Pageres({
      crop: params.crop || false, // false for full size, true for cropped
      darkMode: params.darkMode || false, // true for dark mode, false for light mode
      format: params.format || "png", // png, jpeg
      delay: params.delay || 1, // seconds
      scale: params.scale || 1, // scale factor
      width: params.width || 1280, // width
      height: params.height || 1280, // height
      launchOptions: {
        headless: true, // true for headless mode, false for normal mode
        args: ["--no-sandbox"],
        executablePath: "/usr/bin/chromium-browser",
      },
      useragent:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.75 Safari/537.36",
    })
      .src(params.url, params.size || ["1280x1280"])
      .run()
      .then((streams) => {
        const mimeType = params.format ? `image/${params.format}` : "image/png";
        const b64 = Buffer.from(streams[0]).toString("base64");
        const base64Data = `data:${mimeType};base64,${b64}`;
        const filename = `${params.url.replace(/\//g, "-")}.${params.format}`;
        res.status(200).json({ image: base64Data, filename: filename });
      });
  } else {
    res.status(500).json({ succes: false, result: "No url provided!" });
  }
});

module.exports = app;
