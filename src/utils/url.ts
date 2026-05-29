// Join a path onto Astro's configured base (import.meta.env.BASE_URL),
// guaranteeing exactly one slash between them. Works whether the base is
// '/qualitying' (project pages) or '/' (custom domain / user pages).
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL;
  const b = base.endsWith('/') ? base.slice(0, -1) : base;
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${b}${p}`;
}
