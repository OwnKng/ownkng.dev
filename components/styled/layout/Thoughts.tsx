//@ts-nocheck
import { posts } from "../../../getAllPosts"
import { SectionHeader } from "../element/SectionHeader"
import Posts from "./Posts"
import styled from "styled-components"
import StyledLink from "../element/StyedLink"
import SectionTitle from "../element/SectionTitle"
import Tag from "../element/Tag"

type thoughtsType = {
  className?: string
}

const Thoughts = ({ className }: thoughtsType) => {
  const tags = posts
    .map((mod) => {
      const {
        module: { meta },
      } = mod
      return meta
    })
    .map((meta) => meta.tags)
    .flat()

  return (
    <div className={className}>
      <SectionHeader id='thoughts'>
        <SectionTitle>
          <h1>Thoughts</h1>
        </SectionTitle>
        <SectionHeader.Subtitle>
          Articles and how-to's from some of my personal projects
        </SectionHeader.Subtitle>
      </SectionHeader>
      <Posts
        posts={posts.filter((mod) => mod.module.meta.tags.includes("Featured"))}
      />
      <div className='grid'>
        <div />
        <div className='thoughtsFooter'>
          <p className='tagHeader'>Tags</p>
          <div className='contentTags'>
            {tags
              .reduce(
                (prev, curr) => (prev.includes(curr) ? prev : [...prev, curr]),
                []
              )
              .map((tag) => (
                <Tag key={tag} tag={tag} />
              ))}
          </div>
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

  .tagHeader {
    color: var(--colors-headline);
    text-align: left;
    font-size: 1rem;
    margin-top: 0px;
    margin-bottom: 5px;
  }

  .thoughtsFooter {
    text-align: center;
    padding: 1rem 0.5rem 1rem 0.5rem;
  }

  .contentTags {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding-bottom: 1rem;
    align-items: center;
    gap: 10px;
  }
`
