import FurnitureGallery from "./FurnitureGallery";
import SectionHeading from "./shared/SectionHeading";

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
       
        <SectionHeading label="Our Collection"
          heading={
    <>
      Designed to
      <br />
      be remembered.
    </>
  }
        />
      </div>

      <FurnitureGallery items={furnitureImages} />
    </section>
  );
}