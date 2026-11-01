import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';

// Code-split pages for performance
const Home = lazy(() => import('./pages/Home').then((m) => ({ default: m.Home })));
const About = lazy(() => import('./pages/About').then((m) => ({ default: m.About })));
const Services = lazy(() => import('./pages/Services').then((m) => ({ default: m.Services })));
const Projects = lazy(() => import('./pages/Projects').then((m) => ({ default: m.Projects })));
const Contact = lazy(() => import('./pages/Contact').then((m) => ({ default: m.Contact })));

function PageLoader() {
  return (
    <div className="min-h-screen bg-navy flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 border-2 border-amber border-t-transparent animate-spin" />
        <span className="font-display text-xs uppercase tracking-[0.25em] text-white/70">
          Loading Trusted Roofing Systems...
        </span>
      </div>
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="services" element={<Services />} />
            <Route path="projects" element={<Projects />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
