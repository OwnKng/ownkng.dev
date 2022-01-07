import Link from "next/link"
import styled from "styled-components"
import { ArrowRightCircle } from "@styled-icons/bootstrap/ArrowRightCircle"
import Image from "next/image"

const NameCard = ({ className }: { className?: string }) => (
  <div className={className}>
    <div className='image'>
      <Image
        priority={true}
        layout='fixed'
        alt='Owen King'
        src='/bio.png'
        width={150}
        height={150}
      />
    </div>
    <div className='details'>
      <h2>Hi, I'm Owen</h2>
      <p>I analyse, visualise and model data using modern tech</p>
      <Link href='/about'>
        <a>
          <span>Learn more</span>
          <ArrowRightCircle height={25} />
        </a>
      </Link>
    </div>
  </div>
)

export default styled(NameCard)`
  display: grid;
  width: 100%;
  margin: 4rem auto 4rem auto;
  grid-template-columns: 1fr 2fr;
  padding: 1rem 0rem;

  .image {
    display: flex;
    place-content: center;
    align-items: center;
  }

  img {
    border-radius: 50%;
  }

  h2 {
    margin-bottom: 0px;
    font-size: 1.8rem;
  }

  p {
    margin-top: 5px;
  }

  a {
    text-decoration: none;
    color: var(--colors-button);
    font-size: 1.4rem;

    svg {
      margin-left: 10px;
    }
  }

  @media only screen and (max-width: 600px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;

    .details {
      text-align: center;
    }

    a {
      text-align: center;
    }
  }
`
