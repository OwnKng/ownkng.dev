import Highlight, { defaultProps } from "prism-react-renderer";
import palenight from "prism-react-renderer/themes/palenight";

const CodeBlock = ({ children, className }) => {
  return (
    <Highlight
      {...defaultProps}
      theme={palenight}
      code={children.trim()}
      language={"jsx"}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={className}
          style={{ ...style, padding: "20px", overflow: "scroll" }}
        >
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};

export default CodeBlock;
