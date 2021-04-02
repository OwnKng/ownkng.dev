import Image from "next/image"
import styled from "styled-components"
import { elevation } from "../utilities"

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
  ${elevation[1]}
`
