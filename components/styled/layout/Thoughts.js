import { useState, useEffect } from "react"
import { posts } from "../../../getAllPosts"
import { SectionHeader } from "../element/SectionHeader"
import Form from "./Form"
import Posts from "./Posts"
import styled from "styled-components"
import StyledLink from "../element/StyedLink"

const Thoughts = ({ className }) => {
  const [active, setActive] = useState("Featured")
  const [filteredPosts, setFiltered] = useState()

  let tags = posts
    .map((mod) => {
      const {
        module: { meta },
      } = mod
      return meta
    })
    .map((meta) => meta.tags)
    .flat()

  useEffect(() => {
    let withTag

    withTag = posts.filter((post) => {
      const {
        module: { meta },
      } = post
      return meta.tags.includes(active)
    })

    if (!active) withTag = posts

    setFiltered(withTag)
  }, [active])

  return (
    <div className={className}>
      <SectionHeader id='thoughts'>
        <SectionHeader.Title>thoughts</SectionHeader.Title>
        <SectionHeader.Subtitle>
          Articles and how-to's from some of my personal projects
        </SectionHeader.Subtitle>
      </SectionHeader>
      <Form
        tags={[...new Set(tags)].filter((tag) => tag !== "Featured")}
        active={active}
        setActive={setActive}
      />
      <Posts posts={filteredPosts} />
      <div className='grid'>
        <div />
        <div className='thoughtsFooter'>
          <StyledLink href='/archive'>See all articles &#x2192;</StyledLink>
        </div>
        <div />
      </div>
    </div>
  )
}

export default styled(Thoughts)`
  .grid {
    display: grid;
    grid-template-columns: 1fr minmax(auto, 1000px) 1fr;
    grid-template-rows: 1fr;
    grid-auto-flow: rows;

    @media only screen and (max-width: 1000px) {
      grid-template-columns: 0px 100% 0px;
    }
  }

  .thoughtsFooter {
    text-align: center;
    padding: 1rem 0px 1rem 0px;
  }
`
