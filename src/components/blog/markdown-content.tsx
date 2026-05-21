import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function MarkdownContent({ content }: { content: string }) {
  return (
    <article className="prose prose-invert prose-headings:font-display prose-headings:font-light prose-a:text-primary max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: ({ children }) => {
            const id = String(children)
              .toLowerCase()
              .replace(/[^\w\s-]/g, "")
              .replace(/\s+/g, "-");
            return (
              <h2 id={id} className="scroll-mt-28 text-2xl md:text-3xl">
                {children}
              </h2>
            );
          },
          h3: ({ children }) => (
            <h3 className="text-xl text-foreground">{children}</h3>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
