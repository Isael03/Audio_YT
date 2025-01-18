import ytdlp from "yt-dlp-exec";
import fs from "fs";

export async function downloadAudio(url, audioFormat = "mp3") {
  try {
    const outputDir = "downloads";

    // Crea el directorio de descargas si no existe
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    const output = `${outputDir}/%(title)s.${audioFormat}`;
    console.log(`Descargando audio desde ${url}...`);

    /* // Listar los formatos disponibles
    const formats = await ytdlp(url, { listFormats: true });
    console.log("Formatos disponibles:", formats);

    // Seleccionar un formato disponible
    const format = formats.includes("bestaudio") ? "bestaudio" : formats[0]; */

    await ytdlp(url, {
      output,
      format: "bestaudio",
      postprocessorArgs: ["-x", "--audio-format", audioFormat],
      
    });

    console.log(`Descarga de audio completada: ${output}`);
  } catch (error) {
    console.error("Error al descargar el audio:", error.message);
  }
}


