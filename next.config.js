const withPlugins = require("next-compose-plugins");

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
});

const withTM = require("next-transpile-modules")([
  "drei",
  "three",
  "postprocessing",
  "react-three-fiber",
]);

const withImages = require("next-images");
module.exports = withImages({
  webpack(config, options) {
    return config;
  },
});

module.exports = withPlugins([
  [
    withMDX,
    {
      pageExtensions: ["js", "jsx", "md", "mdx"],
    },
  ],
  [withTM],
  [withImages],
]);
