import { useState } from 'react';
import styled from 'styled-components';
import { FaQuestionCircle } from 'react-icons/fa';

const GuideButton = styled.button`
  background: transparent;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 14px;
  padding: 5px;
  
  svg {
    margin-right: 5px;
  }
  
  &:hover {
    color: var(--text-primary);
  }
`;

const GuideModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const GuideContent = styled.div`
  background-color: var(--bg-secondary);
  border-radius: var(--border-radius);
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: var(--shadow);
`;

const GuideHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid var(--bg-tertiary);
`;

const GuideTitle = styled.h3`
  font-size: 18px;
  color: var(--text-primary);
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: var(--text-secondary);
  font-size: 20px;
  cursor: pointer;
  
  &:hover {
    color: var(--text-primary);
  }
`;

const GuideBody = styled.div`
  padding: 16px;
`;

const GuideSection = styled.div`
  margin-bottom: 20px;
`;

const GuideSectionTitle = styled.h4`
  font-size: 16px;
  margin-bottom: 10px;
  color: var(--accent);
`;

const SyntaxExample = styled.div`
  display: flex;
  margin-bottom: 10px;
  border-bottom: 1px solid var(--bg-tertiary);
  padding-bottom: 10px;
  
  &:last-child {
    border-bottom: none;
  }
`;

const SyntaxCode = styled.code`
  flex: 1;
  background-color: var(--bg-tertiary);
  padding: 8px;
  border-radius: var(--border-radius);
  font-family: monospace;
  margin-right: 10px;
  white-space: pre-wrap;
`;

const SyntaxResult = styled.div`
  flex: 1;
  padding: 8px;
