import config from "@payload-config";
import { GRAPHQL_POST } from "@payloadcms/next/routes";

const graphQlPost = GRAPHQL_POST(config);
const isGraphQlEnabled = process.env.PAYLOAD_ENABLE_GRAPHQL === "true";

export function POST(request: Request) {
  if (!isGraphQlEnabled) {
    return new Response("Route Not Found", { status: 404 });
  }

  return graphQlPost(request);
}
