// Triggers a browser "Save As" for an in-memory Blob — used for file
// downloads that need an Authorization header (apiFetchBlob), which a plain
// <a href> can't send.
export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
