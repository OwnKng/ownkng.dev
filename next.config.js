const withPlugins = require("next-compose-plugins")

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
})

const withTM = require("next-transpile-modules")([
  "three",
  "postprocessing",
  "@react-three/drei",
])

const withImages = require("next-images")
module.exports = withImages({
  webpack(config, options) {
    return config
  },
})

const withVideos = require("next-videos")

module.exports = withPlugins([
  [
    withMDX,
    {
      pageExtensions: ["js", "jsx", "md", "mdx"],
    },
  ],
  [withTM],
  [withImages],
  [withVideos],
])
