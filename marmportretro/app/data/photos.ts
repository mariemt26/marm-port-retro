/* =====================================================
   Photos for the About page viewer.
   Drop images in public/photos/ and list them here.
   ===================================================== */

export type Photo = {
  src: string;
  /** shown under the image */
  caption: string;
  /** for screen readers — describe what's actually in the frame */
  alt: string;
  /** fake file name in the title bar */
  file?: string;
};

export const photos: Photo[] = [
  {
    src: "/photos/01.jpg",
    caption: "TODO — where this was, or what was happening",
    alt: "TODO — describe the photo",
    file: "photo-01.jpg",
  },
  {
    src: "/photos/02.jpg",
    caption: "TODO",
    alt: "TODO",
    file: "photo-02.jpg",
  },
  {
    src: "/photos/03.jpg",
    caption: "TODO",
    alt: "TODO",
    file: "photo-03.jpg",
  },
  {
    src: "/photos/04.jpg",
    caption: "TODO",
    alt: "TODO",
    file: "photo-04.jpg",
  },
];
