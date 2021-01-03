import Layout from "../components/Layout";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../components/GlobalStyles";
import { theme } from "../components/styled/utilities";
import { PageWrapper } from "../components/state";
import { MDXProvider } from "@mdx-js/react";
import CodeBlock from "../components/CodeBlock";

const components = {
  pre: (props) => <div {...props} style={{ color: "tomato" }} />,
  code: CodeBlock,
};

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
      <MDXProvider components={components}>
        <PageWrapper>
          <ThemeProvider theme={theme}>
            <Layout pageTitle='Owen King' description=''>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </PageWrapper>
      </MDXProvider>
    </>
  );
}
