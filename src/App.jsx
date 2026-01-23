import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Certifications from './components/Certifications';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import ProjectModal from './components/ProjectModal';
import portfolioData from './data/portfolio.json';

function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openProject = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Delay clearing project to allow modal close animation
    setTimeout(() => setSelectedProject(null), 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100">
      <Header personalInfo={portfolioData.personal} />
      <Hero personalInfo={portfolioData.personal} />
      <Certifications certifications={portfolioData.certifications} />
      <Projects projects={portfolioData.projects} onProjectClick={openProject} />
      <Education />
      <Contact personalInfo={portfolioData.personal} />
      
      <footer className="border-t border-slate-700 py-8">
        <div className="container mx-auto px-6 text-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} {portfolioData.personal.name}. All rights reserved.</p>
        </div>
      </footer>

      <ProjectModal 
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
}

export default App;
