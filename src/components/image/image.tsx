import { AdvancedImage, lazyload, placeholder, responsive } from '@cloudinary/react';
import { IMAGE_DEFAULT_OPTIONS } from './constants';
import { dpr, quality } from '@cloudinary/url-gen/actions/delivery';
import { cloudinary } from '@/plugins';
import { memo } from 'react';

interface ImageProps {
  alt: string;
  height: number;
  publicId: string;
  width: number;
}

const Image = ({ alt, height, publicId, width }: ImageProps) => {
  const cloudinaryImage = cloudinary
    .image(publicId)
    .format(IMAGE_DEFAULT_OPTIONS.format)
    .delivery(quality(IMAGE_DEFAULT_OPTIONS.quality))
    .delivery(dpr(IMAGE_DEFAULT_OPTIONS.dpr));

  return (
    <div style={{ width: '100%' }}>
      <AdvancedImage
        alt={alt}
        height={height}
        style={{ maxWidth: '100%', width: '100%' }}
        cldImg={cloudinaryImage}
        plugins={[responsive({ steps: IMAGE_DEFAULT_OPTIONS.responsiveSteps }), placeholder({ mode: IMAGE_DEFAULT_OPTIONS.placeholderMode }), lazyload()]}
        width={width}
      />
    </div>
  );
};

export const MemoizedImage = memo(Image);
