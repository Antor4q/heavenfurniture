import FurnitureGallery from "./FurnitureGallery";

const furnitureImages = [
  {
    image: "/fur1.jpg",
    text: "Living Room",
  },
  {
    image: "/fur2.jpg",
    text: "Luxury Sofa",
  },
  {
    image: "/fur3.jpg",
    text: "Dining Collection",
  },
  {
    image: "/fur4.jpg",
    text: "Bedroom",
  },
  {
    image: "/fur5.png",
    text: "Modern Sofa",
  },
  {
    image: "/fur4.jpg",
    text: "Classic",
  },
];

export default function GallerySection() {
  return (
    <section className="overflow-hidden bg-[#F7F5F1] pb-16 md:pb-24 lg:pb-28">
      <div className="mb-10 px-6 sm:px-8 md:mb-16 md:px-12 lg:px-20">
        <span
          className="
            mb-4
            block
            text-[12px]
            font-semibold
            uppercase
            tracking-[0.08em]
            text-[#B79B67]
            sm:text-[13px]
            md:mb-5
            md:text-[16px]
            lg:text-[18px]
          "
        >
          Our Collection
        </span>

        <h2
          className="
            mt-3
            text-[clamp(34px,10vw,110px)]
            font-bold
            uppercase
            leading-[0.98]
            tracking-[-0.02em]
            text-[#171715]
            sm:leading-[0.92]
            md:mt-5
            md:tracking-[-0.04em]
            lg:tracking-[-0.055em]
            lg:leading-[0.88]
          "
        >
          Designed to
          <br />
          be remembered.
        </h2>
      </div>

      <FurnitureGallery items={furnitureImages} />
    </section>
  );
}