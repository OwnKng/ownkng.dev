const withPlugins = require("next-compose-plugins")

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
})

const withTM = require("next-transpile-modules")([
  "three",
  "@react-three/fiber",
  "@react-three/drei",
])

const withImages = require("next-images")
module.exports = withImages({
  webpack(config, options) {
    return config
  },
})

module.exports = withPlugins([
  [
    withMDX,
    {
      pageExtensions: ["js", "jsx", "md", "mdx"],
    },
  ],
  [withTM],
  [withImages],
])
