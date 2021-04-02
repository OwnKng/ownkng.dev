import Image from "next/image"
import styled from "styled-components"

const BlogImage = ({ className, src, width = 800, height = 465 }) => {
  return (
    <div className={className}>
      <Image
        alt='card-background-image'
        src={src}
        layout='responsive'
        objectFit='fill'
        width={width}
        height={height}
        priority={true}
      />
    </div>
  )
}

export default styled(BlogImage)`
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.6), 0 1px 6px 0px rgba(0, 0, 0, 0.3);
`
