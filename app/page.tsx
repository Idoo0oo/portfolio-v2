'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from 'sonner';

import dynamic from 'next/dynamic';

import BootScreen from '../src/components/os/BootScreen';
import Desktop from '../src/components/os/Desktop';
import Window from '../src/components/os/Window';

import { useOSStore } from '../src/core/store/useOSStore';
import { useSound } from '../src/core/hooks/useSound';

const WindowLoading = () => (
  <div className="flex flex-col items-center justify-center h-full w-full min-h-[300px] gap-2">
    <div className="w-6 h-6 border-2 border-[var(--color-accent)]/30 border-t-[var(--color-accent)] rounded-full animate-spin" />
    <span className="text-[11px] font-mono text-white/40 tracking-wider">Loading...</span>
  </div>
);

const Terminal = dynamic(() => import('../src/components/os/Terminal'), { loading: WindowLoading });
const AboutThisMac = dynamic(() => import('../src/components/os/AboutThisMac'), { loading: WindowLoading });
const Finder = dynamic(() => import('../src/components/os/Finder'), { loading: WindowLoading });
const Notes = dynamic(() => import('../src/components/os/Notes'), { loading: WindowLoading });
const Mail = dynamic(() => import('../src/components/os/Mail'), { loading: WindowLoading });
const Preview = dynamic(() => import('../src/components/os/Preview'), { loading: WindowLoading });
const Settings = dynamic(() => import('../src/components/os/Settings'), { loading: WindowLoading });
const Spotlight = dynamic(() => import('../src/components/os/Spotlight'), { ssr: false });
const MobileOS = dynamic(() => import('../src/components/mobile/MobileOS'), { ssr: false });

export default function Home() {
  const { isBooted, isDarkMode, openApps, toggleSpotlight, accentColor } = useOSStore();
  const { playSound } = useSound();

  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode, mounted]);

  // Sync Accent Color to CSS Variables
  useEffect(() => {
    if (!mounted) return;
    document.documentElement.style.setProperty('--color-accent', accentColor);
    document.documentElement.style.setProperty('--color-accent-glow', `${accentColor}33`);
  }, [accentColor, mounted]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        toggleSpotlight();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleSpotlight]);

  useEffect(() => {
    if (isMobile) return;
    const handleGlobalClick = () => {
      playSound('click', 0.4);
    };

    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, [playSound, isMobile]);

  useEffect(() => {
    if (isBooted && !isMobile) {
      playSound('chime', 0.8);
    }
  }, [isBooted, playSound, isMobile]);

  const renderAppContent = (id: string) => {
    switch (id) {
      case 'terminal':
        return <Terminal />;
      case 'about':
        return <AboutThisMac />;
      case 'projects':
        return <Finder />;
      case 'experience':
        return <Notes />;
      case 'contact':
        return <Mail />;
      case 'preview':
        return <Preview />;
      case 'settings':
        return <Settings />;
      default:
        return null;
    }
  };

  const getAppTitle = (id: string) => {
    switch (id) {
      case 'terminal':
        return 'terminal — zsh — 80×24';
      case 'about':
        return 'About Me';
      case 'projects':
        return 'Projects — Finder';
      case 'experience':
        return 'Notes — Experience';
      case 'contact':
        return 'Mail — Compose New';
      case 'preview':
        return 'Preview — cv-muhammad-ditto.pdf';
      default:
        return id.charAt(0).toUpperCase() + id.slice(1);
    }
  };

  if (!mounted) {
    return <div className="h-screen w-full bg-black overflow-hidden select-none" />;
  }

  if (isMobile) {
    return <MobileOS />;
  }

  return (
    <div className="h-screen w-full bg-black overflow-hidden select-none">
      <Toaster position="bottom-right" theme={isDarkMode ? 'dark' : 'light'} />

      {/* Spotlight Overlay */}
      <Spotlight />

      <AnimatePresence mode="wait">
        {!isBooted ? (
          <BootScreen key="boot" />
        ) : (
          <motion.div
            key="desktop-v2"
            initial={{ opacity: 0, filter: 'blur(20px)', scale: 0.98 }}
            animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
            transition={{
              duration: 2.5,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.3,
            }}
            className="h-full w-full"
          >
            <Desktop key="desktop">
              {openApps.map((appId) => (
                <Window key={appId} id={appId} title={getAppTitle(appId)}>
                  {renderAppContent(appId)}
                </Window>
              ))}
            </Desktop>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
