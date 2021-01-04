import Layout from "../components/Layout";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../components/GlobalStyles";
import { theme } from "../components/styled/utilities";
import { PageWrapper } from "../components/state";
import { MDXProvider } from "@mdx-js/react";
import CodeBlock from "../components/CodeBlock";
import Prism from "prism-react-renderer/prism";

(typeof global !== "undefined" ? global : window).Prism = Prism;
require("prismjs/components/prism-r");

const components = {
  pre: (props) => <div {...props} />,
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
