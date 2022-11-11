import { CarouselProvider, Slider, Slide } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import Card from "components/cards/gridCard";

export default function Carousel({ data = [], full, lazy=true }) {
  let slideStyle = full
    ? {
        width: "160px",
        height: "330px",
        maxWidth: "160px",
        padding: "16px 6px",
        flex: "0 0 160px",
      }
    : {
        width: "5%",
        padding: "16px 6px",
      };

  return (
    <>
      <CarouselProvider
        totalSlides={data.length}
        naturalSlideWidth={5}
        naturalSlideHeight={10}
        visibleSlides={2}
        isIntrinsicHeight
      >
        <Slider classNameTray={"slider"}>
          {data.map((i, id) => (
            <Slide style={slideStyle} key={id} index={id}>
              <Card data={i} status={false} rate={false} lazy={lazy} />
            </Slide>
          ))}
        </Slider>
      </CarouselProvider>
      <style global jsx>
        {`
          .slider {
            width: 333% !important;
            overflow: hidden;
          }
          @media (max-width: 600px) {
            .slider {
              width: 500% !important;
            }
          }
        `}
      </style>
    </>
  );
}
