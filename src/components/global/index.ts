// 自动引入global下的vue文件、不进行深层次的引入
const vueFiles = require.context('./', false, /\.vue$/)
// 图标
import * as ElIconModules from '@element-plus/icons'

import sForm from './forms/s-form.vue'

interface Component {
  name: string;
  component: Object
}

// 手动引入文件
const manualImportFiles = { 
  [sForm.name]: sForm 
}


const components: Component[] = []

vueFiles.keys().forEach((file) => {
  let name = file.split('/').pop()
  name = (name as string).replace(/\.\w+$/, '')
  const component = vueFiles(file).default || vueFiles(file)
  components.push({name, component})
})

for (const name in manualImportFiles) {
  if (Object.prototype.hasOwnProperty.call(manualImportFiles, name)) {
    const component = manualImportFiles[name];
    components.push({name, component})
  }
}

for (const name in ElIconModules) {
  components.push({name: translateName(name), component: (ElIconModules as any)[name]})
}

function translateName(name: string) {
  return 'i' + name.replace(/[A-Z]/g, (match) => '-' + match.toLowerCase())
}

export { components }
