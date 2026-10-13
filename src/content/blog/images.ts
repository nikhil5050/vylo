// Editorial stock photography from Pexels (free for commercial use, no
// attribution required — https://www.pexels.com/license/). Swap these for
// original Vylore product shots as they become available; only `src` needs
// to change. The `w` param lets the CDN resize for cards vs. the hero.
export function pexels(id: number, width = 1600) {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;
}

// Re-request the same Pexels photo at a smaller width (cards, related posts).
export function resizePexels(src: string, width: number) {
  return src.replace(/([?&])w=\d+/, `$1w=${width}`);
}
