import FurnitureGallery from "./FurnitureGallery";

const furnitureImages = [
  {
    image: "/gall1.webp",
    text: "Living Room",
  },
  {
    image: "/gall2.webp",
    text: "Luxury Sofa",
  },
  {
    image: "/gall3.webp",
    text: "Dining Collection",
  },
  {
    image: "/gall4.webp",
    text: "Bedroom",
  },
  {
    image: "/gall2.webp",
    text: "Modern Interior",
  },
  {
    image: "/gall1.webp",
    text: "Classic Collection",
  },
];

export default function GallerySection() {
  return (
    <section className="overflow-hidden bg-[#F7F5F1] pb-28">
      <div className="mb-16 px-6 md:px-12 lg:px-20">
        <span className=" mb-5
          block
          text-[14px]
          font-semibold
          uppercase
          tracking-[0.08em]
          text-[#B79B67]
          md:text-[16px]
          lg:text-[18px]">
          Our Collection
        </span>

        <h2 className="mt-5  text-[clamp(52px,7vw,110px)] font-bold uppercase leading-[0.88] tracking-[-0.055em] text-[#171715]">
          Designed to
          <br />
          be remembered.
        </h2>
      </div>

      <FurnitureGallery items={furnitureImages} />
    </section>
  );
}