import { useState, useEffect, type ChangeEvent, type FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Phone,
  MessageCircle,
  Upload,
  CheckCircle2,
  ChevronDown,
  Building2,
  MapPin,
  Send,
} from 'lucide-react';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { PageHero, HeroLines } from '../components/common/PageHero';
import { CTABanner } from '../components/common/CTABanner';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';
import { TikTokIcon } from '../components/common/TikTokIcon';
import { images } from '../data/images';
import { business, whatsappLink } from '../data/business';
import { faqs } from '../data/faqs';

const serviceOptions = [
  'Wood Works',
  'Waterproofing',
  'Galvanized Trusses',
  'IBR Installation',
  'Selflock Roofing',
  'Fixing of Leakages',
  'Free Technical Advice',
  'Other',
];

const projectTypeOptions = [
  'Residential',
  'Commercial',
  'Industrial',
  'Renovation',
  'New Construction',
  'Other',
];

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  service: string;
  projectType: string;
  location: string;
  description: string;
};

type FormErrors = Partial<Record<keyof FormData | 'file', string>>;

export function Contact() {
  useDocumentMeta({
    title: 'Contact Us | Request a Free Quote & Technical Advice',
    description:
      'Contact Trusted Roofing Systems in Ghana: Call 0241924129, message on WhatsApp, or submit your roofing project requirements for a free quotation.',
    image: '/images/contact-hero.jpg',
  });

  const [searchParams] = useSearchParams();
  const preselectedService = searchParams.get('service') || '';

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    service: preselectedService && serviceOptions.includes(preselectedService) ? preselectedService : '',
    projectType: '',
    location: '',
    description: '',
  });

  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Update service if search param changes
  useEffect(() => {
    if (preselectedService && serviceOptions.includes(preselectedService)) {
      setFormData((prev) => ({ ...prev, service: preselectedService }));
    }
  }, [preselectedService]);

  const validate = (): boolean => {
    const errs: FormErrors = {};

    if (!formData.fullName.trim()) errs.fullName = 'Full Name is required';
    if (!formData.email.trim()) {
      errs.email = 'Email Address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      errs.phone = 'Phone Number is required';
    } else if (!/^(\+?233|0)?[0-9]{9,10}$/.test(formData.phone.replace(/[\s-]/g, ''))) {
      errs.phone = 'Please enter a valid Ghana phone number (e.g. 0241924129)';
    }

    if (!formData.service) errs.service = 'Please select a service required';
    if (!formData.projectType) errs.projectType = 'Please select a project type';
    if (!formData.location.trim()) errs.location = 'Project Location is required';
    if (!formData.description.trim()) errs.description = 'Project Description is required';

    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        errs.file = 'Allowed file formats: JPG, PNG, WEBP';
      } else if (file.size > 10 * 1024 * 1024) {
        errs.file = 'File size must be under 10MB';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    if (errors.file) {
      setErrors((prev) => ({ ...prev, file: undefined }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Frontend demo simulation: brief loading state followed by clear demo feedback
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 900);
  };

  // Build WhatsApp pre-filled message from form data
  const generateWhatsAppMessage = () => {
    return `Hello Trusted Roofing Systems,\n\nI would like to enquire about roofing services:\n- Name: ${formData.fullName}\n- Service: ${formData.service}\n- Project Type: ${formData.projectType}\n- Location: ${formData.location}\n- Notes: ${formData.description}\n\nPhone: ${formData.phone}\nEmail: ${formData.email}`;
  };

  return (
    <>
      {/* SECTION 1: CONTACT HERO */}
      <PageHero
        image={images.contactHero}
        eyebrow="Get in Touch"
        breadcrumb="Contact Us"
        index="05 / 05"
        title={
          <HeroLines
            lines={["Let's Discuss Your", 'Next Roofing Project.']}
            accentIndex={1}
          />
        }
        text="Tell us about your building, roofing requirements, or installation plans. Get in touch to start the conversation with Trusted Roofing Systems."
      >
        <Button href={`tel:${business.phoneDisplay}`} variant="primary">
          Call 0241924129
        </Button>
        <Button href={whatsappLink()} variant="outline-light">
          WhatsApp Us
        </Button>
      </PageHero>

      {/* SECTION 2: CONTACT INFORMATION CARDS */}
      <section id="contact-info" className="relative bg-white py-16 sm:py-20 border-b border-line">
        <div className="container-x relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Phone Card */}
            <div className="border border-line bg-bg p-8 transition-all hover:border-navy hover:shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <span className="grid h-10 w-10 place-items-center bg-blue/10 text-blue">
                  <Phone className="h-5 w-5" />
                </span>
                <span className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                  Direct Line
                </span>
              </div>
              <h3 className="font-display text-xl font-bold uppercase text-navy">
                Call Us
              </h3>
              <p className="mt-2 text-sm text-muted">
                Speak directly with the team regarding project quotes and technical advice.
              </p>
              <div className="mt-6 pt-4 border-t border-line">
                <a
                  href={`tel:${business.phoneDisplay}`}
                  className="font-display text-lg font-bold text-navy hover:text-blue transition-colors"
                >
                  {business.phoneDisplay}
                </a>
              </div>
            </div>

            {/* WhatsApp Card */}
            <div className="border border-line bg-bg p-8 transition-all hover:border-navy hover:shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <span className="grid h-10 w-10 place-items-center bg-emerald-500/10 text-emerald-600">
                  <MessageCircle className="h-5 w-5" />
                </span>
                <span className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                  WhatsApp Support
                </span>
              </div>
              <h3 className="font-display text-xl font-bold uppercase text-navy">
                WhatsApp Us
              </h3>
              <p className="mt-2 text-sm text-muted">
                Send site photos, building drawings, or roofing questions directly.
              </p>
              <div className="mt-6 pt-4 border-t border-line">
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-[0.15em] text-emerald-600 hover:text-emerald-700 transition-colors"
                >
                  <span>Chat on WhatsApp</span>
                  <span>({business.whatsappDisplay})</span>
                </a>
              </div>
            </div>

            {/* TikTok Card */}
            <div className="border border-line bg-bg p-8 transition-all hover:border-navy hover:shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <span className="grid h-10 w-10 place-items-center bg-navy/10 text-navy">
                  <TikTokIcon className="h-5 w-5" />
                </span>
                <span className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                  Social Showcase
                </span>
              </div>
              <h3 className="font-display text-xl font-bold uppercase text-navy">
                TikTok Channel
              </h3>
              <p className="mt-2 text-sm text-muted">
                Watch our latest roofing installations, residential works, and on-site updates.
              </p>
              <div className="mt-6 pt-4 border-t border-line">
                <a
                  href={business.tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display text-sm font-semibold uppercase tracking-[0.15em] text-navy hover:text-blue transition-colors"
                >
                  {business.tiktokHandle} · 19.4K Followers
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: FREE QUOTE ENQUIRY FORM */}
      <section id="quote" className="relative bg-bg py-24 sm:py-32 scroll-mt-24" aria-labelledby="form-heading">
        <div className="container-x relative">
          <SectionHeading
            eyebrow="Consultation & Pricing Request"
            title={
              <>
                Tell Us About <br />
                <span className="text-blue">Your Project.</span>
              </>
            }
            text="Share a few details about your roofing requirements so the team can understand what you need."
            align="split"
          />

          <div className="mt-14 max-w-4xl mx-auto border border-line bg-white p-8 sm:p-12 shadow-sm">
            {isSuccess ? (
              <div className="text-center py-12">
                <div className="mx-auto grid h-16 w-16 place-items-center bg-emerald-100 text-emerald-600 rounded-full mb-6">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="font-display text-2xl font-bold uppercase text-navy">
                  Enquiry Details Prepared
                </h3>
                <p className="mt-3 text-muted max-w-lg mx-auto text-sm sm:text-base leading-relaxed">
                  Thank you, <strong className="text-navy">{formData.fullName}</strong>. Your project details for{' '}
                  <strong className="text-navy">{formData.service}</strong> in{' '}
                  <strong className="text-navy">{formData.location}</strong> have been validated for demonstration.
                </p>

                {/* Direct WhatsApp Action with prefilled message */}
                <div className="mt-8 p-6 bg-bg border border-line text-left max-w-xl mx-auto">
                  <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-navy mb-2">
                    Optional: Forward Directly to Trusted Roofing Systems
                  </p>
                  <p className="text-xs text-muted mb-4">
                    Click the button below to open WhatsApp with your project summary prefilled for immediate review by the business owner (+233241924129).
                  </p>
                  <a
                    href={whatsappLink(generateWhatsAppMessage())}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-emerald-600 px-6 py-3 font-display text-xs font-semibold uppercase tracking-[0.16em] text-white hover:bg-emerald-700 transition-colors"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Send Project via WhatsApp
                  </a>
                </div>

                <div className="mt-8">
                  <button
                    type="button"
                    onClick={() => {
                      setIsSuccess(false);
                      setFormData({
                        fullName: '',
                        email: '',
                        phone: '',
                        companyName: '',
                        service: '',
                        projectType: '',
                        location: '',
                        description: '',
                      });
                      setFile(null);
                    }}
                    className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-muted hover:text-navy underline"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div>
                    <label htmlFor="fullName" className="block font-display text-xs font-semibold uppercase tracking-[0.18em] text-navy mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Kwame Mensah"
                      className="field"
                      aria-invalid={!!errors.fullName}
                    />
                    {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label htmlFor="phone" className="block font-display text-xs font-semibold uppercase tracking-[0.18em] text-navy mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. 0241924129"
                      className="field"
                      aria-invalid={!!errors.phone}
                    />
                    {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Email Address */}
                  <div>
                    <label htmlFor="email" className="block font-display text-xs font-semibold uppercase tracking-[0.18em] text-navy mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. client@example.com"
                      className="field"
                      aria-invalid={!!errors.email}
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                  </div>

                  {/* Company Name */}
                  <div>
                    <label htmlFor="companyName" className="block font-display text-xs font-semibold uppercase tracking-[0.18em] text-navy mb-2">
                      Company / Organization <span className="text-muted/60 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="e.g. Mensah Real Estate"
                      className="field"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Service Required */}
                  <div>
                    <label htmlFor="service" className="block font-display text-xs font-semibold uppercase tracking-[0.18em] text-navy mb-2">
                      Service Required <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="field"
                      aria-invalid={!!errors.service}
                    >
                      <option value="">Select Service Required</option>
                      {serviceOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    {errors.service && <p className="mt-1 text-xs text-red-500">{errors.service}</p>}
                  </div>

                  {/* Project Type */}
                  <div>
                    <label htmlFor="projectType" className="block font-display text-xs font-semibold uppercase tracking-[0.18em] text-navy mb-2">
                      Project Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className="field"
                      aria-invalid={!!errors.projectType}
                    >
                      <option value="">Select Project Type</option>
                      {projectTypeOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    {errors.projectType && <p className="mt-1 text-xs text-red-500">{errors.projectType}</p>}
                  </div>
                </div>

                {/* Project Location */}
                <div>
                  <label htmlFor="location" className="block font-display text-xs font-semibold uppercase tracking-[0.18em] text-navy mb-2">
                    Project Location (City / Town in Ghana) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g. Accra, Kumasi, Tema, Takoradi"
                    className="field"
                    aria-invalid={!!errors.location}
                  />
                  {errors.location && <p className="mt-1 text-xs text-red-500">{errors.location}</p>}
                </div>

                {/* Project Description */}
                <div>
                  <label htmlFor="description" className="block font-display text-xs font-semibold uppercase tracking-[0.18em] text-navy mb-2">
                    Project Description &amp; Details <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Please describe your roof requirements, building dimensions, preferred materials, or current issues (e.g. new residential house needing galvanized trusses and IBR roofing sheets)..."
                    className="field resize-none"
                    aria-invalid={!!errors.description}
                  />
                  {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description}</p>}
                </div>

                {/* Optional Image Upload */}
                <div>
                  <label className="block font-display text-xs font-semibold uppercase tracking-[0.18em] text-navy mb-2">
                    Attach Building Plan or Photo <span className="text-muted/60 font-normal">(Optional, max 10MB)</span>
                  </label>
                  <div className="relative border-2 border-dashed border-line p-6 text-center hover:border-blue transition-colors">
                    <input
                      type="file"
                      id="projectImage"
                      accept=".jpg,.jpeg,.png,.webp"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <Upload className="mx-auto h-8 w-8 text-muted mb-2" />
                    <p className="text-xs text-navy font-medium">
                      {file ? file.name : 'Click or drag photo / architectural drawing here'}
                    </p>
                    <p className="text-[0.65rem] text-muted mt-1">Accepts JPG, PNG, WEBP up to 10MB</p>
                  </div>
                  {errors.file && <p className="mt-1 text-xs text-red-500">{errors.file}</p>}
                </div>

                {/* Demo Notice */}
                <div className="bg-bg p-4 border-l-2 border-blue text-xs text-muted leading-relaxed">
                  <p>
                    <strong>Frontend Demo Notice:</strong> This interactive form validates all user inputs on the frontend and prepares your consultation request without storing data in an external database.
                  </p>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto"
                    icon={<Send className="h-4 w-4" />}
                  >
                    {isSubmitting ? 'Validating Enquiry...' : 'Submit Roofing Enquiry'}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 4: PROJECT REQUIREMENTS GUIDANCE */}
      <section className="relative bg-white py-20 sm:py-28 border-b border-line" aria-labelledby="req-heading">
        <div className="container-x relative">
          <SectionHeading
            eyebrow="Helpful Details"
            title={
              <>
                What Information <br />
                <span className="text-blue">Helps Us Quote?</span>
              </>
            }
            text="Sharing these specifics enables the team to give you tailored recommendations for your structure."
            align="split"
          />

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                num: '01',
                title: 'Building Type',
                desc: 'Whether it is a single-family bungalow, a multi-storey house, a commercial shop, or an industrial shed.',
              },
              {
                num: '02',
                title: 'Roofing Finish',
                desc: 'Your preferred profile: IBR sheets, modern selflock, or wood vs. galvanized steel truss frameworks.',
              },
              {
                num: '03',
                title: 'Site Location',
                desc: 'The project city or regional location in Ghana to understand delivery logistics and site access.',
              },
              {
                num: '04',
                title: 'Photos or Plans',
                desc: 'Current stage photographs or architectural elevation drawings showing roof slopes and dimensions.',
              },
            ].map((r) => (
              <div key={r.num} className="border border-line bg-bg p-6">
                <span className="font-display text-sm font-bold text-amber">{r.num}</span>
                <h3 className="mt-2 font-display text-base font-bold uppercase text-navy">
                  {r.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-muted leading-relaxed">
                  {r.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: BUSINESS MARKET & CONTEXT */}
      <section className="relative bg-bg py-20 sm:py-28" aria-labelledby="location-heading">
        <div className="container-x relative">
          <div className="grid gap-12 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7">
              <p className="eyebrow mb-5 text-blue">Regional Presence</p>
              <h2 id="location-heading" className="display-md text-navy">
                Operating Across <br />
                <span className="text-blue">Ghana, West Africa.</span>
              </h2>
              <p className="lede mt-6 text-muted max-w-xl">
                Trusted Roofing Systems serves clients across the Ghanaian building and construction sector, undertaking roofing projects for homes and commercial structures.
              </p>
              <div className="mt-8 space-y-4 text-sm text-muted">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-amber shrink-0" />
                  <span>Target Market: Ghana (Accra, Kumasi, Tema, and surrounding regions)</span>
                </div>
                <div className="flex items-center gap-3">
                  <Building2 className="h-5 w-5 text-blue shrink-0" />
                  <span>Physical office details provided upon project appointment and consultation.</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 border border-line bg-white p-8">
              <h3 className="font-display text-lg font-bold uppercase text-navy mb-4">
                Ready to Discuss?
              </h3>
              <p className="text-sm text-muted leading-relaxed mb-6">
                Direct phone consultations are available by calling <strong>0241924129</strong> or via WhatsApp at <strong>+233 24 192 4129</strong>.
              </p>
              <div className="space-y-3">
                <Button href={`tel:${business.phoneDisplay}`} variant="primary" className="w-full">
                  Call {business.phoneDisplay}
                </Button>
                <Button href={whatsappLink()} variant="outline-dark" className="w-full">
                  WhatsApp Support
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: FAQ ACCORDION */}
      <section className="relative bg-white py-24 sm:py-32 border-t border-line" aria-labelledby="faq-heading">
        <div className="container-x relative">
          <SectionHeading
            eyebrow="Frequently Asked Questions"
            title={
              <>
                Common Questions <br />
                <span className="text-blue">About Our Services.</span>
              </>
            }
            text="Clear answers regarding roofing solutions, steel trusses, leakage repairs, and how to request technical advice."
            align="split"
          />

          <div className="mt-14 max-w-3xl mx-auto divide-y divide-line border-y border-line">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div key={faq.q} className="py-6">
                  <button
                    type="button"
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 text-left font-display text-base sm:text-lg font-bold uppercase text-navy hover:text-blue transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-amber transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="mt-4 pr-8 text-sm sm:text-[0.95rem] text-muted leading-relaxed animate-fadeIn">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 7: FINAL CTA */}
      <CTABanner
        image={images.ctaHome}
        eyebrow="Quality You Can Trust"
        title={
          <>
            Your Roofing Project Starts <br />
            <span className="text-amber">With A Conversation.</span>
          </>
        }
        text="Contact Trusted Roofing Systems to get clear technical advice, explore roofing profiles, or request an estimate for your structure."
        actions={
          <>
            <Button href={`tel:${business.phoneDisplay}`} variant="primary">
              Call {business.phoneDisplay}
            </Button>
            <Button href={whatsappLink()} variant="outline-light">
              Message on WhatsApp
            </Button>
          </>
        }
        showPhone={true}
      />
    </>
  );
}
