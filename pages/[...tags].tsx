import { useRouter } from "next/router"
import Layout from "../components/Layout"
import { posts } from "../getAllPosts"
import Posts from "../components/styled/layout/Posts"
import styled from "styled-components"

const fixTag = (tag: string) => tag.replace(/\s/g, "").toLowerCase()

const tagMap = {
  featured: "Featured",
  machinelearning: "Machine Learning",
  datavisualisation: "Data Visualisation",
  webdev: "Web Dev",
  r: "R",
  geospatial: "Geospatial",
}

const Tags = ({ className }: { className?: string }) => {
  const router = useRouter()
  const { tag } = router.query

  const filteredPosts = posts.filter((mod) =>
    mod.module.meta.tags
      .map((tag) => fixTag(tag) === router.query.tag)
      .includes(true)
  )

  return (
    <Layout>
      <div className={className}>
        <h1># {tagMap[tag] || tag}</h1>
        {filteredPosts.length ? (
          <Posts posts={filteredPosts} />
        ) : (
          <p className='response'>No posts found on #{tag}</p>
        )}
      </div>
    </Layout>
  )
}

export default styled(Tags)`
  width: 100%;
  max-width: 1000px;
  margin: 0px auto;

  h1 {
    text-align: center;
    font-size: max(4rem, 5vw);
  }

  .response {
    color: var(--colors-headline);
    font-size: 1.2rem;
    text-align: center;
  }
`
