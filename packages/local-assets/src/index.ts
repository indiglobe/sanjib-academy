import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import { fileURLToPath } from "url";
import { faker } from "@faker-js/faker";

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🌐 Public base URL (your local server / CDN base)
const PUBLIC_BASE_URL = "http://localhost:8080";

// 🔥 Source of truth
const assetsUrls: Record<string, string[]> = {
  "images/avatar": Array.from({ length: 20 }, () => faker.image.avatarGitHub()),
  "images/thumbnail": Array.from({ length: 20 }, () =>
    faker.image.urlPicsumPhotos(),
  ),
  "videos/course": [
    "https://samplelib.com/lib/preview/mp4/sample-30s.mp4",
    "https://filesamples.com/samples/video/mp4/sample_640x360.mp4",
    "https://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_320x180.mp4",
    "https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4",
    "https://filesamples.com/samples/video/mp4/sample_960x400_ocean_with_audio.mp4",
    "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
  ],
  "document/pdf": [
    "https://www.cpad.org/wp-content/uploads/2014/03/sample-pdf.pdf",
    "https://sample-files.com/downloads/documents/pdf/sample-20-page-pdf-a4-size.pdf",
    "https://filesamples.com/samples/document/pdf/sample3.pdf",
    "https://filesamples.com/samples/document/pdf/sample2.pdf",
    "https://filesamples.com/samples/document/pdf/sample1.pdf",
  ],
};

// Base download directory
const baseDir = path.join(__dirname, "../downloads");
fs.mkdirSync(baseDir, { recursive: true });

// 👉 manifest now stores FULL URLs
const manifest: Record<string, string[]> = {};

// ---------- helpers ----------

function getExtensionFromContentType(type: string | null) {
  if (!type) return "";

  if (type.includes("image/jpeg")) return ".jpg";
  if (type.includes("image/png")) return ".png";
  if (type.includes("image/webp")) return ".webp";
  if (type.includes("image/gif")) return ".gif";
  if (type.includes("video/mp4")) return ".mp4";

  return "";
}

function getExtensionFromUrl(url: string) {
  return path.extname(url.split("?")[0]);
}

function getFileName(index: number, ext: string) {
  return `file_${index}${ext || ""}`;
}

// ---------- downloader ----------

async function downloadFile(url: string, folder: string, index: number) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
    }

    const buffer = await response.arrayBuffer();

    // detect extension
    let ext = getExtensionFromUrl(url);

    if (!ext) {
      ext = getExtensionFromContentType(response.headers.get("content-type"));
    }

    if (!ext) ext = ".bin";

    const targetDir = path.join(baseDir, folder);
    fs.mkdirSync(targetDir, { recursive: true });

    const fileName = getFileName(index, ext);
    const filePath = path.join(targetDir, fileName);

    fs.writeFileSync(filePath, Buffer.from(buffer));

    const publicUrl = `${PUBLIC_BASE_URL}/${folder}/${fileName}`;

    console.log(`Downloaded → ${publicUrl}`);

    // 👉 store FULL URL in manifest
    if (!manifest[folder]) {
      manifest[folder] = [];
    }

    manifest[folder].push(publicUrl);
  } catch (err) {
    console.error(`Error downloading ${url}`, err);
  }
}

// ---------- main ----------

async function main() {
  for (const folder of Object.keys(assetsUrls)) {
    const urls = assetsUrls[folder];

    await Promise.all(urls.map((url, i) => downloadFile(url, folder, i + 1)));
  }

  const manifestPath = path.join(baseDir, "manifest.json");

  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

  console.log("\n📦 Manifest created at:", manifestPath);
}

main();
