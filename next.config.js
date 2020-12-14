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

module.exports = withPlugins([
  [
    withMDX,
    {
      pageExtensions: ["js", "jsx", "md", "mdx"],
    },
  ],
  [withTM],
]);
/* 

module.exports = withTM()
*/
