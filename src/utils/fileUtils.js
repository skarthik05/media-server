export const getChunkSize = (fileSize) => {
  // Determine a base chunk size, for example, 1% of the file size
  const baseChunkSize = Math.max(10 ** 6, Math.ceil(fileSize / 100));
  console.log({ fileSize }, { baseChunkSize });
  const maxChunkSize = 10 * 10 ** 6;
  return Math.min(baseChunkSize, maxChunkSize);
};  
