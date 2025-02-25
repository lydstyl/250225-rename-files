import fs from 'fs'
import path from 'path'

const renameFiles = (directory: string, baseName: string) => {
  try {
    const files = fs
      .readdirSync(directory)
      .filter((file) => fs.statSync(path.join(directory, file)).isFile())
      .sort()

    if (files.length < 2) {
      console.log('Pas assez de fichiers pour renommer.')
      return
    }

    files.forEach((file, index) => {
      const oldPath = path.join(directory, file)
      const extension = path.extname(file)
      const newFileName = `${baseName}${index + 1}${extension}`
      const newPath = path.join(directory, newFileName)

      fs.renameSync(oldPath, newPath)
      console.log(`Renommé : ${file} -> ${newFileName}`)
    })
  } catch (error) {
    console.error('Erreur lors du renommage :', error)
  }
}

// Exemple d'utilisation : renommer les fichiers dans un dossier donné
const folderPath = '/home/gab/apps/250219-logis-ange/public/images/lot1' // Remplace par ton dossier réel
const baseName = 'lot1' // Préfixe des nouveaux fichiers

renameFiles(folderPath, baseName)
