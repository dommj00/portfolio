import { Mail, Linkedin, Github } from 'lucide-react';

const Contact = ({ personalInfo }) => {
  return (
    <section id="contact" className="container mx-auto px-6 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Get In Touch</h2>
        <div className="flex justify-center flex-wrap gap-4">
          <a
            href={`mailto:${personalInfo.email}`}
            className="flex items-center space-x-2 px-6 py-3 bg-slate-800 border border-slate-700 rounded-lg hover:border-cyan-500 transition-colors"
          >
            <Mail className="w-5 h-5" />
            <span>Email</span>
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 px-6 py-3 bg-slate-800 border border-slate-700 rounded-lg hover:border-cyan-500 transition-colors"
          >
            <Linkedin className="w-5 h-5" />
            <span>LinkedIn</span>
          </a>
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 px-6 py-3 bg-slate-800 border border-slate-700 rounded-lg hover:border-cyan-500 transition-colors"
          >
            <Github className="w-5 h-5" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
