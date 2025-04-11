import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

const SlidingImages = () => {
  const slides = [
    {
      image: "https://source.unsplash.com/1200x500/?construction-site",
      text: "Building Tomorrow’s Future",
    },
    {
      image: "https://source.unsplash.com/1200x500/?construction-worker",
      text: "Safety First, Quality Always",
    },
    {
      image: "https://source.unsplash.com/1200x500/?crane-building",
      text: "Innovation in Infrastructure",
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto mt-5">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        className="rounded-2xl shadow-lg"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="relative">
            <img
              src={slide.image}
              alt="Construction Image"
              className="w-full h-60 object-cover rounded-2xl"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <h2 className="text-white text-xl font-semibold">{slide.text}</h2>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SlidingImages;

