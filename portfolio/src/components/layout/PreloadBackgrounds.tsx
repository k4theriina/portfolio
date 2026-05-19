export type PreloadImage = {
  href: string;
  type?: string;
  media?: string;
};

/** Server-only: hoists `<link rel="preload">` for hero background images. */
export default function PreloadBackgrounds({
  images,
}: {
  images: readonly PreloadImage[];
}) {
  return (
    <>
      {images.map((image) => (
        <link
          key={`${image.media ?? "all"}-${image.href}`}
          rel="preload"
          as="image"
          href={image.href}
          {...(image.type ? { type: image.type } : {})}
          {...(image.media ? { media: image.media } : {})}
        />
      ))}
    </>
  );
}
