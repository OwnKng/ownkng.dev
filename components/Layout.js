import Head from "next/head"
import Header from "./styled/layout/Header"
import Nav from "./styled/layout/Nav"
import Footer from "./styled/layout/Footer"

export default function Layout({ children, pageTitle, description }) {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta charSet='utf-8' />
        <meta name='Description' content={description}></meta>
        <title>{pageTitle}</title>
      </Head>
      <Header />
      <Nav />
      <div className='content'>{children}</div>
      <Footer />
    </>
  )
}
