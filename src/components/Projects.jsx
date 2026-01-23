import { Shield, ExternalLink, Github } from 'lucide-react';

const Projects = ({ projects, onProjectClick }) => {
  // Group projects by category
  const categories = {
    'Security Engineering': projects.filter(p => p.category === 'Security Engineering'),
    'Application Development': projects.filter(p => p.category === 'Application Development'),
    'Risk Management': projects.filter(p => p.category === 'Risk Management'),
    'Security Tooling': projects.filter(p => p.category === 'Security Tooling')
  };

  return (
    <section id="projects" className="container mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold mb-8 flex items-center space-x-3">
        <Shield className="w-8 h-8 text-cyan-400" />
        <span>Portfolio Projects</span>
      </h2>

      {Object.entries(categories).map(([categoryName, categoryProjects]) => {
        if (categoryProjects.length === 0) return null;

        return (
          <div key={categoryName} className="mb-12">
            <h3 className="text-2xl font-bold mb-6 text-cyan-400">{categoryName}</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryProjects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => onProjectClick(project)}
                  className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-cyan-500/50 transition-all text-left group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h4 className="text-lg font-bold group-hover:text-cyan-400 transition-colors mb-2">
                        {project.name}
                      </h4>
                    </div>
                    <div className="flex space-x-2 ml-2">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-slate-400 hover:text-cyan-400 transition-colors"
                          title="View on GitHub"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-slate-400 hover:text-cyan-400 transition-colors"
                          title="View live"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-slate-400 mb-4 line-clamp-3">
                    {project.objective}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.skills.slice(0, 3).map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded text-xs text-cyan-400"
                      >
                        {skill}
                      </span>
                    ))}
                    {project.skills.length > 3 && (
                      <span className="px-2 py-1 text-xs text-slate-500">
                        +{project.skills.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="mt-4 text-sm text-cyan-400 group-hover:text-cyan-300 transition-colors flex items-center space-x-1">
                    <span>View Details</span>
                    <span>→</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default Projects;
