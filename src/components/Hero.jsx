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
              I am a Security Engineer with eight total years of IT experience. My IT background is vast and diverse, but it has a signature: identify a problem, draft solutions, then determine the most effective way to implement the ones best suited to each situation.            
            </p>
            <p>
              At this stage in my career, the challenge of conducting deep investigations and drawing solutions is especially important. This not only translates to Analyst work, but it also holds weight when engineering solutions that may be multi-part or direct, depending on the problem and client needs.
            </p>
            <p>
              My project work highlights a genuine intrigue within the IT and security field. I’ve researched different types of projects that contribute to skill building in the security space, as well as recreated and anonymized complex scenarios at my day job, then re-solved them in my lab environment with the flexibility to test freely.                        
            </p>
            <p>
               look forward to the next phase in my career where I can continue to apply analytical and engineering skills through more complex challenges. 
            </p>
            </div>
          {/* Core Competencies - 1/3 width */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4 text-cyan-400">Specializations</h3>
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
