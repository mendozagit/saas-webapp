const { readFileSync, writeFileSync } = require('fs');
const { join } = require('path');
const { argv, exit, cwd } = require('process');

const changeThemesMeta = (theme) => {
  const [baseTheme, namePart] = theme.split('.');
  const isGeneric = baseTheme === 'generic';
  const color = isGeneric ? '' : namePart;
  const isDark = theme.includes('.dark');
  const isCompact = /compact$/.test(theme);
  const baseBundleName = isGeneric ? '' : `${baseTheme}.${color}.`;

  const appPath = cwd();
  const appVariablesPath = join(appPath, 'src/app/theme/styles/variables-mixin.scss');

  // Update angular.json theme imports
  setCssThemeImports(join(appPath, 'angular.json'), baseBundleName, isCompact);

  // Update theme service default mode
  setAppDefaultThemeMode(join(appPath, 'src/app/services/theme.service.ts'), isDark);

  // Update SCSS variables
  setCssThemeVariables(appVariablesPath, {
    baseTheme, color, isGeneric, isCompact,
  });
};

const theme = argv[2];

console.log(`Set theme ${theme}`);

if (!/(material|fluent)\.\w+\.(dark|light)(\.compact)?$/.test(theme)
    && !/generic\.(dark|light)(\.compact)?/.test(theme)
) {
  console.error(`Failed to set theme ${theme}!`);
  console.log('Usage set-theme.js <themename>. Variants: (material|fluent).<color>.(dark|light).(compact)? or generic.(dark|light).(compact)?');
  exit(1);
}

function setCssThemeImports(fileForChange, baseBundleName, isCompact) {
  writeFileSync(
    fileForChange,
    readFileSync(fileForChange, 'utf8')
      .replace(
        /(scss\/bundles\/dx\.)(.+\.){0,2}(dark|light)(\.compact)?(\.scss)?/g,
        `$1${baseBundleName}$3${isCompact ? '.compact' : ''}$5`,
      ),
  );
}

function setAppDefaultThemeMode(fileForChange, isDark) {
  const jsThemeFileContent = readFileSync(fileForChange, 'utf8');
  const jsThemesRegExp = /const themes([^=]+)= \[[^\]]+]/;

  if (!jsThemesRegExp.test(jsThemeFileContent)) {
    throw new Error(`Theme settings not found in ${fileForChange}`);
  }

  writeFileSync(fileForChange, jsThemeFileContent.replace(
    jsThemesRegExp,
    `const themes$1= [${isDark ? "'dark', 'light'" : "'light', 'dark'"}]`,
  ));
}

function setCssThemeVariables(appVariablesPath, {
  baseTheme, color, isGeneric, isCompact,
}) {
  const variablesContentForChange = readFileSync(appVariablesPath, 'utf8');

  const cssColorsSettings = isGeneric ? '$color: $theme-mode' : `$color: "${color}", $mode: $theme-mode`;

  const newVariablesContent = variablesContentForChange
    .replace(/(material|fluent|generic)/g, baseTheme)
    .replace(/\(\$size: "[^"]+"\)/, `($size: "${isCompact ? 'compact' : 'default'}")`)
    .replace(/(colors['"] as \* with )\([^)]+\)/, `$1(${cssColorsSettings})`);

  writeFileSync(appVariablesPath, newVariablesContent);
}

changeThemesMeta(theme);
