import Header from "./styled/layout/Header"
import Nav from "./styled/layout/Nav"
import Footer from "./styled/layout/Footer"
import React from "react"
import Seo from "./Seo"

type layoutProps = {
  children: React.ReactNode
  pageTitle?: string
  description?: string
  image?: string
  url?: string
}

export default function Layout({
  children,
  pageTitle,
  description,
  image,
  url,
}: layoutProps) {
  return (
    <>
      <Seo
        title={pageTitle}
        description={description}
        image={image}
        url={url}
      />
      <Header />
      <Nav />
      <div className='content'>{children}</div>
      <Footer />
    </>
  )
}
