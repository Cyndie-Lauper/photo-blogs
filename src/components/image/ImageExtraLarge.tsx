import { IMAGE_WIDTH_EXTRA_LARGE, ImageProps } from '.';
import ImageWithFallback from './ImageWithFallback';

export default function ImageExtraLarge(props: ImageProps) {
  const {
    aspectRatio,
    blurCompatibilityMode,
    ...rest
  } = props;
  return (
    <ImageWithFallback {...{
      ...rest,
      blurCompatibilityLevel: blurCompatibilityMode ? 'high' : 'none',
      width: IMAGE_WIDTH_EXTRA_LARGE,
      height: Math.round(IMAGE_WIDTH_EXTRA_LARGE / aspectRatio),
    }} />
  );
};
