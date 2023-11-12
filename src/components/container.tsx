import React from "react";

import { cn } from "@/lib/utils";

const Container = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("max-w-3xl px-6 md:mx-auto", className)}>
      {children}
    </div>
  );
};

export default Container;
