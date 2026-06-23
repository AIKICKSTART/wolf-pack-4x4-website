// Server-safe brand graphics for the Payload admin.
// Registered in payload.config.ts under admin.components.graphics.

export function BrandLogo() {
  return (
    <img
      alt="Wolfpack 4x4"
      src="/media/wolfpack/wolfpack-logo-transparent.png"
      style={{ height: "auto", width: 220 }}
    />
  );
}

export function BrandIcon() {
  return (
    <img
      alt=""
      src="/media/wolfpack/wolfpack-mascot.png"
      style={{ borderRadius: 6, height: 32, objectFit: "cover", width: 32 }}
    />
  );
}

export default BrandLogo;
