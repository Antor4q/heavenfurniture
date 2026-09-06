"use client";

import { useState } from "react";
import AnimatedButton from "./shared/AnimatedButton";
import SectionHeading from "./shared/SectionHeading";

export default function CTA() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="
        overflow-hidden
        bg-[#F7F5F1]
        px-5
        py-16
        sm:px-8
        sm:py-20
        md:px-12
        lg:sticky
        lg:top-20
        lg:px-20
        lg:py-28
      "
    >
      <div className="relative w-full">
        {/* MAIN CONTENT */}
        <div
          className="
            grid
            w-full
            grid-cols-1
            gap-12
            sm:gap-16
            lg:grid-cols-[1fr_0.78fr]
            lg:items-start
            lg:gap-20
            xl:gap-28
          "
        >
          {/* LEFT */}
          <div className="w-full">
            {/* HEADER */}
            <div className="w-full">
             <SectionHeading label="Begin Your Space
"
          heading={
    <>
    Create Your Space
     
    </>
  }

        />
            </div>

            {/* DESCRIPTION */}
            <div className="mt-6 max-w-[620px] sm:mt-10 lg:mt-14">
              <p
                className="
                  text-[16px]
                  leading-[1.5]
                  tracking-[-0.015em]
                  text-black
                  sm:text-[19px]
                  lg:text-[21px]
                  xl:text-[23px]
                "
              >
                Tell us about your space, and let&apos;s create
                something that feels truly yours.
              </p>
            </div>

            {/* WHATSAPP */}
            <div className="mt-8 sm:mt-12 lg:mt-16">
              <AnimatedButton
                text="WhatsApp Us"
                href="https://wa.me/8801XXXXXXXXX"
              />
            </div>
          </div>

          {/* RIGHT — FORM */}
          <div className="w-full lg:pt-2">
            {submitted ? (
              <div className="flex min-h-[320px] flex-col justify-center sm:min-h-[420px]">
                <span
                  className="
                    mb-4
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.12em]
                    text-black
                    sm:mb-5
                  "
                >
                  Thank You
                </span>

                <h3
                  className="
                    text-[clamp(28px,6vw,58px)]
                    font-bold
                    uppercase
                    leading-[0.95]
                    tracking-[-0.04em]
                    text-black
                  "
                >
                  Your enquiry
                  <br />
                  is with us.
                </h3>

                <p
                  className="
                    mt-5
                    max-w-[380px]
                    text-[13px]
                    leading-[1.6]
                    text-black/55
                    sm:mt-6
                    sm:text-[14px]
                  "
                >
                  We&apos;ll review your requirements and get
                  back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="w-full">
                {/* NAME */}
                <div className="border-b border-black/20 pb-3">
                  <label
                    htmlFor="name"
                    className="
                      mb-2
                      block
                      text-[15px]
                      font-semibold
                      uppercase
                     
                      text-black
                    "
                  >
                    Name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Your name"
                    className="
                      w-full
                      bg-transparent
                      py-2
                      text-[15px]
                      font-medium
                      text-black
                      outline-none
                      placeholder:text-black/35
                      sm:text-[17px]
                      lg:text-[19px]
                    "
                  />
                </div>

                {/* EMAIL + PHONE */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-7">
                  {/* EMAIL */}
                  <div className="border-b border-black/20 pb-3 pt-6 sm:pt-7">
                    <label
                      htmlFor="email"
                      className="
                        mb-2
                        block
                        text-[15px]
                        font-semibold
                        uppercase
                      
                        text-black
                      "
                    >
                      Email
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="Your email"
                      className="
                        w-full
                        bg-transparent
                        py-2
                        text-[15px]
                        font-medium
                        text-black
                        outline-none
                        placeholder:text-black/35
                        sm:text-[17px]
                        lg:text-[19px]
                      "
                    />
                  </div>

                  {/* PHONE */}
                  <div className="border-b border-black/20 pb-3 pt-6 sm:pt-7">
                    <label
                      htmlFor="phone"
                      className="
                        mb-2
                        block
                        text-[15px]
                        font-semibold
                        uppercase
                        
                        text-black
                      "
                    >
                      Phone
                    </label>

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="Your phone"
                      className="
                        w-full
                        bg-transparent
                        py-2
                        text-[15px]
                        font-medium
                        text-black
                        outline-none
                        placeholder:text-black/35
                        sm:text-[17px]
                        lg:text-[19px]
                      "
                    />
                  </div>
                </div>

                {/* PROJECT */}
                <div className="border-b border-black/20 pb-3 pt-6 sm:pt-7">
                  <label
                    htmlFor="project"
                    className="
                      mb-2
                      block
                      text-[15px]
                      font-semibold
                      uppercase
                     
                      text-black
                    "
                  >
                    Project
                  </label>

                  <select
                    id="project"
                    name="project"
                    defaultValue=""
                    required
                    className="
                      w-full
                      appearance-none
                      bg-transparent
                      py-2
                      text-[15px]
                      font-medium
                      text-black
                      outline-none
                      sm:text-[17px]
                      lg:text-[19px]
                    "
                  >
                    <option value="" disabled>
                      What are you looking for?
                    </option>
                    <option value="living">Living Room</option>
                    <option value="bedroom">Bedroom</option>
                    <option value="dining">Dining</option>
                    <option value="office">Office & Study</option>
                    <option value="interior">Complete Interior</option>
                    <option value="bespoke">Bespoke Furniture</option>
                  </select>
                </div>

                {/* MESSAGE */}
                <div className="border-b border-black/20 pb-3 pt-6 sm:pt-7">
                  <label
                    htmlFor="message"
                    className="
                      mb-2
                      block
                      text-[15px]
                      font-semibold
                      uppercase
                     
                      text-black
                    "
                  >
                    Message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    required
                    placeholder="Tell us about your space..."
                    className="
                      w-full
                      resize-none
                      bg-transparent
                      py-2
                      text-[15px]
                      font-medium
                      leading-[1.5]
                      text-black
                      outline-none
                      placeholder:text-black/35
                      sm:text-[17px]
                      lg:text-[19px]
                    "
                  />
                </div>

                {/* FREE CONSULTATION */}
                <div className="mt-7 sm:mt-9">
                  <AnimatedButton text="Free Consultation" href="#contact" />
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}