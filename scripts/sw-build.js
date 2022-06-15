const workboxBuild = require("workbox-build");

const buildSW = () => {
  // The build is expected to fail if the
  // sw install rules couldn't be generated.
  // Add a catch block to handle this scenario.
  console.log('build sw is running');
  return workboxBuild
    .injectManifest({
      swSrc: "./src/infrastructure/service-worker-template.js", // custom sw rule

      swDest: "./src/infrastructure/service-worker.js", // sw output file (auto-generated

      globDirectory: "public",

      globPatterns: ["**/*.{js,css,png,svg,json,eot,ttf,woff,woff2,ico}"],

      maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,

      injectionPoint: 'self.__WB_PUBLIC'
    })
    .then(({ count, size, warnings, filePaths }) => {
      warnings.forEach(console.warn);
      console.info(filePaths);
      console.info(`${count} files will be precached,
                  totaling ${size / (1024 * 1024)} MBs.`);
    });
};

buildSW();
