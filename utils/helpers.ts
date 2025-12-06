export function randomSemver(seed: number) {
  const major = (seed % 3) + 1;
  const minor = Math.floor((seed * 7) % 10);
  const patch = Math.floor((seed * 13) % 20);
  return `${major}.${minor}.${patch}`;
}

export function randomSizeKB(seed: number) {
  return Math.round(((seed * 997) % 4991) + 10);
}

export function isoFromId(seed: number) {
  const base = new Date();
  const daysAgo = (seed % 30) + 1;
  const d = new Date(base);
  d.setDate(base.getDate() - daysAgo);
  return d.toISOString();
}