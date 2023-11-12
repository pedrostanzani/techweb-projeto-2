import React from "react";

import { Fingerprint } from "lucide-react";

import Container from "@/components/container";

const AboutPage = () => {
  return (
    <Container>
      <div className="mb-7">
        <div className="mb-5 flex flex-row items-center gap-2">
          <Fingerprint className="pt-0.5 text-red-700" size={36} />
          <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight lg:text-4xl">
            About us?
          </h1>
        </div>
        <p className="text-lg mb-2.5 text-neutral-400">
          We're just really really really busy{" "}
          <a
            className="underline underline-offset-2 font-medium hover:text-neutral-300 transition-colors"
            target="_blank"
            href="https://www.youtube.com/watch?v=ljtIQkFRL1g"
          >
            music nerds
          </a>
          .
        </p>
        <p></p>
      </div>
    </Container>
  );
};

export default AboutPage;
