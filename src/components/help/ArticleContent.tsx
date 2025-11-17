import { HelpArticle, getCategoryById } from "@/data/helpArticles";

interface ArticleContentProps {
  article: HelpArticle;
}

export function ArticleContent({ article }: ArticleContentProps) {
  const category = getCategoryById(article.category);

  // Simple markdown-like rendering
  const renderContent = (content: string) => {
    const lines = content.split("\n");
    const elements: React.ReactNode[] = [];
    let currentList: string[] = [];
    let inList = false;

    lines.forEach((line, index) => {
      const trimmed = line.trim();

      if (!trimmed) {
        if (inList && currentList.length > 0) {
          elements.push(
            <ul key={`list-${index}`} className="list-disc list-inside space-y-1 mb-4 ml-4">
              {currentList.map((item, i) => (
                <li key={i} className="text-gray-700">{item.replace(/^[-*]\s*/, "")}</li>
              ))}
            </ul>
          );
          currentList = [];
          inList = false;
        }
        return;
      }

      // Headings
      if (trimmed.startsWith("# ")) {
        if (inList && currentList.length > 0) {
          elements.push(
            <ul key={`list-${index}`} className="list-disc list-inside space-y-1 mb-4 ml-4">
              {currentList.map((item, i) => (
                <li key={i} className="text-gray-700">{item.replace(/^[-*]\s*/, "")}</li>
              ))}
            </ul>
          );
          currentList = [];
          inList = false;
        }
        elements.push(
          <h2 key={index} className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            {trimmed.replace(/^#\s+/, "")}
          </h2>
        );
      } else if (trimmed.startsWith("## ")) {
        if (inList && currentList.length > 0) {
          elements.push(
            <ul key={`list-${index}`} className="list-disc list-inside space-y-1 mb-4 ml-4">
              {currentList.map((item, i) => (
                <li key={i} className="text-gray-700">{item.replace(/^[-*]\s*/, "")}</li>
              ))}
            </ul>
          );
          currentList = [];
          inList = false;
        }
        elements.push(
          <h3 key={index} className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            {trimmed.replace(/^##\s+/, "")}
          </h3>
        );
      } else if (trimmed.startsWith("### ")) {
        if (inList && currentList.length > 0) {
          elements.push(
            <ul key={`list-${index}`} className="list-disc list-inside space-y-1 mb-4 ml-4">
              {currentList.map((item, i) => (
                <li key={i} className="text-gray-700">{item.replace(/^[-*]\s*/, "")}</li>
              ))}
            </ul>
          );
          currentList = [];
          inList = false;
        }
        elements.push(
          <h4 key={index} className="text-lg font-semibold text-gray-900 mt-4 mb-2">
            {trimmed.replace(/^###\s+/, "")}
          </h4>
        );
      }
      // Lists
      else if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        inList = true;
        currentList.push(trimmed);
      }
      // Regular paragraphs
      else {
        if (inList && currentList.length > 0) {
          elements.push(
            <ul key={`list-${index}`} className="list-disc list-inside space-y-1 mb-4 ml-4">
              {currentList.map((item, i) => (
                <li key={i} className="text-gray-700">{item.replace(/^[-*]\s*/, "")}</li>
              ))}
            </ul>
          );
          currentList = [];
          inList = false;
        }
        elements.push(
          <p key={index} className="text-gray-700 mb-4 leading-relaxed">
            {trimmed}
          </p>
        );
      }
    });

    // Handle any remaining list items
    if (inList && currentList.length > 0) {
      elements.push(
        <ul key="list-final" className="list-disc list-inside space-y-1 mb-4 ml-4">
          {currentList.map((item, i) => (
            <li key={i} className="text-gray-700">{item.replace(/^[-*]\s*/, "")}</li>
          ))}
        </ul>
      );
    }

    return elements;
  };

  return (
    <div className="prose prose-lg max-w-none">
      <div className="mb-6">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
          {category?.name || article.category}
        </span>
      </div>
      <div className="text-gray-700 space-y-4">
        {renderContent(article.content)}
      </div>
    </div>
  );
}