`;

const MarkdownGuide = () => {
  const [showGuide, setShowGuide] = useState(false);
  
  return (
    <>
      <GuideButton onClick={() => setShowGuide(true)}>
        <FaQuestionCircle /> Markdown Help
      </GuideButton>
      
      {showGuide && (
        <GuideModal onClick={() => setShowGuide(false)}>
          <GuideContent onClick={e => e.stopPropagation()}>
            <GuideHeader>
              <GuideTitle>Markdown Formatting Guide</GuideTitle>
              <CloseButton onClick={() => setShowGuide(false)}>&times;</CloseButton>
            </GuideHeader>
            <GuideBody>
              <GuideSection>
                <GuideSectionTitle>Basic Text Formatting</GuideSectionTitle>
                <SyntaxExample>
                  <SyntaxCode>**Bold Text**</SyntaxCode>
                  <SyntaxResult><strong>Bold Text</strong></SyntaxResult>
                </SyntaxExample>
                <SyntaxExample>
                  <SyntaxCode>*Italic Text*</SyntaxCode>
                  <SyntaxResult><em>Italic Text</em></SyntaxResult>
                </SyntaxExample>
                <SyntaxExample>
                  <SyntaxCode>~~Strikethrough~~</SyntaxCode>
                  <SyntaxResult><del>Strikethrough</del></SyntaxResult>
                </SyntaxExample>
              </GuideSection>
              
              <GuideSection>
                <GuideSectionTitle>Headings</GuideSectionTitle>
                <SyntaxExample>
                  <SyntaxCode># Heading 1</SyntaxCode>
                  <SyntaxResult><h1 style={{fontSize: '1.8em'}}>Heading 1</h1></SyntaxResult>
                </SyntaxExample>
                <SyntaxExample>
                  <SyntaxCode>## Heading 2</SyntaxCode>
                  <SyntaxResult><h2 style={{fontSize: '1.5em'}}>Heading 2</h2></SyntaxResult>
                </SyntaxExample>
              </GuideSection>
              
              <GuideSection>
                <GuideSectionTitle>Lists</GuideSectionTitle>
                <SyntaxExample>
                  <SyntaxCode>
{`- Item 1
- Item 2
- Item 3`}
                  </SyntaxCode>
                  <SyntaxResult>
                    <ul>
                      <li>Item 1</li>
                      <li>Item 2</li>
                      <li>Item 3</li>
                    </ul>
                  </SyntaxResult>
                </SyntaxExample>
                <SyntaxExample>
                  <SyntaxCode>
{`1. First item
2. Second item
3. Third item`}
                  </SyntaxCode>
                  <SyntaxResult>
                    <ol>
                      <li>First item</li>
                      <li>Second item</li>
                      <li>Third item</li>
                    </ol>
                  </SyntaxResult>
                </SyntaxExample>
              </GuideSection>
              
              <GuideSection>
                <GuideSectionTitle>Links & Images</GuideSectionTitle>
                <SyntaxExample>
                  <SyntaxCode>[Link Text](https://example.com)</SyntaxCode>
                  <SyntaxResult><a href="#" onClick={(e) => e.preventDefault()}>Link Text</a></SyntaxResult>
                </SyntaxExample>
                <SyntaxExample>
                  <SyntaxCode>![Alt text](image-url.jpg)</SyntaxCode>
                  <SyntaxResult>Image with alt text (not displayed here)</SyntaxResult>
                </SyntaxExample>
              </GuideSection>
              
              <GuideSection>
                <GuideSectionTitle>Blockquotes & Code</GuideSectionTitle>
                <SyntaxExample>
                  <SyntaxCode> This is a blockquote</SyntaxCode>
                  <SyntaxResult>
                    <blockquote style={{borderLeft: '3px solid var(--accent)', paddingLeft: '10px', fontStyle: 'italic'}}>This is a blockquote</blockquote>
                  </SyntaxResult>
                </SyntaxExample>
                <SyntaxExample>
                  <SyntaxCode>`Inline code`</SyntaxCode>
                  <SyntaxResult>
                    <code style={{backgroundColor: 'var(--bg-tertiary)', padding: '2px 4px', borderRadius: '3px'}}>Inline code</code>
                  </SyntaxResult>
                </SyntaxExample>
                <SyntaxExample>
                  <SyntaxCode>
{`\`\`\`
function hello() {
  console.log("Hello, world!");
}
\`\`\``}
                  </SyntaxCode>
                  <SyntaxResult>
                    <pre style={{backgroundColor: 'var(--bg-tertiary)', padding: '10px', borderRadius: '5px', overflowX: 'auto'}}>
                      <code>
{`
function hello() {
  console.log("Hello, world!");
}`}
                      </code>
                    </pre>
                  </SyntaxResult>
                </SyntaxExample>
              </GuideSection>
              
              <GuideSection>
                <GuideSectionTitle>Tables</GuideSectionTitle>
                <SyntaxExample>
                  <SyntaxCode>
{`| Header 1 | Header 2 |
| -------- | -------- |
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |`}
                  </SyntaxCode>
                  <SyntaxResult>
                    <table style={{width: '100%', borderCollapse: 'collapse'}}>
                      <thead>
                        <tr>
                          <th style={{border: '1px solid var(--bg-tertiary)', padding: '8px', backgroundColor: 'var(--bg-tertiary)'}}>Header 1</th>
                          <th style={{border: '1px solid var(--bg-tertiary)', padding: '8px', backgroundColor: 'var(--bg-tertiary)'}}>Header 2</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style={{border: '1px solid var(--bg-tertiary)', padding: '8px'}}>Cell 1</td>
                          <td style={{border: '1px solid var(--bg-tertiary)', padding: '8px'}}>Cell 2</td>
                        </tr>
                        <tr>
                          <td style={{border: '1px solid var(--bg-tertiary)', padding: '8px'}}>Cell 3</td>
                          <td style={{border: '1px solid var(--bg-tertiary)', padding: '8px'}}>Cell 4</td>
                        </tr>
                      </tbody>
                    </table>
                  </SyntaxResult>
                </SyntaxExample>
              </GuideSection>
              
              <GuideSection>
                <GuideSectionTitle>Horizontal Rule</GuideSectionTitle>
                <SyntaxExample>
                  <SyntaxCode>---</SyntaxCode>
                  <SyntaxResult>
                    <hr style={{border: 'none', borderTop: '1px solid var(--bg-tertiary)', margin: '10px 0'}} />
                  </SyntaxResult>
                </SyntaxExample>
              </GuideSection>
              
              <GuideSection>
                <GuideSectionTitle>Task Lists</GuideSectionTitle>
                <SyntaxExample>
                  <SyntaxCode>
{`- [x] Completed task
- [ ] Incomplete task`}
                  </SyntaxCode>
                  <SyntaxResult>
                    <div>
                      <div style={{display: 'flex', alignItems: 'center', marginBottom: '5px'}}>
                        <input type="checkbox" checked readOnly style={{marginRight: '5px'}} />
                        <span>Completed task</span>
                      </div>
                      <div style={{display: 'flex', alignItems: 'center'}}>
                        <input type="checkbox" readOnly style={{marginRight: '5px'}} />
                        <span>Incomplete task</span>
                      </div>
                    </div>
                  </SyntaxResult>
                </SyntaxExample>
              </GuideSection>
            </GuideBody>
          </GuideContent>
        </GuideModal>
      )}
    </>
  );
};

export default MarkdownGuide;