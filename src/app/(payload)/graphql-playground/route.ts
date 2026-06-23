const isProduction = process.env.NODE_ENV === "production";

export async function GET(request: Request) {
  if (isProduction) {
    return new Response("Route Not Found", { status: 404 });
  }

  const [{ default: config }, { GRAPHQL_PLAYGROUND_GET }] = await Promise.all([
    import("@payload-config"),
    import("@payloadcms/next/routes"),
  ]);

  return GRAPHQL_PLAYGROUND_GET(config)(request);
}
