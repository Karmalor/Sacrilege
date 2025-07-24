import React from "react";

import type { Page } from "@/payload-types";

import { HighImpactHero } from "@/heros/HighImpact";
import { LowImpactHero } from "@/heros/LowImpact";
import { MediumImpactHero } from "@/heros/MediumImpact";
import { NOLidoHero } from "./NOLidoHero";
import { HighImpactWithMotionHero } from "./HighImpactWithMotionHero";

const heroes = {
  highImpact: HighImpactHero,
  lowImpact: LowImpactHero,
  mediumImpact: MediumImpactHero,
  NOLidoHero: NOLidoHero,
  HighImpactWithMotionHero: HighImpactWithMotionHero,
};

export const RenderHero: React.FC<Page["hero"]> = (props) => {
  const { type } = props || {};

  if (!type || type === "none") return null;

  const HeroToRender = heroes[type];

  if (!HeroToRender) return null;

  return <HeroToRender {...props} />;
};
