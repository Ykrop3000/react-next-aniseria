import Image from "next/image"
import { useState } from "react";
import styled from 'styled-components'
import Skeleton from '@mui/material/Skeleton';

const Container = styled.section`
  align-items: ${ props => props.alignItems };
  display: flex;
  justify-content: ${ props => props.justifyContent };
  position: relative;
  height: ${ props => props.height };
  width: ${ props => props.width };
`;

const InnerContainer = styled.div`
  z-index: 10;
`

/**
 * <BgImage>
 *
 * The new next/image optimization setup handles background images oddly
 * It requires they be foreground images placed inside of a container
 * This component abstracts that logic away for better DX
 * 
 * You can layer text and imagery on top of the background image
 * All you have to do is pass that text or imagery into this component
 * 
 * Note: all images get processed through Webpack so you must import! 
 * No absolute URLs as they will break during site generation
 *
 * @param { string } alignItems - vertical alignment of inner content
 * @param { string } imgalt - text description of the image
 * @param { string } imgsrc - url of the image, should be a JS module import
 * @param { string } justifyContent - horizontal alignment of inner content
 * @param { number } height - how tall the background image should be (default: 50vh)
 * @param { number } width - how wide image should be (default: 100%)
 */
const BgImage = ({ 
  alignItems = 'center',
  children,
  imgalt = 'Background Image',
  imgsrc,
  height,
  justifyContent = 'center',
  width ,
  className,
  style
}) => {
const [load,setLoad] = useState(true) 
  return <>

      <Container
      // style={{display: load ? 'none': 'block'}}
        alignItems={ alignItems }
        height={ height }
        justifyContent={ justifyContent }
        width={ width }
        className={className}
      >
      {load && (
        <Skeleton
          animation='wave'
          variant="rectangular"
          style={{position: 'absolute', left: 0, top: 0}}
          className={className}
        />
      )}
      <Image
          alt={ imgalt }
          src={ imgsrc }
          style={style}
          layout="fill"
          objectFit="cover"
          quality={ 80 }
          onLoadingComplete={()=> setLoad(false)}
      />
      { children && 
          <InnerContainer>
          { children }
          </InnerContainer>
      }
      </Container>
  </>;
}

export default BgImage