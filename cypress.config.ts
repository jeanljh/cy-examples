import { defineConfig } from "cypress";
import fs from "fs";

export default defineConfig({
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
    },
    baseUrl: "http://localhost:8080/",
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx}",
    chromeWebSecurity: false,
    screenshotOnRunFailure: false,
    video: false,
    viewportHeight: 1080,
    viewportWidth: 1920,
    reporter: "mochawesome",
    reporterOptions: {
      reportDir: "cypress/results/json",
      overwrite: false,
      html: false,
      json: true,
    },
  },
});
