import { Shield } from 'lucide-react';

const Header = ({ personalInfo }) => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="border-b border-cyan-500/30 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <Shield className="w-8 h-8 text-cyan-400" />
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {personalInfo.name}
            </span>
          </button>
          <div className="flex space-x-6 text-sm">
            <button onClick={() => scrollToSection('about')} className="hover:text-cyan-400 transition-colors">
              About
            </button>
            <button onClick={() => scrollToSection('certs')} className="hover:text-cyan-400 transition-colors">
              Certifications
            </button>
            <button onClick={() => scrollToSection('projects')} className="hover:text-cyan-400 transition-colors">
              Projects
            </button>
            <button onClick={() => scrollToSection('education')} className="hover:text-cyan-400 transition-colors">
              Education
            </button>
            <button onClick={() => scrollToSection('contact')} className="hover:text-cyan-400 transition-colors">
              Contact
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
