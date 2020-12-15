import Head from "next/head";
import Header from "./styled/layout/Header";
import { Main } from "./styled/element/Main";
import Nav from "./styled/layout/Nav";
import { SectionTitle } from "./styled/element/SectionTitle";

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
      <Main>
        <Nav />
        <SectionTitle>Thoughts</SectionTitle>
        <div className='content'>{children}</div>
      </Main>
    </>
  );
}
