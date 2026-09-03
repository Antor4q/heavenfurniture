
export default function Footer() {
  return (
    <div className="overflow-hidden bg-[#171715] px-6 py-28 md:px-10 lg:px-20">

      {/* MAIN FOOTER GRID */}

      <div className="grid grid-cols-1 gap-28 lg:grid-cols-3">

        {/* =====================================================
            QUOTE
        ===================================================== */}

        <div className="lg:col-span-1">

          <p
            className="
              max-w-[700px]
              text-[30px]
              font-bold
              uppercase
              leading-[1.06]
              tracking-[-0.035em]
              text-[#F7F5F1]
            "
          >
            Every piece we create is designed to bring
            lasting elegance into the homes of our clients.
          </p>

          <p
            className="
              mt-10
              text-[18px]
              font-medium
              leading-[1.5]
              tracking-[-0.035em]
              text-[#F7F5F1]/40
            "
          >
            © 2026 Heaven Furniture Mart
          </p>

        </div>


        {/* =====================================================
            CONTACT / LINKS / SOCIAL
        ===================================================== */}

        <div
          className="
          
            border-b
            border-[#F7F5F1]/10
            lg:col-span-2
          "
        >

          <div
            className="
              flex
              flex-col
              justify-between
              gap-12
              pb-16
              md:flex-row
              md:gap-10
            "
          >

            {/* =================================================
                CONTACT
            ================================================= */}

            <div className="flex flex-col">

              <span
                className="
                  mb-5
                  text-[11px]
                  font-semibold
                  uppercase
                  text-[#B79B67]
                "
              >
                Contact
              </span>

              <a
                href="tel:+8801960481983"
                className="
                  text-[17px]
                  font-medium
                  text-[#F7F5F1]/70
                  transition-colors
                  duration-300
                  hover:text-[#F7F5F1]
                "
              >
                +880 1960-481983
              </a>

              <a
                href="mailto:heavenfurnituremart@gmail.com"
                className="
                  mt-2
                  text-[17px]
                  font-medium
                  text-[#F7F5F1]/70
                  transition-colors
                  duration-300
                  hover:text-[#F7F5F1]
                "
              >
                heavenfurnituremart@gmail.com
              </a>

              <p
                className="
                  mt-6
                  text-[14px]
                  leading-[1.5]
                  text-[#F7F5F1]/35
                "
              >
                Agrabad Access Road
                <br />
                Chattogram, Bangladesh
              </p>

            </div>


            {/* =================================================
                LINKS
            ================================================= */}

            <div className="flex flex-col">

              <span
                className="
                  mb-5
                  text-[11px]
                  font-semibold
                  uppercase
                  text-[#B79B67]
                "
              >
                Explore
              </span>

              <a
                href="#collections"
                className="
                  text-[17px]
                  font-medium
                  text-[#F7F5F1]/70
                  transition-colors
                  duration-300
                  hover:text-[#F7F5F1]
                "
              >
                Collections
              </a>

              <a
                href="#bespoke"
                className="
                  mt-2
                  text-[17px]
                  font-medium
                  text-[#F7F5F1]/70
                  transition-colors
                  duration-300
                  hover:text-[#F7F5F1]
                "
              >
                Bespoke
              </a>

              <a
                href="#about"
                className="
                  mt-2
                  text-[17px]
                  font-medium
                  text-[#F7F5F1]/70
                  transition-colors
                  duration-300
                  hover:text-[#F7F5F1]
                "
              >
                About
              </a>

            </div>


            {/* =================================================
                SOCIAL
            ================================================= */}

            <div className="flex flex-col">

              <span
                className="
                  mb-5
                  text-[11px]
                  font-semibold
                  uppercase
                  text-[#B79B67]
                "
              >
                Follow
              </span>

              <a
                href="https://www.facebook.com/HeavenFurnitureMart"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group
                  flex
                  items-center
                  gap-2
                  text-[17px]
                  font-medium
                  text-[#F7F5F1]/70
                  transition-colors
                  duration-300
                  hover:text-[#F7F5F1]
                "
              >
                Facebook

                <span
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                    group-hover:-translate-y-1
                  "
                >
                  ↗
                </span>
              </a>

              <a
                href="https://www.instagram.com/heaven_furniture_ltd"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group
                  mt-2
                  flex
                  items-center
                  gap-2
                  text-[17px]
                  font-medium
                  text-[#F7F5F1]/70
                  transition-colors
                  duration-300
                  hover:text-[#F7F5F1]
                "
              >
                Instagram

                <span
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                    group-hover:-translate-y-1
                  "
                >
                  ↗
                </span>
              </a>

              <a
                href="https://www.youtube.com/@HeavenFurnitureMart"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group
                  mt-2
                  flex
                  items-center
                  gap-2
                  text-[17px]
                  font-medium
                  text-[#F7F5F1]/70
                  transition-colors
                  duration-300
                  hover:text-[#F7F5F1]
                "
              >
                YouTube

                <span
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                    group-hover:-translate-y-1
                  "
                >
                  ↗
                </span>
              </a>

            </div>

          </div>

        </div>

      </div>


      {/* =====================================================
          HUGE BRAND
      ===================================================== */}

      <h1
        className="
          mt-20
          -mb-14
          whitespace-nowrap
          font-serif
          text-[clamp(100px,24vw,370px)]
          font-bold
          uppercase
          leading-[0.7]
          tracking-normal
          text-[#fff]
        "
      >
        HEAVEN
      </h1>

    </div>
  );
}

