import { GraduationCap, Award } from 'lucide-react';

const Education = () => {
  return (
    <section id="education" className="container mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold mb-8 flex items-center space-x-3">
        <GraduationCap className="w-8 h-8 text-cyan-400" />
        <span>Education</span>
      </h2>
      <div className="grid md:grid-cols-2 gap-8">
        {/* WGU */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 hover:border-cyan-500/50 transition-all">
          <h3 className="text-2xl font-bold mb-2">Bachelor of Science in Cybersecurity</h3>
          <p className="text-cyan-400 mb-4">Western Governors University</p>
          
          <p className="font-semibold mb-2">Relevant Coursework:</p>
          <ul className="space-y-1 text-slate-300 mb-6">
            <li className="flex items-start space-x-2">
              <span className="text-cyan-400 mt-1">•</span>
              <span>Managing Information Security</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-cyan-400 mt-1">•</span>
              <span>Managing Cloud Security</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-cyan-400 mt-1">•</span>
              <span>Cyber Defense & Countermeasures</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-cyan-400 mt-1">•</span>
              <span>Information Systems Security</span>
            </li>
          </ul>

          <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Award className="w-5 h-5 text-cyan-400" />
              <span className="font-semibold text-cyan-400">Excellence Award</span>
            </div>
            <p className="text-sm text-slate-300">
              Received Excellence Award for paper on Managing Information Security
            </p>
          </div>
        </div>

        {/* Wake Tech */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 hover:border-cyan-500/50 transition-all">
          <h3 className="text-2xl font-bold mb-2">Associates of Science</h3>
          <p className="text-cyan-400 mb-6">Wake Technical Community College</p>

          <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Award className="w-5 h-5 text-cyan-400" />
              <span className="font-semibold text-cyan-400">Vice President</span>
            </div>
            <p className="text-sm text-slate-300">
              Vice President of Engineering Club
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
