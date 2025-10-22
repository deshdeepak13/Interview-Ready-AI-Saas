import React, { useState } from "react";
import { LuCopy, LuCheck, LuCode } from "react-icons/lu";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { div } from "framer-motion/client";
import language from "react-syntax-highlighter/dist/esm/languages/hljs/1c";

function AIResponsePreview({ content }) {
  if (!content) return null;
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-[14px] prose prose-slate dark:prose-invert max-w-none prose-headings:text-gray-200 prose-p:text-gray-300 prose-strong:text-white prose-em:text-gray-200 prose-ul:text-gray-300 prose-ol:text-gray-300 prose-li:text-gray-300 prose-blockquote:text-gray-400 prose-a:text-blue-400 prose-table:text-gray-300 prose-th:text-gray-400 prose-td:text-gray-300 prose-hr:border-gray-600">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ node, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              const language = match ? match[1] : "";

              const isInline = !className;

              return !isInline ? (
                <Codeblock
                  code={String(children).replace(/\n$/, "")}
                  lang={language}
                />
              ) : (
                <code
                  className="px-1 py-0.5 bg-gray-700 rounded text-sm text-gray-200 border border-gray-600"
                  {...props}
                >
                  {children}
                </code>
              );
            },
            p({ children }) {
              return <p className="mb-4 leading-5 text-gray-300">{children}</p>;
            },
            strong({ children }) {
              return <strong className="text-white font-semibold">{children}</strong>;
            },
            em({ children }) {
              return <em className="text-gray-200 not-italic">{children}</em>;
            },
            ul({ children }) {
              return (
                <ul className="list-disc pl-6 space-y-2 my-4 text-gray-300">{children}</ul>
              );
            },
            ol({ children }) {
              return (
                <ol className="list-decimal pl-6 space-y-2 my-4 text-gray-300">{children}</ol>
              );
            },
            li({ children }) {
              return <li className="mb-1">{children}</li>;
            },
            blockquote({ children }) {
              return (
                <blockquote className="border-l-4 border-gray-600 pl-4 italic my-4 text-gray-400 bg-gray-700/50 py-2 rounded-r">
                  {children}
                </blockquote>
              );
            },
            h1({ children }) {
              return (
                <h1 className="text-2xl font-bold mt-6 mb-4 text-white">{children}</h1>
              );
            },
            h2({ children }) {
              return (
                <h2 className="text-xl font-bold mt-6 mb-3 text-white">{children}</h2>
              );
            },
            h3({ children }) {
              return (
                <h3 className="text-lg font-bold mt-5 mb-2 text-white">{children}</h3>
              );
            },
            h4({ children }) {
              return (
                <h4 className="text-base font-bold mt-4 mb-2 text-white">{children}</h4>
              );
            },
            a({ children, href }) {
              return (
                <a href={href} className="text-blue-400 hover:text-blue-300 hover:underline transition-colors">
                  {children}
                </a>
              );
            },
            table({ children }) {
              return (
                <div className="overflow-x-auto my-4">
                  <table className="min-w-full divide-y divide-gray-600 border border-gray-600">
                    {children}
                  </table>
                </div>
              );
            },
            thead({ children }) {
              return <thead className="bg-gray-700">{children}</thead>;
            },
            tbody({ children }) {
              return (
                <tbody className="divide-y divide-gray-600">{children}</tbody>
              );
            },
            tr({ children }) {
              return <tr>{children}</tr>;
            },
            th({ children }) {
              return (
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  {children}
                </th>
              );
            },
            td({ children }) {
              return (
                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-300">
                  {children}
                </td>
              );
            },
            hr() {
              return <hr className="my-6 border-gray-600" />;
            },
            img({ src, alt }) {
              return (
                <img src={src} alt={alt} className="my-4 max-w-full rounded border border-gray-600" />
              );
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}

function Codeblock({ code, lang }) {
  const [copied, setCopied] = useState(false);

  const copyCode = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(code);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = code;
        textArea.style.position = "fixed";
        textArea.style.top = "-1000px";
        textArea.style.left = "-1000px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }

      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return (
    <div className="relative my-6 rounded-lg overflow-hidden bg-gray-800 border border-gray-600">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-700 border-b border-gray-600">
        <div className="flex items-center space-x-2">
          <LuCode size={16} className="text-gray-400" />
          <span className="text-xs font-semibold text-gray-300 uppercase tracking-wide">{lang || "Code"}</span>
        </div>
        <button onClick={copyCode} aria-label="Copy code" className="text-gray-400 hover:text-gray-200 focus:outline-none relative group transition-colors">
          {copied ? (
            <LuCheck size={16} className="text-green-400" />
          ) : (
            <LuCopy size={16} className="text-gray-400 hover:text-gray-200" />
          )}
          {copied && <span className="absolute -top-8 right-0 bg-gray-900 text-white text-xs rounded-md px-2 py-1 border border-gray-600">Copied!</span>}
        </button>
      </div>

      <SyntaxHighlighter
        language={lang}
        style={oneDark}
        customStyle={{fontSize:12.5, margin:0, padding:'1rem',background:'transparent'}}
        showLineNumbers={true}
        wrapLines={true}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}

export default AIResponsePreview;