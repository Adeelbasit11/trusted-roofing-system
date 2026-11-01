import { useState, type ImgHTMLAttributes } from 'react';
import type { SiteImage } from '../../data/images';

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> & {
  image: SiteImage;
  /** Above-the-fold images should be eager */
  priority?: boolean;
};

/**
 * Image with lazy-loading, async decoding, a soft fade-in and a navy
 * placeholder background to avoid flashes and layout shift.
 */
export function Img({ image, priority, className = '', style, ...rest }: Props) {
  const [loaded, setLoaded] = useState(false);
  return (
    <img
      src={image.src}
      alt={image.alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      {...(priority ? { fetchPriority: 'high' as const } : {})}
      onLoad={() => setLoaded(true)}
      className={`bg-navy-800 object-cover transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
      style={style}
      {...rest}
    />
  );
}
