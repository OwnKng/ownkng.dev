const withPlugins = require("next-compose-plugins")

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

const withTM = require("next-transpile-modules")([
  "three",
  "@react-three/fiber",
  "@react-three/drei",
  "@react-three/cannon",
])

config = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
}

module.exports = withPlugins(
  [
    [
      withMDX,
      {
        pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
      },
    ],
    [withTM],
  ],
  config
)
