import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Container from "@/components/container";

/**
 * Moods:
 * --> Energético
 * --> Melancólico
 * --> Romântico
 * --> Nostálgico
 * --> Confiante
 */

const Hero = () => {
  return (
    <Container className="mt-32 lg:mt-24">
      <h1 className="mb-3 text-[60px] font-semibold leading-none tracking-tight sm:mb-6 sm:text-[72px] lg:text-[96px]">
        Your AI-powered <span className="text-gradient">personal DJ</span>.
      </h1>
      <div>
        <p className="mb-6 max-w-md text-lg text-neutral-400 sm:text-xl lg:max-w-lg">
          Meet <span className="font-semibold">Moody</span>: an opinionated AI
          companion for you to discover fresh and exciting tunes.
        </p>
        <Button
          className="bg-neutral-200 text-neutral-900 hover:bg-neutral-200/90"
          asChild
        >
          <Link to="/moods">Get started</Link>
        </Button>
      </div>
    </Container>
  );
};

export default Hero;
