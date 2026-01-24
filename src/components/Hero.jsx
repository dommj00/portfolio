import { Shield } from 'lucide-react';

const Hero = ({ personalInfo }) => {
  return (
    <section className="relative py-20 px-6">
      {/* Hero Header */}
      <div className="container mx-auto max-w-6xl text-center mb-16">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
            <Shield className="w-10 h-10 text-white" />
          </div>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          {personalInfo.name}
        </h1>
        <h2 className="text-2xl md:text-3xl text-cyan-400 mb-4">
          {personalInfo.title}
        </h2>
        <p className="text-xl text-slate-300">
          {personalInfo.tagline}
        </p>
      </div>

      {/* About Section */}
      <div id="about" className="container mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold mb-8 flex items-center space-x-3">
          <Shield className="w-8 h-8 text-cyan-400" />
          <span>About Me</span>
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Experience Text - 2/3 width */}
          <div className="md:col-span-2 space-y-4 text-slate-300 leading-relaxed">
            <p>
              I'm a cybersecurity professional with eight years of IT experience, currently working as a Solutions Engineer while transitioning into dedicated security roles. My background spans mobile device repair, video conferencing support, and MSP work, which has given me a comprehensive understanding of IT operations from the ground up.
            </p>
            
            <p>
              What drives me is the challenge of translating complex security frameworks into practical, implementable solutions. I specialize in Zero Trust Architecture, cloud identity security, and governance initiatives that balance security requirements with operational efficiency. While my background includes secure application development, my focus is on implementing enterprise security infrastructure, managing identity and access systems, and operationalizing security frameworks across production environments.
            </p>
            
            <p>
              I'm particularly interested in IT cybersecurity roles where I can leverage my hands-on experience with identity and access management, vulnerability assessment, and compliance frameworks. I believe in continuous learning and regularly work on lab projects to expand my practical skillset beyond what my current role provides.
            </p>
          </div>

          {/* Core Competencies - 1/3 width */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4 text-cyan-400">Core Competencies</h3>
            <ul className="space-y-2 text-slate-300">
              <li className="flex items-start space-x-2">
                <span className="text-cyan-400 mt-1">•</span>
                <span>Identity & Access Management</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-cyan-400 mt-1">•</span>
                <span>Zero Trust Architecture</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-cyan-400 mt-1">•</span>
                <span>Vulnerability Management</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-cyan-400 mt-1">•</span>
                <span>Cloud Security (Azure, GCP)</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-cyan-400 mt-1">•</span>
                <span>SIEM/SOAR Implementation</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-cyan-400 mt-1">•</span>
                <span>Risk Assessment & GRC</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-cyan-400 mt-1">•</span>
                <span>Application Security</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-cyan-400 mt-1">•</span>
                <span>Security Automation</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
