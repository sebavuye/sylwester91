import type {
  ImageFormatType,
  QualityTypes,
} from "@cloudinary/url-gen/types/types";

export const CLOUDINARY_CONFIGURATION = {
  cloudName: "sebastianvuye",
  publicIdRoot: "sylwester91",
};

interface ImageDefaultOptions {
  dpr: number | string;
  format: ImageFormatType;
  placeholderMode: string;
  quality: QualityTypes | number | string;
  responsiveSteps: Array<number> | number;
}

export const IMAGE_DEFAULT_OPTIONS: ImageDefaultOptions = {
  dpr: "2",
  format: "auto",
  quality: "auto",
  responsiveSteps: 100,
  placeholderMode: "blur",
};
