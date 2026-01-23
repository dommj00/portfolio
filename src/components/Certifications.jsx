import { Award } from 'lucide-react';

const Certifications = ({ certifications }) => {
  return (
    <section id="certs" className="container mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold mb-8 flex items-center space-x-3">
        <Award className="w-8 h-8 text-cyan-400" />
        <span>Certifications</span>
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {certifications.map((cert, index) => (
          <div
            key={index}
            className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-cyan-500/50 transition-all flex flex-col items-center text-center group"
          >
            {cert.image ? (
              <img
                src={cert.image}
                alt={cert.name}
                className="w-20 h-20 mb-4 object-contain group-hover:scale-110 transition-transform"
              />
            ) : (
              <div className="w-20 h-20 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Award className="w-10 h-10 text-cyan-400" />
              </div>
            )}
            <h3 className="font-bold text-sm mb-2">{cert.name}</h3>
            <p className="text-xs text-slate-400">
              {cert.issuer} • {cert.year}
            </p>
            {cert.inProgress && (
              <span className="mt-2 px-2 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded text-xs text-cyan-400">
                In Progress
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Certifications;
