import { useEffect, useState } from "react";
import { api } from "./api";

function App() {
  const [articles, setArticles] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    api.get("/articles").then((res) => {
      setArticles(res.data);
    });
  }, []);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-14 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <header className="mb-14 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
            Beyond<span className="text-indigo-600">Chats</span> Articles
          </h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Original insights from BeyondChats — enhanced with AI-powered updates and trusted references.
          </p>
        </header>

        {/* Articles */}
        <div className="space-y-10">
          {articles.map((article) => {
            const isExpanded = expandedId === article._id;

            return (
              <article
                key={article._id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="p-8">

                  {/* Title + Badge */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5">
                    <h2 className="text-2xl font-bold text-slate-900 leading-snug">
                      {article.title}
                    </h2>

                    {article.isUpdated && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                        AI Updated
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <p className="text-slate-700 leading-relaxed whitespace-pre-line text-base sm:text-lg">
                    {isExpanded
                      ? article.content
                      : article.content.slice(0, 500) + "..."}
                  </p>

                  {/* Read more */}
                  <button
                    onClick={() => toggleExpand(article._id)}
                    className="mt-4 text-indigo-600 font-medium hover:text-indigo-800 transition-colors"
                  >
                    {isExpanded ? "Read less ↑" : "Read more ↓"}
                  </button>

                  {/* References */}
                  {article.references?.length > 0 && (
                    <div className="mt-8 pt-6 border-t border-slate-100">
                      <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
                        References
                      </h4>
                      <ul className="space-y-3">
                        {article.references.map((ref, i) => (
                          <li key={i}>
                            <a
                              href={ref}
                              target="_blank"
                              rel="noreferrer"
                              className="text-indigo-600 hover:text-indigo-800 underline-offset-4 hover:underline break-all"
                            >
                              {ref}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </article>
            );
          })}

          {/* Loading / Empty */}
          {articles.length === 0 && (
            <div className="text-center py-24 bg-white rounded-2xl border-2 border-dashed border-slate-300">
              <p className="text-slate-500 text-lg animate-pulse">
                Fetching articles…
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-20 text-center text-slate-400 text-sm">
          © {new Date().getFullYear()} BeyondChats · Built with care
        </footer>
      </div>
    </div>
  );
}

export default App;
