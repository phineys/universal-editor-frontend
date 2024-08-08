import * as fs from 'fs'
import * as path from 'path'

// Verzeichnis mit den Komponenten
const componentsDir = path.join(process.cwd(), 'components')
// Verzeichnis für die Storybook-Stories
const storiesDir = path.join(process.cwd(), '.storybook/stories')

// Sicherstellen, dass das Verzeichnis für die Stories existiert
if (!fs.existsSync(storiesDir)) {
  fs.mkdirSync(storiesDir, { recursive: true })
}

// Funktion, um den Komponentennamen aus dem Dateinamen zu extrahieren
const getComponentName = (filename) => {
  return path.basename(filename, path.extname(filename))
}

// Funktion zum Erstellen einer Story für eine Komponente
const createStory = (componentName) => {
  return `import ${componentName} from '../../components/${componentName}.vue';

export default {
  title: 'Components/${componentName}',
  component: ${componentName},
};

const Template = (args) => ({
  components: { ${componentName} },
  setup() {
    return { args };
  },
  template: '<${componentName} v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {};
`
}

// Komponenten durchsuchen und Stories generieren
fs.readdir(componentsDir, (err, files) => {
  if (err) {
    console.error('Fehler beim Lesen des Verzeichnisses:', err)
    return
  }

  files.forEach((file) => {
    // Nur .vue Dateien berücksichtigen
    if (path.extname(file) === '.vue') {
      const componentName = getComponentName(file)
      const storyContent = createStory(componentName)
      const storyFilename = path.join(
        storiesDir,
        `${componentName}.stories.mjs`
      )

      fs.writeFile(storyFilename, storyContent, (err) => {
        if (err) {
          console.error('Fehler beim Erstellen der Story:', err)
        } else {
          console.log(`Story für ${componentName} erstellt.`)
        }
      })
    }
  })
})
