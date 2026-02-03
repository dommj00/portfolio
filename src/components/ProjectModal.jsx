import { useState, useEffect } from 'react';
import { X, ArrowLeft, Shield, Code, Wrench, Award, FileText, CheckCircle, BookMarked, Download, File } from 'lucide-react';
import * as XLSX from 'xlsx';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const ProjectModal = ({ project, isOpen, onClose }) => {
  const [view, setView] = useState('project'); // 'project' or 'artifact'
  const [selectedArtifact, setSelectedArtifact] = useState(null);
  const [spreadsheetData, setSpreadsheetData] = useState(null);
  const [allSheets, setAllSheets] = useState([]);
  const [activeSheet, setActiveSheet] = useState(0);
  const [markdownContent, setMarkdownContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isOpen) {
      setView('project');
      setSelectedArtifact(null);
      setSpreadsheetData(null);
      setAllSheets([]);
      setMarkdownContent('');
      setError(null);
    }
  }, [isOpen]);

  // Load artifact when selected
  useEffect(() => {
    if (!selectedArtifact) return;

    const fileType = selectedArtifact.fileType;

    if (fileType === 'xlsx' || fileType === 'csv') {
      loadSpreadsheet();
    } else if (fileType === 'md') {
      loadMarkdown();
    }
  }, [selectedArtifact]);

  const loadSpreadsheet = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(selectedArtifact.fileUrl);
      if (!response.ok) throw new Error(`File not found: ${selectedArtifact.fileUrl}`);
      
      const arrayBuffer = await response.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });
      
      if (selectedArtifact.fileType === 'xlsx') {
        const sheets = workbook.SheetNames.map(sheetName => ({
          name: sheetName,
          data: XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1, defval: '' })
        }));
        setAllSheets(sheets);
        setSpreadsheetData(sheets[0].data);
      } else {
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1, defval: '' });
        setSpreadsheetData(jsonData);
        setAllSheets([{ name: 'Sheet1', data: jsonData }]);
      }
      
      setActiveSheet(0);
      setIsLoading(false);
    } catch (err) {
      console.error('Error loading spreadsheet:', err);
      setError(err.message);
      setIsLoading(false);
    }
  };

  const loadMarkdown = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(selectedArtifact.fileUrl);
      if (!response.ok) throw new Error(`File not found: ${selectedArtifact.fileUrl}`);
      
      const text = await response.text();
      setMarkdownContent(text);
      setIsLoading(false);
    } catch (err) {
      console.error('Error loading markdown:', err);
      setError(err.message);
      setIsLoading(false);
    }
  };

  const handleSheetChange = (index) => {
    setActiveSheet(index);
    setSpreadsheetData(allSheets[index].data);
  };

  const openArtifact = (artifact) => {
    setSelectedArtifact(artifact);
    setView('artifact');
  };

  const backToProject = () => {
    setView('project');
    setSelectedArtifact(null);
    setSpreadsheetData(null);
    setAllSheets([]);
    setMarkdownContent('');
    setError(null);
  };

  const renderArtifactContent = () => {
    if (!selectedArtifact) return null;

    const fileType = selectedArtifact.fileType;

    // Spreadsheet view
    if (fileType === 'xlsx' || fileType === 'csv') {
      if (isLoading) {
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4"></div>
              <p className="text-slate-400">Loading {selectedArtifact.name}...</p>
            </div>
          </div>
        );
      }

      if (error) {
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <File className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <p className="text-red-500 font-semibold mb-2">Error Loading File</p>
              <p className="text-slate-400 text-sm mb-2">{error}</p>
              <p className="text-slate-500 text-xs mt-4">Expected path: {selectedArtifact.fileUrl}</p>
            </div>
          </div>
        );
      }

      if (!spreadsheetData || spreadsheetData.length === 0) {
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <File className="w-16 h-16 text-slate-500 mx-auto mb-4" />
              <p className="text-slate-400">Spreadsheet is empty</p>
            </div>
          </div>
        );
      }

      const headers = spreadsheetData[0] || [];
      const dataRows = spreadsheetData.slice(1);

      return (
        <div className="h-full overflow-auto bg-white">
          <div className="p-6">
            <div className="mb-4">
              <p className="text-sm text-slate-600 font-semibold mb-2">
                {selectedArtifact.name} • {dataRows.length} rows × {headers.length} columns
              </p>
            </div>

            {/* Sheet Tabs */}
            {fileType === 'xlsx' && allSheets.length > 1 && (
              <div className="mb-4 flex items-center space-x-2 overflow-x-auto pb-2">
                <span className="text-xs text-slate-600 font-semibold mr-2">Sheets:</span>
                {allSheets.map((sheet, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSheetChange(idx)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                      activeSheet === idx
                        ? 'bg-cyan-500 text-white shadow-md'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {sheet.name}
                  </button>
                ))}
              </div>
            )}

            {/* Table */}
            <div className="border border-slate-300 rounded-lg overflow-auto max-h-[60vh]">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-slate-100 sticky top-0">
                  <tr>
                    {headers.map((header, idx) => (
                      <th key={idx} className="px-4 py-2 text-left border-b font-semibold text-slate-700 whitespace-nowrap">
                        {header || `Column ${idx + 1}`}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {dataRows.map((row, rowIdx) => (
                    <tr key={rowIdx} className="hover:bg-slate-50 transition-colors">
                      {headers.map((_, colIdx) => (
                        <td key={colIdx} className="px-4 py-2 border-b whitespace-nowrap text-slate-800">
                          {row[colIdx] !== undefined && row[colIdx] !== null && row[colIdx] !== '' 
                            ? String(row[colIdx]) 
                            : ''}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    }

    // Markdown view
    if (fileType === 'md') {
      if (isLoading) {
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4"></div>
              <p className="text-slate-400">Loading {selectedArtifact.name}...</p>
            </div>
          </div>
        );
      }

      if (error) {
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <File className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <p className="text-red-500 font-semibold mb-2">Error Loading File</p>
              <p className="text-slate-400 text-sm">{error}</p>
            </div>
          </div>
        );
      }

      return (
        <div className="h-full overflow-auto bg-slate-900">
          <div className="max-w-4xl mx-auto p-8">
            <div className="markdown-content">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {markdownContent}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      );
    }

    // PDF view
    if (fileType === 'pdf') {
      return (
        <div className="h-full bg-slate-800">
          <iframe
            src={selectedArtifact.fileUrl}
            className="w-full h-full"
            title={selectedArtifact.name}
          />
        </div>
      );
    }

    // HTML view
    if (fileType === 'html') {
      return (
        <div className="h-full bg-white">
          <iframe
            src={selectedArtifact.fileUrl}
            className="w-full h-full"
            sandbox="allow-same-origin"
            title={selectedArtifact.name}
          />
        </div>
      );
    }

    // TXT view
    if (fileType === 'txt') {
      return (
        <div className="h-full overflow-auto bg-slate-900">
          <div className="max-w-4xl mx-auto p-8">
            <pre className="text-slate-300 text-sm font-mono whitespace-pre-wrap leading-relaxed">
              Text file: {selectedArtifact.fileUrl}
              
              Use fetch() to load content in production.
            </pre>
          </div>
        </div>
      );
    }

    // DOCX view (placeholder)
    if (fileType === 'docx') {
      return (
        <div className="h-full overflow-auto bg-white">
          <div className="max-w-4xl mx-auto p-8">
            <div className="text-slate-800">
              <h1 className="text-3xl font-bold mb-4">{selectedArtifact.name}</h1>
              <p className="text-slate-600">
                Word document would be rendered here using mammoth.js library.
              </p>
              <p className="text-sm text-slate-500 mt-4">File: {selectedArtifact.fileUrl}</p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <File className="w-16 h-16 text-slate-500 mx-auto mb-4" />
          <p className="text-slate-400">Unsupported file type: {fileType}</p>
        </div>
      </div>
    );
  };

  if (!isOpen || !project) return null;

  const artifactsList = Array.isArray(project.artifacts) 
    ? project.artifacts 
    : Object.entries(project.artifacts || {}).map(([name, description]) => ({
        name,
        description,
        fileUrl: null,
        fileType: null
      }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-6xl h-[90vh] bg-slate-900 rounded-xl shadow-2xl border border-slate-700 flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700 bg-slate-800/90">
          <div className="flex items-center space-x-3">
            {view === 'artifact' && (
              <button
                onClick={backToProject}
                className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors mr-4"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back</span>
              </button>
            )}
            <Shield className="w-6 h-6 text-cyan-400" />
            <div>
              <h2 className="text-xl font-bold">
                {view === 'project' ? project.name : selectedArtifact?.name}
              </h2>
              {view === 'project' && (
                <p className="text-sm text-slate-400">{project.category}</p>
              )}
              {view === 'artifact' && selectedArtifact && (
                <p className="text-sm text-slate-400">{selectedArtifact.fileType.toUpperCase()} Document</p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-auto p-6">
          {view === 'project' ? (
            /* Project Details View */
            <div className="space-y-8">
              {/* About */}
              <div>
                <h3 className="text-lg font-bold mb-3 flex items-center space-x-2">
                  <BookMarked className="w-5 h-5 text-cyan-400" />
                  <span>About</span>
                </h3>
                <p className="text-slate-300 leading-relaxed">{project.objective}</p>
              </div>

              {/* Tech Stack */}
              <div>
                <h3 className="text-lg font-bold mb-3 flex items-center space-x-2">
                  <Code className="w-5 h-5 text-cyan-400" />
                  <span>Tech Stack</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, idx) => (
                    <span key={idx} className="px-3 py-1 bg-slate-800 border border-slate-700 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Security Actions */}
              {project.method && project.method.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold mb-3 flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-cyan-400" />
                    <span>Key Security Actions</span>
                  </h3>
                  <ul className="space-y-2">
                    {project.method.map((step, idx) => (
                      <li key={idx} className="flex items-start space-x-3">
                        <CheckCircle className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
                        <span className="text-slate-300">{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Skills */}
              <div>
                <h3 className="text-lg font-bold mb-3 flex items-center space-x-2">
                  <Award className="w-5 h-5 text-cyan-400" />
                  <span>Skills Demonstrated</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.skills.map((skill, idx) => (
                    <span key={idx} className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-sm text-cyan-400">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Artifacts */}
              <div>
                <h3 className="text-lg font-bold mb-3 flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-cyan-400" />
                  <span>Project Artifacts</span>
                </h3>
                {artifactsList.some(a => a.fileUrl) && (
                  <p className="text-sm text-slate-400 mb-4">Click to view documents</p>
                )}
                <div className="space-y-3">
                  {artifactsList.map((artifact, idx) => {
                    const isClickable = artifact.fileUrl && artifact.fileType;
                    
                    return isClickable ? (
                      <button
                        key={idx}
                        onClick={() => openArtifact(artifact)}
                        className="w-full flex items-start space-x-3 text-left group hover:bg-slate-800/50 p-4 rounded-lg transition-all border border-slate-700 hover:border-cyan-500/50"
                      >
                        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                          <FileText className="w-5 h-5 text-cyan-400" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-semibold text-cyan-400 group-hover:text-cyan-300">
                              {artifact.name}
                            </h4>
                            <span className="px-2 py-0.5 bg-slate-700 rounded text-xs text-slate-400 uppercase">
                              {artifact.fileType}
                            </span>
                          </div>
                          <p className="text-sm text-slate-400">{artifact.description}</p>
                        </div>
                      </button>
                    ) : (
                      <div key={idx} className="flex items-start space-x-3 p-4 bg-slate-800/30 rounded-lg border border-slate-700">
                        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-cyan-400" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-cyan-400 mb-1">{artifact.name}</h4>
                          <p className="text-sm text-slate-400">{artifact.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            /* Artifact Viewer */
            <div className="h-full">
              {renderArtifactContent()}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        {view === 'artifact' && selectedArtifact && (
          <div className="px-6 py-3 border-t border-slate-700 bg-slate-800/90 flex items-center justify-between">
            <p className="text-xs text-slate-500">Read-only view • {selectedArtifact.fileUrl}</p>
            <a
              href={selectedArtifact.fileUrl}
              download
              className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Download</span>
            </a>
          </div>
        )}
      </div>

      {/* Custom Markdown Styling */}
      <style jsx global>{`
        .markdown-content {
          color: #cbd5e1;
          line-height: 1.8;
        }
        .markdown-content h1 {
          color: #06b6d4;
          font-size: 2.5rem;
          font-weight: bold;
          margin-bottom: 1.5rem;
          border-bottom: 2px solid #334155;
          padding-bottom: 0.5rem;
        }
        .markdown-content h2 {
          color: #22d3ee;
          font-size: 2rem;
          font-weight: bold;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        .markdown-content h3 {
          color: #67e8f9;
          font-size: 1.5rem;
          font-weight: 600;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }
        .markdown-content p {
          margin-bottom: 1rem;
        }
        .markdown-content ul, .markdown-content ol {
          margin-left: 1.5rem;
          margin-bottom: 1rem;
          padding-left: 1rem;
        }
        .markdown-content ul {
          list-style-type: disc;
        }
        .markdown-content ol {
          list-style-type: decimal;
        }
        .markdown-content li {
          margin-bottom: 0.5rem;
          padding-left: 0.5rem;
        }
        .markdown-content ul ul {
          list-style-type: circle;
        }
        .markdown-content ul ul ul {
          list-style-type: square;
        }
        .markdown-content code {
          background-color: #1e293b;
          color: #06b6d4;
          padding: 0.2rem 0.4rem;
          border-radius: 0.25rem;
          font-size: 0.9em;
        }
        .markdown-content pre {
          background-color: #0f172a;
          border: 1px solid #334155;
          border-radius: 0.5rem;
          padding: 1rem;
          overflow-x: auto;
          margin-bottom: 1rem;
        }
        .markdown-content pre code {
          background-color: transparent;
          padding: 0;
        }
        .markdown-content a {
          color: #06b6d4;
          text-decoration: underline;
        }
        .markdown-content a:hover {
          color: #22d3ee;
        }
        .markdown-content blockquote {
          border-left: 4px solid #06b6d4;
          padding-left: 1rem;
          margin-left: 0;
          margin-bottom: 1rem;
          color: #94a3b8;
        }
        .markdown-content table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 1rem;
        }
        .markdown-content th, .markdown-content td {
          border: 1px solid #334155;
          padding: 0.75rem;
          text-align: left;
        }
        .markdown-content th {
          background-color: #1e293b;
          color: #06b6d4;
          font-weight: 600;
        }
        .markdown-content tr:hover {
          background-color: #1e293b;
        }
      `}</style>
    </div>
  );
};

export default ProjectModal;
