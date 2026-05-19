import type { BackgroundLayer } from "@/lib/backgrounds";

type PageBackgroundProps = {
  layers: readonly BackgroundLayer[];
  className?: string;
  imgClassName?: string;
  objectPosition?: string;
  /** Preload for LCP (hero sections). */
  priority?: boolean;
};

export default function PageBackground({
  layers,
  className = "",
  imgClassName = "",
  objectPosition = "center",
  priority = false,
}: PageBackgroundProps) {
  const defaultLayer = layers[layers.length - 1];

  return (
    <div
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}
      aria-hidden
    >
      <picture className="block h-full w-full">
        {layers.map((layer, index) => {
          const key = `${layer.media ?? "default"}-${index}`;
          const nodes = [];
          if (layer.webp) {
            nodes.push(
              <source
                key={`${key}-webp`}
                {...(layer.media ? { media: layer.media } : {})}
                srcSet={layer.webp}
                type="image/webp"
              />,
            );
          }
          if (layer.media) {
            nodes.push(
              <source
                key={`${key}-fallback`}
                media={layer.media}
                srcSet={layer.fallback}
                type={layer.fallbackType}
              />,
            );
          }
          return nodes;
        })}
        <img
          src={defaultLayer.fallback}
          alt=""
          className={`h-full w-full object-cover ${imgClassName}`}
          style={{ objectPosition }}
          decoding={priority ? "sync" : "async"}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
        />
      </picture>
    </div>
  );
}
