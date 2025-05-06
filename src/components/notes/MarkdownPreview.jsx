import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';

const MarkdownContainer = styled.div`
  color: var(--text-primary);
  font-size: 14px;
  line-height: 1.6;
  overflow-wrap: break-word;

  h1, h2, h3, h4, h5, h6 {
    margin-top: 0.5em;
    margin-bottom: 0.5em;
    font-weight: 600;
  }

  h1 { font-size: 1.8em; }
  h2 { font-size: 1.5em; }
  h3 { font-size: 1.3em; }
  h4 { font-size: 1.2em; }
  h5 { font-size: 1.1em; }
  h6 { font-size: 1em; }

  p {
    margin-bottom: 1em;
  }

  ul, ol {
    margin-bottom: 1em;
    padding-left: 1.5em;
  }

  li {
    margin-bottom: 0.3em;
  }

  a {
    color: var(--accent);
    text-decoration: underline;
  }

  blockquote {
    border-left: 3px solid var(--accent);
    padding-left: 1em;
    margin-left: 0;
    margin-right: 0;
    font-style: italic;
    opacity: 0.8;
  }

  code {
    font-family: monospace;
    background-color: var(--bg-tertiary);
    padding: 0.2em 0.4em;
    border-radius: 3px;
    font-size: 0.9em;
  }

  pre {
    background-color: var(--bg-tertiary);
    padding: 1em;
    border-radius: var(--border-radius);
    overflow-x: auto;
    margin-bottom: 1em;
  }

  strong {
    font-weight: 600;
  }

  em {
    font-style: italic;
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: var(--border-radius);
  }

  hr {
    border: none;
    border-top: 1px solid var(--bg-tertiary);
    margin: 1em 0;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 1em;
  }

  th, td {
    border: 1px solid var(--bg-tertiary);
    padding: 0.5em;
    text-align: left;
  }

  th {
    background-color: var(--bg-tertiary);
  }
`;

const MarkdownPreview = ({ content, className }) => {
  return (
    <MarkdownContainer className={className}>
      <ReactMarkdown>{content || ''}</ReactMarkdown>
    </MarkdownContainer>
  );
};

export default MarkdownPreview;