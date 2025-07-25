"use client";

import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import React, { ReactNode } from "react";

interface TransitionLinkProps extends LinkProps {
  children: ReactNode;
  href:
    | string
    | {
        pathname: string;
        query: {
          ticketId: string;
          qty: string;
        };
      };
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const TransitionLink = ({ children, href, ...props }: TransitionLinkProps) => {
  const router = useRouter();

  let query = {};

  if (typeof href === "object") {
    query = new URLSearchParams(href.query);
  }

  const handleTransition = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();

    // TODO: Run some exit animation
    const body = document.querySelector("body");
    body?.classList.add("page-transition");
    // sleep for some time
    await sleep(1000);

    if (typeof href === "object") {
      router.push(href.pathname + "?" + query);
    } else {
      router.push(href);
    }

    // sleep for some time
    await sleep(500);

    // TODO: Run some enter animation
    body?.classList.remove("page-transition");
  };

  return (
    <>
      <Link href={href} {...props} onClick={handleTransition}>
        {children}
      </Link>
    </>
  );
};

export default TransitionLink;
