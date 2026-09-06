interface SectionHeadingProps {
  label: string;
  heading: React.ReactNode;
  headingColor?: string;
}

const SectionHeading = ({
  label,
  heading,
  headingColor = "#171715",
}: SectionHeadingProps) => {
  return (
    <div>
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
        {label}
      </span>

      <h2
        style={{ color: headingColor }}
        className="
          mt-3
          font-serif
          text-[clamp(34px,10vw,110px)]
          font-bold
          uppercase
          leading-[1.02]
          tracking-[-0.02em]
          sm:leading-[0.96]

          md:mt-5
          md:tracking-[-0.04em]
          lg:tracking-[-0.055em]
          lg:leading-[0.94]
        "
      >
        {heading}
      </h2>
    </div>
  );
};

export default SectionHeading;