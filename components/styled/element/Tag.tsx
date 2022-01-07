import styled from "styled-components"
import { ArrowRightCircle } from "@styled-icons/bootstrap/ArrowRightCircle"
import Link from "next/link"

const fixTag = (tag: string) => tag.replace(/\s/g, "").toLowerCase()

const Tag = ({ tag, className }: { tag: string; className?: string }) => (
  <Link href={`/tags?tag=${fixTag(tag)}`}>
    <a className={className}>
      <div className={tag}>
        <span>#{tag}</span>
        <ArrowRightCircle height={20} />
      </div>
    </a>
  </Link>
)

export default styled(Tag)`
  text-decoration: none;
  color: var(--colors-button);
  font-weight: bold;
  font-size: 1.2rem;
  padding: 0rem 0.5rem;

  span {
    margin-right: 5px;
  }

  svg {
    opacity: 0;
    transition: all 0.2s ease-in-out;
  }

  :hover {
    svg {
      opacity: 1;
    }
  }
`
