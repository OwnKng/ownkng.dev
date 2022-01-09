import styled from "styled-components"
import Link from "next/link"

const fixTag = (tag: string) => tag.replace(/\s/g, "").toLowerCase()

const Tag = ({ tag, className }: { tag: string; className?: string }) => (
  <Link href={`/tags?tag=${fixTag(tag)}`}>
    <a className={className}>
      <div className={tag}>
        <span>#{tag}</span>
      </div>
    </a>
  </Link>
)

export default styled(Tag)`
  text-decoration: none;
  color: var(--colors-headline);
  font-weight: bold;
  font-size: 1.2rem;
  padding: 0rem 0.5rem;
  border: 1px solid var(--colors-paragraph);
  border-radius: 4px;
  opacity: 0.6;
  transition: opacity 0.25s ease;

  span {
    margin-right: 5px;
  }

  :hover {
    opacity: 1;
  }
`
