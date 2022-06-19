const fs = require("fs");
const dateFns = require("date-fns");
const path = require("path");

import { parse as parseUrl } from "url";
import template from "lodash.template";
import filenamifyUrl from "filenamify-url";
import filenamify from "filenamify";
import makeDir from "make-dir";

export function generateFilename(options, url) {
  let hash = parseUrl(url || options.url).hash ?? "";
  if (/^#!?\/?$/.test(hash)) {
    hash = "";
  }

  const now = Date.now();
  const basename = fs.existsSync(url || options.url)
    ? path.basename(url || options.url)
    : url || options.url;

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

var CustomBufferBuilder = function () {
  this.parts = [];
  this.totalLength = 0;
};

CustomBufferBuilder.prototype.append = function (part) {
  var tempBuffer = Buffer.from(part);
  this.parts.push(tempBuffer);
  this.totalLength += tempBuffer.length;
  this.buffer = undefined;
};

CustomBufferBuilder.prototype.getBuffer = function () {
  if (!this.buffer) {
    this.buffer = Buffer.concat(this.parts, this.totalLength);
  }
  return this.buffer;
};

export default CustomBufferBuilder;

export async function saveFile(save, filename, buffer, mimeType) {
  const filepath = path.join(__dirname + "/../screenshots", filename);
  if (save) {
    await makeDir(__dirname + "/../screenshots");
    await fs.writeFileSync(filepath, buffer);
  }

  const base64 = buffer.toString("base64");
  const base64Image = `data:${mimeType};base64,${base64}`;

  return {
    filename,
    filepath,
    mimeType,
    base64: base64Image,
    success: true,
  };
}
