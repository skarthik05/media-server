import { promises as fsPromises, createReadStream } from "fs";
import path from "path";
import mime from "mime";
import { getChunkSize } from "../utils/fileUtils.js";
import { MEDIA_DIR } from "../config/index.js";
import { handleStreamErrors } from "../utils/streamUtils.js";

export const streamMedia = async (req, res) => {
  const fileName = req.params.filename;
  const filePath = path.join(MEDIA_DIR, fileName);

  try {
    const stats = await fsPromises.stat(filePath);

    const range = req.headers.range ?? "0";

    const CHUNK_SIZE = getChunkSize(stats.size);
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, stats.size - 1);

    const contentType = mime.getType(filePath) || "application/octet-stream";

    const contentLength = end - start + 1;
    const headers = {
      "Content-Range": `bytes ${start}-${end}/${stats.size}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": contentType,
    };

    res.writeHead(206, headers);

    const stream = createReadStream(filePath, { start, end });

    handleStreamErrors(stream, res);

    stream.pipe(res);
  } catch (err) {
    console.error("File stat error:", err);
    res.status(404).send("File not found");
  }
};
