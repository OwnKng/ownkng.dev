function importAll(r) {
  return r
    .keys()
    .map((fileName) => ({
      link: fileName.substr(1).replace(/\/index\.mdx$/, ""),
      module: r(fileName),
    }))
    .sort(
      (a, b) =>
        new Date(`${b.module.meta.date}`).getTime() -
        new Date(`${a.module.meta.date}`).getTime()
    )
}

export const posts = importAll(
  require.context("./pages/thoughts/", true, /\.mdx$/)
)
