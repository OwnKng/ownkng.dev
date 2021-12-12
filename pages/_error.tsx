import Link from "next/link"
import styled from "styled-components"
import Layout from "../components/Layout"

const ErrorPage = ({ className }: { className?: string }) => (
  <Layout>
    <div className={className}>
      <h1>Oh No! Something went wrong</h1>
      <Link href='/'>
        <a>Take me home!</a>
      </Link>
    </div>
  </Layout>
)

export default styled(ErrorPage)`
  min-height: 100vh;
  margin: 0px;
  padding: 3rem;

  a {
    color: ${({ theme }) => theme.colors.paragraph};
    padding: 2px 0px 0px 0px;
    font-size: 1.2rem;

    :hover {
      color: ${({ theme }) => theme.colors.tertiary};
    }

    :vistied {
      color: ${({ theme }) => theme.colors.stroke};
    }
  }
`
