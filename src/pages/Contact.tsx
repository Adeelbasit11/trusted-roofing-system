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
  ArrowUpRight,
  User,
  Mail,
  Wrench,
  Briefcase,
  FileText,
  Clock,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react';
import type { ReactNode } from 'react';

const inputCls =
  'peer w-full border border-slate-200 bg-slate-50/70 py-3.5 pl-12 pr-4 text-[0.95rem] text-ink placeholder:text-muted/60 transition-all duration-300 hover:border-slate-300 focus:border-blue focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue/10 aria-[invalid=true]:border-red-400 aria-[invalid=true]:bg-red-50/40';

/** Premium labelled field with leading icon, focus accent bar and inline error. */
function IconField({
  id,
  label,
  icon: Icon,
  required,
  optional,
  error,
  select,
  textarea,
  children,
}: {
  id: string;
  label: string;
  icon: LucideIcon;
  required?: boolean;
  optional?: boolean;
  error?: string;
  select?: boolean;
  textarea?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block font-display text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-navy">
        {label} {required && <span className="text-red-500">*</span>}
        {optional && <span className="font-normal text-muted/70">(Optional)</span>}
      </label>
      <div className="group relative">
        {children}
        <Icon
          className={`pointer-events-none absolute left-4 h-[18px] w-[18px] text-muted/70 transition-colors duration-300 peer-focus:text-blue ${
            textarea ? 'top-4' : 'top-1/2 -translate-y-1/2'
          }`}
        />
        {select && (
          <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted transition-transform duration-300 peer-focus:rotate-180 peer-focus:text-blue" />
        )}
        <span className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-blue to-amber transition-all duration-500 peer-focus:w-full" />
      </div>
      {error && <p className="mt-1.5 text-xs font-medium text-red-500">{error}</p>}
    </div>
  );
}
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { PageHero, HeroLines } from '../components/common/PageHero';
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
      <section id="contact-info" className="relative bg-[#F8FAFC] py-16 sm:py-24 border-b border-line overflow-hidden">
        {/* Subtle grid pattern */}
        <div className="line-grid-light pointer-events-none absolute inset-0 opacity-50" aria-hidden />

        <div className="container-x relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Phone Card (Direct Line) */}
            <div className="group relative flex flex-col justify-between overflow-hidden bg-white border border-slate-200 p-7 sm:p-8 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-2.5 hover:border-blue/50 hover:shadow-[0_26px_60px_-15px_rgba(23,100,232,0.20)] after:absolute after:inset-0 after:-translate-x-full group-hover:after:translate-x-full after:bg-gradient-to-r after:from-transparent after:via-blue-500/10 after:to-transparent after:transition-transform after:duration-1000 after:pointer-events-none">
              {/* Top Accent Gradient Border */}
              <div className="absolute top-0 left-0 right-0 h-[3.5px] w-full bg-gradient-to-r from-blue via-blue-600 to-amber transition-all duration-300 group-hover:brightness-125" />

              <div>
                {/* Header with Icon and Live Status */}
                <div className="flex items-center justify-between mb-6">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-blue/10 text-blue transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                    <Phone className="h-6 w-6" />
                  </div>
                  <span className="inline-flex items-center gap-1.5 bg-blue/[0.06] border border-blue/20 px-3 py-1 font-display text-[0.68rem] font-bold uppercase tracking-wider text-blue">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue animate-ping" />
                    Direct Line
                  </span>
                </div>

                <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-navy transition-colors duration-300 group-hover:text-blue">
                  Call Us
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">
                  Speak directly with our technical roofing team regarding project quotes, measurements, and advice.
                </p>
              </div>

              {/* Action Contact Button */}
              <div className="mt-8 pt-5 border-t border-slate-100">
                <a
                  href={`tel:${business.phoneDisplay}`}
                  className="flex items-center justify-between group/btn rounded-sm bg-slate-50 border border-slate-200/80 p-3.5 px-4 transition-all duration-300 hover:bg-blue hover:border-blue hover:text-white"
                >
                  <div className="flex flex-col">
                    <span className="text-[0.65rem] font-display font-semibold uppercase tracking-widest text-muted group-hover/btn:text-white/80">
                      Telephone
                    </span>
                    <span className="font-display text-lg font-bold text-navy group-hover/btn:text-white">
                      {business.phoneDisplay}
                    </span>
                  </div>
                  <div className="grid h-8 w-8 place-items-center rounded-full bg-amber text-navy transition-all duration-300 group-hover/btn:bg-white group-hover/btn:rotate-45 group-hover/btn:scale-110">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </a>
              </div>

              {/* Bottom Accent Gradient Border */}
              <div className="absolute bottom-0 left-0 right-0 h-[3.5px] w-full bg-gradient-to-r from-amber via-blue-600 to-blue transition-all duration-300 group-hover:brightness-125" />
            </div>

            {/* WhatsApp Card */}
            <div className="group relative flex flex-col justify-between overflow-hidden bg-white border border-slate-200 p-7 sm:p-8 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-2.5 hover:border-emerald-500/50 hover:shadow-[0_26px_60px_-15px_rgba(16,185,129,0.20)] after:absolute after:inset-0 after:-translate-x-full group-hover:after:translate-x-full after:bg-gradient-to-r after:from-transparent after:via-emerald-500/10 after:to-transparent after:transition-transform after:duration-1000 after:pointer-events-none">
              {/* Top Accent Gradient Border */}
              <div className="absolute top-0 left-0 right-0 h-[3.5px] w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400 transition-all duration-300 group-hover:brightness-125" />

              <div>
                {/* Header with Icon and Live Status */}
                <div className="flex items-center justify-between mb-6">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-emerald-500/10 text-emerald-600 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                    <MessageCircle className="h-6 w-6" />
                  </div>
                  <span className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-500/20 px-3 py-1 font-display text-[0.68rem] font-bold uppercase tracking-wider text-emerald-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Instant Support
                  </span>
                </div>

                <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-navy transition-colors duration-300 group-hover:text-emerald-600">
                  WhatsApp Us
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">
                  Send site photos, building drawings, architectural roof plans, or questions directly to our team.
                </p>
              </div>

              {/* Action Contact Button */}
              <div className="mt-8 pt-5 border-t border-slate-100">
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between group/btn rounded-sm bg-emerald-50/60 border border-emerald-500/20 p-3.5 px-4 transition-all duration-300 hover:bg-emerald-600 hover:border-emerald-600 hover:text-white"
                >
                  <div className="flex flex-col">
                    <span className="text-[0.65rem] font-display font-semibold uppercase tracking-widest text-emerald-700/80 group-hover/btn:text-white/80">
                      Chat Online
                    </span>
                    <span className="font-display text-base sm:text-[0.95rem] font-bold text-emerald-900 group-hover/btn:text-white">
                      {business.whatsappDisplay}
                    </span>
                  </div>
                  <div className="grid h-8 w-8 place-items-center rounded-full bg-emerald-600 text-white transition-all duration-300 group-hover/btn:bg-white group-hover/btn:text-emerald-700 group-hover/btn:rotate-45 group-hover/btn:scale-110">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </a>
              </div>

              {/* Bottom Accent Gradient Border */}
              <div className="absolute bottom-0 left-0 right-0 h-[3.5px] w-full bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-500 transition-all duration-300 group-hover:brightness-125" />
            </div>

            {/* TikTok Card */}
            <div className="group relative flex flex-col justify-between overflow-hidden bg-white border border-slate-200 p-7 sm:p-8 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-2.5 hover:border-rose-500/50 hover:shadow-[0_26px_60px_-15px_rgba(255,0,80,0.18)] after:absolute after:inset-0 after:-translate-x-full group-hover:after:translate-x-full after:bg-gradient-to-r after:from-transparent after:via-rose-500/10 after:to-transparent after:transition-transform after:duration-1000 after:pointer-events-none">
              {/* Top Accent Gradient Border */}
              <div className="absolute top-0 left-0 right-0 h-[3.5px] w-full bg-gradient-to-r from-[#FF0050] via-[#000000] to-[#00F2FE] transition-all duration-300 group-hover:brightness-125" />

              <div>
                {/* Header with Icon and Stats */}
                <div className="flex items-center justify-between mb-6">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-navy/10 text-navy transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                    <TikTokIcon className="h-6 w-6" />
                  </div>
                  <span className="inline-flex items-center gap-1.5 bg-rose-50 border border-rose-200 px-3 py-1 font-display text-[0.68rem] font-bold uppercase tracking-wider text-rose-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#FF0050]" />
                    19.4K Followers
                  </span>
                </div>

                <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-navy transition-colors duration-300 group-hover:text-[#FF0050]">
                  TikTok Channel
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">
                  Watch our latest on-site roofing installations, residential works, truss erections, and video updates.
                </p>
              </div>

              {/* Action Contact Button */}
              <div className="mt-8 pt-5 border-t border-slate-100">
                <a
                  href={business.tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between group/btn rounded-sm bg-slate-50 border border-slate-200/80 p-3.5 px-4 transition-all duration-300 hover:bg-navy hover:border-navy hover:text-white"
                >
                  <div className="flex flex-col">
                    <span className="text-[0.65rem] font-display font-semibold uppercase tracking-widest text-muted group-hover/btn:text-white/80">
                      Official Channel
                    </span>
                    <span className="font-display text-base sm:text-[0.95rem] font-bold text-navy group-hover/btn:text-white truncate max-w-[170px]">
                      {business.tiktokHandle}
                    </span>
                  </div>
                  <div className="grid h-8 w-8 place-items-center rounded-full bg-navy text-white transition-all duration-300 group-hover/btn:bg-[#FF0050] group-hover/btn:text-white group-hover/btn:rotate-45 group-hover/btn:scale-110">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </a>
              </div>

              {/* Bottom Accent Gradient Border */}
              <div className="absolute bottom-0 left-0 right-0 h-[3.5px] w-full bg-gradient-to-r from-[#00F2FE] via-[#000000] to-[#FF0050] transition-all duration-300 group-hover:brightness-125" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: FREE QUOTE ENQUIRY FORM - premium split layout */}
      <section id="quote" className="relative overflow-hidden bg-bg py-24 sm:py-32 scroll-mt-24" aria-labelledby="form-heading">
        <div className="line-grid-light pointer-events-none absolute inset-0 opacity-60" aria-hidden />
        <div className="pointer-events-none absolute -top-40 right-0 h-[520px] w-[520px] rounded-full bg-blue/10 blur-[120px]" aria-hidden />
        <div className="pointer-events-none absolute -bottom-40 left-0 h-[420px] w-[420px] rounded-full bg-amber/10 blur-[120px]" aria-hidden />

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

          <div className="mt-14 grid overflow-hidden border border-slate-200 bg-white shadow-[0_40px_90px_-30px_rgba(16,29,58,0.30)] lg:grid-cols-12">
            {/* LEFT - dark info panel */}
            <aside className="relative overflow-hidden bg-navy p-8 text-white sm:p-10 lg:col-span-5 xl:col-span-4">
              <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden />
              <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-blue/30 blur-3xl" aria-hidden />
              <div className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-amber/20 blur-3xl" aria-hidden />
              <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-amber via-blue to-amber" aria-hidden />

              <div className="relative flex h-full flex-col">
                <span className="inline-flex w-fit items-center gap-2 border border-amber/40 bg-amber/10 px-3 py-1 font-display text-[0.65rem] font-bold uppercase tracking-[0.22em] text-amber">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber" /> Free Quote
                </span>
                <h3 id="form-heading" className="mt-6 font-display text-3xl font-bold uppercase leading-[1.05] tracking-tight">
                  Get your roof <span className="text-amber">priced right.</span>
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-white/65">
                  Fill in the form and our roofing team will review your requirements and get back to you with clear technical guidance.
                </p>

                <ol className="mt-10 space-y-6">
                  {[
                    { icon: FileText, t: 'Share your details', d: 'Service, location and a short description.' },
                    { icon: Clock, t: 'We review the project', d: 'The team studies your requirements and photos.' },
                    { icon: ShieldCheck, t: 'Receive guidance', d: 'Get advice and a quotation discussion.' },
                  ].map((s, i) => (
                    <li key={s.t} className="group flex gap-4">
                      <div className="relative">
                        <span className="grid h-11 w-11 place-items-center border border-white/15 bg-white/5 text-amber transition-all duration-300 group-hover:border-amber group-hover:bg-amber group-hover:text-navy">
                          <s.icon className="h-5 w-5" />
                        </span>
                        {i < 2 && <span className="absolute left-1/2 top-12 h-6 w-px -translate-x-1/2 bg-white/15" />}
                      </div>
                      <div>
                        <p className="font-display text-sm font-semibold uppercase tracking-wide">
                          <span className="mr-2 text-amber">0{i + 1}</span>
                          {s.t}
                        </p>
                        <p className="mt-1 text-xs leading-relaxed text-white/55">{s.d}</p>
                      </div>
                    </li>
                  ))}
                </ol>

                <div className="mt-auto space-y-3 pt-10">
                  <a
                    href={`tel:${business.phoneDisplay}`}
                    className="group flex items-center gap-4 border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:border-amber/60 hover:bg-white/10"
                  >
                    <span className="grid h-10 w-10 place-items-center bg-amber text-navy transition-transform duration-300 group-hover:rotate-12">
                      <Phone className="h-4 w-4" />
                    </span>
                    <span className="flex flex-col">
                      <span className="text-[0.62rem] uppercase tracking-[0.2em] text-white/50">Call directly</span>
                      <span className="font-display text-base font-bold">{business.phoneDisplay}</span>
                    </span>
                    <ArrowUpRight className="ml-auto h-4 w-4 text-white/40 transition-all group-hover:rotate-45 group-hover:text-amber" />
                  </a>
                  <a
                    href={whatsappLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:border-[#25D366]/60 hover:bg-white/10"
                  >
                    <span className="grid h-10 w-10 place-items-center bg-[#25D366] text-white transition-transform duration-300 group-hover:rotate-12">
                      <MessageCircle className="h-4 w-4" />
                    </span>
                    <span className="flex flex-col">
                      <span className="text-[0.62rem] uppercase tracking-[0.2em] text-white/50">WhatsApp</span>
                      <span className="font-display text-base font-bold">{business.whatsappDisplay}</span>
                    </span>
                    <ArrowUpRight className="ml-auto h-4 w-4 text-white/40 transition-all group-hover:rotate-45 group-hover:text-[#25D366]" />
                  </a>
                </div>
              </div>
            </aside>

            {/* RIGHT - form */}
            <div className="relative p-7 sm:p-10 lg:col-span-7 xl:col-span-8 xl:p-12">
              {isSuccess ? (
                <div className="flex h-full flex-col items-center justify-center py-10 text-center">
                  <div className="relative mb-6">
                    <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/40" />
                    <div className="relative grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-[0_15px_40px_-10px_rgba(16,185,129,0.6)]">
                      <CheckCircle2 className="h-10 w-10" />
                    </div>
                  </div>
                  <h3 className="font-display text-2xl font-bold uppercase text-navy">Enquiry Details Prepared</h3>
                  <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-muted sm:text-base">
                    Thank you, <strong className="text-navy">{formData.fullName}</strong>. Your project details for{' '}
                    <strong className="text-navy">{formData.service}</strong> in{' '}
                    <strong className="text-navy">{formData.location}</strong> have been validated for demonstration.
                  </p>

                  <div className="mx-auto mt-8 max-w-xl border border-emerald-200 bg-emerald-50/60 p-6 text-left">
                    <p className="mb-2 font-display text-xs font-bold uppercase tracking-[0.18em] text-navy">
                      Optional: Forward Directly to Trusted Roofing Systems
                    </p>
                    <p className="mb-4 text-xs text-muted">
                      Open WhatsApp with your project summary prefilled for immediate review by the business owner (+233241924129).
                    </p>
                    <a
                      href={whatsappLink(generateWhatsAppMessage())}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 bg-[#25D366] px-6 py-3 font-display text-xs font-semibold uppercase tracking-[0.16em] text-white shadow-[0_10px_25px_-8px_rgba(37,211,102,0.7)] transition-all hover:-translate-y-0.5 hover:bg-emerald-600"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Send Project via WhatsApp
                    </a>
                  </div>

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
                    className="mt-8 font-display text-xs font-semibold uppercase tracking-[0.2em] text-muted underline hover:text-navy"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-7">
                  {/* Step header */}
                  <div className="flex items-center gap-3">
                    <span className="grid h-8 w-8 place-items-center bg-blue font-display text-xs font-bold text-white">01</span>
                    <p className="font-display text-sm font-bold uppercase tracking-[0.18em] text-navy">Your Details</p>
                    <span className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent" />
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <IconField id="fullName" label="Full Name" required icon={User} error={errors.fullName}>
                      <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="e.g. Kwame Mensah" className={inputCls} aria-invalid={!!errors.fullName} />
                    </IconField>
                    <IconField id="phone" label="Phone Number" required icon={Phone} error={errors.phone}>
                      <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="e.g. 0241924129" className={inputCls} aria-invalid={!!errors.phone} />
                    </IconField>
                    <IconField id="email" label="Email Address" required icon={Mail} error={errors.email}>
                      <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="e.g. client@example.com" className={inputCls} aria-invalid={!!errors.email} />
                    </IconField>
                    <IconField id="companyName" label="Company / Organization" optional icon={Building2}>
                      <input type="text" id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} placeholder="e.g. Mensah Real Estate" className={inputCls} />
                    </IconField>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <span className="grid h-8 w-8 place-items-center bg-amber font-display text-xs font-bold text-navy">02</span>
                    <p className="font-display text-sm font-bold uppercase tracking-[0.18em] text-navy">Project Details</p>
                    <span className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent" />
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <IconField id="service" label="Service Required" required icon={Wrench} error={errors.service} select>
                      <select id="service" name="service" value={formData.service} onChange={handleChange} className={`${inputCls} appearance-none pr-10`} aria-invalid={!!errors.service}>
                        <option value="">Select Service Required</option>
                        {serviceOptions.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </IconField>
                    <IconField id="projectType" label="Project Type" required icon={Briefcase} error={errors.projectType} select>
                      <select id="projectType" name="projectType" value={formData.projectType} onChange={handleChange} className={`${inputCls} appearance-none pr-10`} aria-invalid={!!errors.projectType}>
                        <option value="">Select Project Type</option>
                        {projectTypeOptions.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </IconField>
                  </div>

                  <IconField id="location" label="Project Location (City / Town in Ghana)" required icon={MapPin} error={errors.location}>
                    <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} placeholder="e.g. Accra, Kumasi, Tema, Takoradi" className={inputCls} aria-invalid={!!errors.location} />
                  </IconField>

                  <IconField id="description" label="Project Description & Details" required icon={FileText} error={errors.description} textarea>
                    <textarea
                      id="description"
                      name="description"
                      rows={5}
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Describe your roof requirements, building dimensions, preferred materials, or current issues..."
                      className={`${inputCls} resize-none pt-3.5`}
                      aria-invalid={!!errors.description}
                    />
                  </IconField>

                  {/* Upload */}
                  <div>
                    <label className="mb-2 block font-display text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-navy">
                      Attach Building Plan or Photo <span className="font-normal text-muted/70">(Optional, max 10MB)</span>
                    </label>
                    <div className="group relative overflow-hidden border-2 border-dashed border-slate-200 bg-slate-50/60 p-6 text-center transition-all duration-300 hover:border-blue hover:bg-blue/[0.03]">
                      <input
                        type="file"
                        id="projectImage"
                        accept=".jpg,.jpeg,.png,.webp"
                        onChange={handleFileChange}
                        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                      />
                      <span className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-white text-blue shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-blue group-hover:text-white">
                        <Upload className="h-5 w-5" />
                      </span>
                      <p className="text-sm font-medium text-navy">
                        {file ? file.name : (<><span className="text-blue">Click to upload</span> or drag photo / drawing here</>)}
                      </p>
                      <p className="mt-1 text-[0.68rem] text-muted">JPG, PNG, WEBP up to 10MB</p>
                    </div>
                    {errors.file && <p className="mt-1.5 text-xs text-red-500">{errors.file}</p>}
                  </div>

                  {/* Submit row */}
                  <div className="flex flex-col gap-5 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <p className="flex items-start gap-2 text-xs leading-relaxed text-muted sm:max-w-xs">
                      <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-blue" />
                      Frontend demo: inputs are validated in the browser and not stored in any database.
                    </p>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative inline-flex h-14 items-center justify-center gap-3 overflow-hidden bg-navy px-8 font-display text-xs font-bold uppercase tracking-[0.18em] text-white shadow-[0_18px_40px_-12px_rgba(16,29,58,0.55)] transition-all duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-blue to-blue-600 transition-transform duration-500 ease-out group-hover:translate-x-0" aria-hidden />
                      <span className="relative">{isSubmitting ? 'Validating Enquiry...' : 'Submit Roofing Enquiry'}</span>
                      <span className="relative grid h-8 w-8 place-items-center bg-amber text-navy transition-transform duration-300 group-hover:rotate-[-12deg] group-hover:scale-110">
                        <Send className="h-4 w-4" />
                      </span>
                    </button>
                  </div>
                </form>
              )}
            </div>
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
    </>
  );
}
