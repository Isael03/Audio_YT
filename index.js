import inquirer from 'inquirer'
import { downloadAudio } from './helpers/downloader.js';
import { validateSource } from './helpers/validateSource.js';

(async function main() {
  try {
  
    console.log('=== Descargador de Audio CLI ==='); 

    // Solicitar la URL del video
    const { url } = await inquirer.prompt([
      {
        type: 'input',
        name: 'url',
        message: 'Introduce la URL del video o audio:',
        validate: input => input ? validateSource(input) : 'La URL no puede estar vacía.',
      },
    ]);

  
      const { audioFormat } = await inquirer.prompt([
        {
          type: 'list',
          name: 'audioFormat',
          message: 'Selecciona el formato del audio:',
          choices: ['mp3', 'aac', 'wav', 'flac'],
        },
      ]);

      await downloadAudio(url, audioFormat);
  } catch (error) {
    console.error('Error:', error.message);
  }
})();