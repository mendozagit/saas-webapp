const {
  readFileSync, writeFileSync, linkSync, unlinkSync, existsSync,
} = require('fs');
const { join } = require('path');
const { cwd } = require('process');

const performIndexReplacement = (indexFileLocation) => {
  const indexFilePath = join(indexFileLocation, 'index.html');
  const content = readFileSync(indexFilePath).toString();
  writeFileSync(indexFilePath, content.replace(/class="dx-viewport"/s, 'class="dx-viewport embedded"'), 'utf8');
};

const addResizeListener = () => {
  const listenerFileName = 'resize-listener.js';
  const listenerPath = join(cwd(), 'utils', listenerFileName);
  const srcPath = join(cwd(), 'src');
  const applicationListenerPath = join(srcPath, listenerFileName);

  if (existsSync(applicationListenerPath)) unlinkSync(applicationListenerPath);
  linkSync(listenerPath, applicationListenerPath);

  const targetFilePath = join(srcPath, 'main.ts');
  const targetFileContent = readFileSync(targetFilePath);
  writeFileSync(targetFilePath, `import './resize-listener';\n${targetFileContent}`, 'utf8');
};

const performReplacements = () => {
  performIndexReplacement(join(cwd(), 'src'));
  addResizeListener();
};

performReplacements();
