import { QRCodeCanvas } from "@loskir/styled-qr-code-node";
import { existsSync, mkdirSync, readFileSync } from "fs";

const filePath = process.argv[2] || "./example.urls";
const urlsStr = readFileSync(filePath, "utf8");

if (!urlsStr) {
  throw new Error(`Could not find file at path: ${filePath}`);
}

const urls = urlsStr.split("\n");

if (!urls.length) {
  throw new Error(
    `File at path: ${filePath} does not contain a list of new line separated connection details`
  );
}

if (!existsSync("./qrs")) {
  mkdirSync("./qrs");
}

urls.forEach((url, index) => {
  const qrCode = new QRCodeCanvas({
    width: 400,
    height: 400,
    data: url,
    imageOptions: {
      hideBackgroundDots: false,
      imageSize: 0.25,
      margin: 0,
    },
    dotsOptions: {
      type: "dots",
      color: "#6a1a4c",
      gradient: {
        type: "radial",
        rotation: 0.017453292519943295,
        colorStops: [
          { offset: 0, color: "#8236f3" },
          { offset: 1, color: "#3b0390" },
        ],
      },
    },
    backgroundOptions: { color: "#ffffff" },
    cornersSquareOptions: { type: "extra-rounded", color: "#6305f0" },
    cornersDotOptions: { type: "dot", color: "#000000" },
    image: "./icons/512x512.png",
  });

  qrCode.style = "border-radius: 16px;";

  qrCode.toFile(`./qrs/${index}.png`, "png", { density: 3, quality: 1 });
});
