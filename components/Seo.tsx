import Head from "next/head"

type metaData = {
  title?: string
  description?: string
  image?: string
  url?: string
}

export default function Seo(props: metaData) {
  const metaData = {
    title: "Owen King",
    description: "I analyse, visualize and model data using modern technology",
    image: "https://ownkng.dev/bio.png",
    url: "https://ownkng.dev",
  }

  const title = props.title || metaData.title
  const description = props.description || metaData.description

  return (
    <Head>
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta charSet='utf-8' />
      <title key='title'>{title}</title>
      <meta name='Description' content={description} />
      <link
        rel='canonical'
        href={props.url ? `https://ownkng.dev${props.url}` : metaData.url}
      />
      <title key='og:title'>{title}</title>
      <meta property='og:type' content='website' />
      <meta name='og:description' content={description} />
      <meta
        property='og:url'
        content={props.url ? `https://ownkng.dev${props.url}` : metaData.url}
      />
      <meta
        name='og:image'
        content={
          props.image ? `https://ownkng.dev${props.image}` : metaData.image
        }
      />
    </Head>
  )
}
