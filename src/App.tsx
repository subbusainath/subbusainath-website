import { useEffect, useState, useCallback, useRef } from 'react';
import Hero from '@/Pages/Hero'; // Import the Hero component
import About from '@/Pages/About'; // Import the About component
import ExpertisePage from '@/Pages/ExpertisePage'; // Import the ExpertisePage component
import ContactMe from '@/Pages/ContactMe'; // Import the ContactMe component
import { ThemeProvider, useTheme } from './components/Hooks/themeHook'; // Assuming ThemeProvider is here
import NotificationProvider, { useNotification } from './contexts/NotificationContext';
import HelpModal from './components/HelpModal'; // Import HelpModal
import { HelpCircle } from 'lucide-react'; // Icon for the help button

// Define available pages
type PageName = 'hero' | 'about' | 'expertise' | 'contact'; // Added 'contact'

// Helper to get page name from hash
const getPageNameFromHash = (hash: string): PageName => {
  const routeMap: Record<string, PageName> = {
    '#about': 'about',
    '#expertise': 'expertise',
    '#contact': 'contact', // Added contact route
  };
  return routeMap[hash] || 'hero'; // Default to 'hero' if no match
};

const App = () => {
  const { toggleTheme, theme } = useTheme();
  const { showNotification } = useNotification();

  // Initialize currentPage from current hash or default to 'hero'
  const [currentPage, setCurrentPage] = useState<PageName>(() => getPageNameFromHash(window.location.hash));

  // Theme toggle shortcut state
  const [shiftAndFirstTPressed, setShiftAndFirstTPressed] = useState(false);
  const themeSequenceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // About page navigation shortcut state
  const [shiftAndFirstAPressed, setShiftAndFirstAPressed] = useState(false);
  const aboutNavSequenceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Hero page navigation shortcut state
  const [shiftAndFirstHPressed, setShiftAndFirstHPressed] = useState(false);
  const heroNavSequenceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // ADDED: Expertise page navigation shortcut state
  const [shiftAndFirstEPressed, setShiftAndFirstEPressed] = useState(false);
  const expertiseNavSequenceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // ADDED: Contact page navigation shortcut state
  const [shiftAndFirstCPressed, setShiftAndFirstCPressed] = useState(false);
  const contactNavSequenceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // State for Help Modal
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

  // Ref for the scroll timeout
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Effect to update URL hash when currentPage changes
  useEffect(() => {
    let newHash = '';
    if (currentPage === 'about') newHash = 'about';
    else if (currentPage === 'expertise') newHash = 'expertise';
    else if (currentPage === 'contact') newHash = 'contact'; // Added for contact
    // No 'hero' in hash, it's the default if hash is empty or unrecognized

    if (window.location.hash.substring(1) !== newHash) {
      window.location.hash = newHash;
    }
  }, [currentPage]);

  // Effect to handle browser back/forward navigation
  useEffect(() => {
    const handleHashChange = () => {
      const newPage = getPageNameFromHash(window.location.hash);
      setCurrentPage(newPage);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Effect to add 'is-scrolling' class to body when user scrolls, remove after inactivity
  useEffect(() => {
    const handleScroll = () => {
      document.body.classList.add('is-scrolling');

      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Set new timeout to remove class after 1.5 seconds of no scrolling
      scrollTimeoutRef.current = setTimeout(() => {
        document.body.classList.remove('is-scrolling');
      }, 1500);
    };

    const handleMouseLeave = () => {
      // Immediately remove scrolling class when mouse leaves the page
      document.body.classList.remove('is-scrolling');
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = null;
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const openHelpModal = useCallback(() => setIsHelpModalOpen(true), []);
  const closeHelpModal = useCallback(() => setIsHelpModalOpen(false), []);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    // Prevent shortcuts if interacting with input fields, textareas, etc.
    const targetElement = event.target as HTMLElement;
    if (targetElement.tagName === 'INPUT' || targetElement.tagName === 'TEXTAREA' || targetElement.isContentEditable) {
      if (event.key === 'Escape' && isHelpModalOpen) closeHelpModal();
      return;
    }

    if (event.key === 'Escape' && isHelpModalOpen) {
      closeHelpModal();
      return;
    }

    if (event.shiftKey && event.key === '?') {
      event.preventDefault();
      if (isHelpModalOpen) {
        closeHelpModal();
      } else {
        openHelpModal();
      }
      return;
    }

    // Theme Toggle: Shift + T then T
    if (shiftAndFirstTPressed) {
      if (event.key.toLowerCase() === 't') {
        event.preventDefault();
        toggleTheme();
        const newThemeName = theme.name === 'light' ? 'Dark' : 'Light';
        showNotification({
          message: `Theme toggled to ${newThemeName}.`,
          type: 'info',
          duration: 2000
        });
        setShiftAndFirstTPressed(false);
        if (themeSequenceTimeoutRef.current) clearTimeout(themeSequenceTimeoutRef.current);
        themeSequenceTimeoutRef.current = null;
      } else {
        setShiftAndFirstTPressed(false);
        if (themeSequenceTimeoutRef.current) clearTimeout(themeSequenceTimeoutRef.current);
        themeSequenceTimeoutRef.current = null;
      }
    } else if (event.shiftKey && event.key.toLowerCase() === 't' && !shiftAndFirstAPressed && !shiftAndFirstHPressed && !shiftAndFirstEPressed && !shiftAndFirstCPressed) {
      event.preventDefault();
      setShiftAndFirstTPressed(true);
      if (themeSequenceTimeoutRef.current) clearTimeout(themeSequenceTimeoutRef.current);
      themeSequenceTimeoutRef.current = setTimeout(() => {
        setShiftAndFirstTPressed(false);
        themeSequenceTimeoutRef.current = null;
      }, 750);
    }

    // Navigate to About: Shift + A then A
    else if (shiftAndFirstAPressed) {
      if (event.key.toLowerCase() === 'a') {
        event.preventDefault();
        setCurrentPage('about');
        showNotification({ message: 'Navigated to About Page.', type: 'info', duration: 2000 });
        setShiftAndFirstAPressed(false);
        if (aboutNavSequenceTimeoutRef.current) clearTimeout(aboutNavSequenceTimeoutRef.current);
        aboutNavSequenceTimeoutRef.current = null;
      } else {
        setShiftAndFirstAPressed(false);
        if (aboutNavSequenceTimeoutRef.current) clearTimeout(aboutNavSequenceTimeoutRef.current);
        aboutNavSequenceTimeoutRef.current = null;
      }
    } else if (event.shiftKey && event.key.toLowerCase() === 'a' && !shiftAndFirstTPressed && !shiftAndFirstHPressed && !shiftAndFirstEPressed && !shiftAndFirstCPressed) {
      event.preventDefault();
      setShiftAndFirstAPressed(true);
      if (aboutNavSequenceTimeoutRef.current) clearTimeout(aboutNavSequenceTimeoutRef.current);
      aboutNavSequenceTimeoutRef.current = setTimeout(() => {
        setShiftAndFirstAPressed(false);
        aboutNavSequenceTimeoutRef.current = null;
      }, 750);
    }

    // Navigate to Hero: Shift + H then H
    else if (shiftAndFirstHPressed) {
      if (event.key.toLowerCase() === 'h') {
        event.preventDefault();
        setCurrentPage('hero');
        showNotification({ message: 'Navigated to Hero Page.', type: 'info', duration: 2000 });
        setShiftAndFirstHPressed(false);
        if (heroNavSequenceTimeoutRef.current) clearTimeout(heroNavSequenceTimeoutRef.current);
        heroNavSequenceTimeoutRef.current = null;
      } else {
        setShiftAndFirstHPressed(false);
        if (heroNavSequenceTimeoutRef.current) clearTimeout(heroNavSequenceTimeoutRef.current);
        heroNavSequenceTimeoutRef.current = null;
      }
    } else if (event.shiftKey && event.key.toLowerCase() === 'h' && !shiftAndFirstTPressed && !shiftAndFirstAPressed && !shiftAndFirstEPressed && !shiftAndFirstCPressed) {
      event.preventDefault();
      setShiftAndFirstHPressed(true);
      if (heroNavSequenceTimeoutRef.current) clearTimeout(heroNavSequenceTimeoutRef.current);
      heroNavSequenceTimeoutRef.current = setTimeout(() => {
        setShiftAndFirstHPressed(false);
        heroNavSequenceTimeoutRef.current = null;
      }, 750);
    }

    // Navigate to Expertise: Shift + E then E
    else if (shiftAndFirstEPressed) {
      if (event.key.toLowerCase() === 'e') {
        event.preventDefault();
        setCurrentPage('expertise');
        showNotification({ message: 'Navigated to Expertise Page.', type: 'info', duration: 2000 });
        setShiftAndFirstEPressed(false);
        if (expertiseNavSequenceTimeoutRef.current) clearTimeout(expertiseNavSequenceTimeoutRef.current);
        expertiseNavSequenceTimeoutRef.current = null;
      } else {
        setShiftAndFirstEPressed(false);
        if (expertiseNavSequenceTimeoutRef.current) clearTimeout(expertiseNavSequenceTimeoutRef.current);
        expertiseNavSequenceTimeoutRef.current = null;
      }
    } else if (event.shiftKey && event.key.toLowerCase() === 'e' && !shiftAndFirstTPressed && !shiftAndFirstAPressed && !shiftAndFirstHPressed && !shiftAndFirstCPressed) {
      event.preventDefault();
      setShiftAndFirstEPressed(true);
      if (expertiseNavSequenceTimeoutRef.current) clearTimeout(expertiseNavSequenceTimeoutRef.current);
      expertiseNavSequenceTimeoutRef.current = setTimeout(() => {
        setShiftAndFirstEPressed(false);
        expertiseNavSequenceTimeoutRef.current = null;
      }, 750);
    }

    // ADDED: Navigate to Contact: Shift + C then C
    else if (shiftAndFirstCPressed) {
      if (event.key.toLowerCase() === 'c') {
        event.preventDefault();
        setCurrentPage('contact');
        showNotification({ message: 'Navigated to Contact Page.', type: 'info', duration: 2000 });
        setShiftAndFirstCPressed(false);
        if (contactNavSequenceTimeoutRef.current) clearTimeout(contactNavSequenceTimeoutRef.current);
        contactNavSequenceTimeoutRef.current = null;
      } else {
        setShiftAndFirstCPressed(false);
        if (contactNavSequenceTimeoutRef.current) clearTimeout(contactNavSequenceTimeoutRef.current);
        contactNavSequenceTimeoutRef.current = null;
      }
    } else if (event.shiftKey && event.key.toLowerCase() === 'c' && !shiftAndFirstTPressed && !shiftAndFirstAPressed && !shiftAndFirstHPressed && !shiftAndFirstEPressed) {
      event.preventDefault();
      setShiftAndFirstCPressed(true);
      if (contactNavSequenceTimeoutRef.current) clearTimeout(contactNavSequenceTimeoutRef.current);
      contactNavSequenceTimeoutRef.current = setTimeout(() => {
        setShiftAndFirstCPressed(false);
        contactNavSequenceTimeoutRef.current = null;
      }, 750);
    }

  }, [theme, toggleTheme, showNotification, shiftAndFirstTPressed, shiftAndFirstAPressed, shiftAndFirstHPressed, shiftAndFirstEPressed, shiftAndFirstCPressed, isHelpModalOpen, openHelpModal, closeHelpModal]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (themeSequenceTimeoutRef.current) clearTimeout(themeSequenceTimeoutRef.current);
      if (aboutNavSequenceTimeoutRef.current) clearTimeout(aboutNavSequenceTimeoutRef.current);
      if (heroNavSequenceTimeoutRef.current) clearTimeout(heroNavSequenceTimeoutRef.current);
      if (expertiseNavSequenceTimeoutRef.current) clearTimeout(expertiseNavSequenceTimeoutRef.current);
      if (contactNavSequenceTimeoutRef.current) clearTimeout(contactNavSequenceTimeoutRef.current); // Added cleanup
    };
  }, [handleKeyDown]);

  // Render current page
  const renderPage = () => {
    switch (currentPage) {
      case 'hero':
        return <Hero onNavigateToContact={() => setCurrentPage('contact')} />;
      case 'about':
        return <About />;
      case 'expertise':
        return <ExpertisePage />;
      case 'contact':
        return <ContactMe />;
      default:
        return <Hero onNavigateToContact={() => setCurrentPage('contact')} />;
    }
  };

  return (
    <>
      {renderPage()}
      <button
        onClick={openHelpModal}
        className={`fixed bottom-6 right-6 p-3 rounded-full shadow-lg transition-all duration-200 ease-in-out hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 \
                     ${theme.buttons.primary.background} \
                     ${theme.buttons.primary.text} \
                     ${theme.buttons.primary.hoverBackground} \
                     ${theme.name === 'light' ? 'focus:ring-indigo-500 focus:ring-offset-white' : 'focus:ring-indigo-400 focus:ring-offset-slate-800'}`}
        aria-label="Open keyboard shortcuts help"
        title="Keyboard Shortcuts (?)"
      >
        <HelpCircle size={24} />
      </button>
      <HelpModal isOpen={isHelpModalOpen} onClose={closeHelpModal} />
    </>
  );
};

// It's important to have ThemeProvider wrap NotificationProvider if notifications might use theme colors,
// or vice-versa. For now, placing NotificationProvider inside ThemeProvider.
const RootApp = () => {
  return (
    <ThemeProvider>      {/* Ensure ThemeProvider is available */}
      <NotificationProvider>
        <App />
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default RootApp;