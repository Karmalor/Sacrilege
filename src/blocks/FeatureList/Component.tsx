import React from "react";
import { cn } from "@/utilities/cn";
import { CMSLink } from "@/components/Link";
import { Media } from "@/components/Media";
import { FeatureListType } from "@/payload-types";
// import Media from '@/src/components/Media';

type Props = FeatureListType;

const FeatureListComponent: React.FC<Props> = ({
  eyebrow,
  title,
  subtitle,
  description,
  ctaPrimary,
  ctaSecondary,
  features,
  textPlacement,
  textAlignment,
}) => {
  const contentFirst = textPlacement === "top";
  const contentOrder = contentFirst ? "order-first" : "order-last";
  const featuresOrder = contentFirst ? "order-last" : "order-first";

  return (
    <section className={`container flex flex-col gap-8 py-24`}>
      <div
        className={cn("flex flex-col gap-4", contentOrder, {
          "items-center text-center": textAlignment === "center",
          "items-end text-right": textAlignment === "end",
        })}
      >
        {eyebrow && (
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            {eyebrow}
          </p>
        )}
        {title && (
          <h2
            className={`
              max-w-2xl text-3xl font-bold tracking-tighter
              sm:text-4xl
              md:text-5xl
            `}
          >
            {title}
          </h2>
        )}
        {subtitle && (
          <p className="max-w-xl text-xl text-muted-foreground">{subtitle}</p>
        )}
        {description && (
          <p className="max-w-xl text-muted-foreground">{description}</p>
        )}

        {(ctaPrimary?.label || ctaSecondary?.label) && (
          <div className="flex flex-wrap gap-4">
            {ctaPrimary?.url && <CMSLink {...ctaPrimary} size="lg" />}
            {ctaSecondary?.url && <CMSLink {...ctaSecondary} size="lg" />}
          </div>
        )}
      </div>

      <div
        className={cn(
          `
            grid grid-cols-1 gap-4
            md:grid-cols-2
          `,
          featuresOrder
        )}
      >
        {features?.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col overflow-hidden rounded-lg border-2 border-muted"
          >
            {feature.image && (
              <div className="relative w-full">
                <Media
                  resource={feature.image}
                  fill
                  className="aspect-[16/9]"
                  imgClassName="object-cover"
                />
              </div>
            )}
            <div className="flex flex-col gap-2 px-8 py-12">
              {feature.title && (
                <h3 className="text-xl font-bold">{feature.title}</h3>
              )}
              {feature.description && (
                <p className="text-muted-foreground">{feature.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureListComponent;
