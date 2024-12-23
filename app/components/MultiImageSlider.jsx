import Slider from "react-slick";
import Link from "next/link";
const Card = ({ slide }) => {
  console.log(slide);
  return (
    <div className="min-w-sm mx-2 rounded-lg">
      <a href="#">
        <div className="overflow-hidden">
          <img
            className="hover:scale-105 mx-auto h-[330px] md:w-[260px] w-full object-cover object-center transition-transform duration-1000"
            src={slide.background_image}
            alt={slide.name}
          />
        </div>
      </a>
      <div className="p-5 text-center">
        <a href="#">
          <h5 className="text-xl text-nowrap text-white tracking-tight text-[--text-color]">
            {slide.name}
          </h5>
        </a>
        <p className="font-normal gap-2 mb-2 flex justify-center text-xs text-white items-center">
          <span className="border bg-transparent rounded-md px-2 py-1">Rating: {slide.rating || "N/A"}</span>
          <Link
            href={`https://gamedeck-explorer.vercel.app/store/${slide.id}`}
            className="border border-white rounded-md hover:opacity-90 transition-all duration-200 px-2 py-1"
          >
            View Details
          </Link>
        </p>

      </div>
    </div>
  );
};

const MultiImageSlider = ({ slides }) => {
  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <Slider className="w-4/5 md:w-11/12 py-5 mx-auto" {...settings}>
      {slides.map((slide, index) => (
        <Card key={index} slide={slide} />
      ))}
    </Slider>
  );
};

export default MultiImageSlider;
