const inquirer = require("inquirer");
const { downloadAudio } = require("./helpers/downloader.js");
const { validateSource } = require("./helpers/validateSource.js");

(async function main() {
  try {
    // Menu de descarga de audio desde URL
    async function downloadAudioFromUrl() {
      // Solicitar la URL del video
      const { url } = await inquirer.prompt([
        {
          type: "input",
          name: "url",
          message: "Introduce la URL del video o audio:",
          validate: (input) =>
            input ? validateSource(input) : "La URL no puede estar vacía.",
        },
      ]);

      const { audioFormat } = await inquirer.prompt([
        {
          type: "list",
          name: "audioFormat",
          message: "Selecciona el formato del audio:",
          choices: ["mp3", "aac", "wav", "flac"],
        },
      ]);

      await downloadAudio(url, audioFormat);
    }

    // Menú principal y repetir hasta que el usuario decida salir
    console.log("=== Descargador de Audio CLI ===");

    while (true) {
      const { action } = await inquirer.prompt([
        {
          type: "list",
          name: "action",
          message: "Selecciona una opción:",
          choices: ["Descargar audio desde URL", "Salir"],
        },
      ]);

      if (action === "Salir") {
        break;
      }

      await downloadAudioFromUrl();
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
})();
