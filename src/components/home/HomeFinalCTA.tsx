import { CTABanner } from '../common/CTABanner';
import { Button } from '../common/Button';
import { images } from '../../data/images';

/**
 * HOME — Section 7: Final Quote CTA
 * Cinematic full-width closing section.
 */
export function HomeFinalCTA() {
  return (
    <CTABanner
      image={images.ctaHome}
      eyebrow="Roofing Consultations & Quotations"
      title={
        <>
          Let's Build <br />
          <span className="text-amber">Something Stronger.</span>
        </>
      }
      text="Have a roofing project in mind? Let's discuss the right solution for your structure."
      actions={
        <>
          <Button to="/contact#quote" variant="primary">
            Request a Free Quote
          </Button>
          <Button to="/services" variant="outline-light">
            Explore Our Services
          </Button>
        </>
      }
      showPhone={true}
    />
  );
}
