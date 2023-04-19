const { defineConfig } = require("cypress");
const fs = require("fs");
// const path = require("path");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        readFile: (file) => {
          return new Promise((resolve, reject) => {
            fs.readFile(file, "utf8", (err, data) => {
              if (err) {
                console.error(err);
                return reject(err);
              }
              return resolve(data);
            });
          });
        },
      });
      // on("before:browser:launch", (browser, args) => {
      //   if (browser.name === "chrome") {
      //     const ignoreXFrameHeadersExtension = path.join(__dirname, "../extensions/ignore-x-frame-headers");
      //     args.push(args.push(`--load-extension=${ignoreXFrameHeadersExtension}`));
      //     args.push("--disable-features=CrossSiteDocumentBlockingIfIsolating,CrossSiteDocumentBlockingAlways,IsolateOrigins,site-per-process");
      //   }
      //   return args;
      // });
    },
    baseUrl: "http://localhost:8080/",
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx}",
    chromeWebSecurity: false,
    video: false,
    screenshotOnRunFailure: false,
    reporter: "mochawesome",
    reporterOptions: {
      reportDir: "cypress/results/json",
      overwrite: false,
      html: false,
      json: true,
    },
  },
});
