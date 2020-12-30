import Layout from "../components/Layout";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../components/GlobalStyles";
import { theme } from "../components/styled/utilities";
import { PageWrapper } from "../components/state";

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
      <PageWrapper>
        <ThemeProvider theme={theme}>
          <Layout pageTitle='Owen King' description=''>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </PageWrapper>
    </>
  );
}
