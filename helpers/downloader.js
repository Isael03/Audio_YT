//const ytdlp = require("yt-dlp-exec");
const fs = require("fs");
const path = require("path");
const {exec} = require("child_process");


async function downloadAudio(url, audioFormat = "mp3") {
  try {
    const outputDir = "downloads";
    // Crea el directorio de descargas si no existe
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    const ytDlpPath = path.join("bin", "yt-dlp.exe");
    const output = `${outputDir}/%(title)s.${audioFormat}`;
    const command = `${ytDlpPath} ${url} --output ${output} --format bestaudio --postprocessor-args -x --postprocessor-args --audio-format --postprocessor-args ${audioFormat}`;

    console.log(`Descargando audio desde ${url}...`);

    console.log(`Ejecutando comando: ${command}`);

    return new Promise((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error al descargar el audio: ${stderr}`);
          reject(error);
        } else {
          console.log(`Descarga completada: ${stdout}`);
          resolve(stdout);
        }
      });
    });

  } catch (error) {
    console.error("Error al descargar el audio:", error.message);
  }
}

module.exports = { downloadAudio };
