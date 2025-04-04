import { processCSV } from "./services/csvProcessor.service";
import { Track } from "./interfaces/track.interface";
import { getUniqueComposersFromTracks } from "./services/composers.service";
import { generateExcel } from "./services/excelGenerator.service";

const inputFile: string = "./assets/Track.csv";
const outputFile: string = "./output/Composers.xlsx";

async function main() {
  try {
    const tracks = await processCSV<Track>(inputFile);
    const composers = getUniqueComposersFromTracks(tracks);
    await generateExcel({
      worksheetName: "Composers",
      headers: ["Composer"],
      data: Array.from(composers.values()),
      outputPath: outputFile,
    });

    console.log(`✅ Fichier '${outputFile}' généré avec succès !`);
  } catch (e) {
    console.error("❌ Erreur lors de la génération du fichier Excel :", e);
  }
}

main().then(() => process.exit(0));
