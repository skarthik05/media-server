export const cleanupStream = (stream) => {
  if (stream) {
    stream.destroy();
  }
};

export const handleStreamErrors = (stream, res) => {
  stream.on("error", (streamErr) => {
    console.error("Stream error:", streamErr);
    if (!res.headersSent) {
      res.status(500).send(streamErr);
    }
    cleanupStream(stream);
  });
};
