import type { NextRequest } from "next/server";

import { filterControlOsServicesForViewer, getControlOsViewer, hasValidControlHealthToken } from "@/lib/control-os-auth";
import { getControlOsHealth, getControlOsServices } from "@/lib/control-os";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const noStoreHeaders = {
  "Cache-Control": "no-store",
  "X-Robots-Tag": "noindex, nofollow",
};

export async function GET(request: NextRequest) {
  if (hasValidControlHealthToken(request.headers)) {
    return Response.json(await getControlOsHealth(), {
      headers: noStoreHeaders,
    });
  }

  const viewer = await getControlOsViewer(request.headers);

  if (!viewer) {
    return Response.json(
      { error: "Unauthorized" },
      {
        headers: noStoreHeaders,
        status: 401,
      },
    );
  }

  return Response.json(await getControlOsHealth(filterControlOsServicesForViewer(getControlOsServices(), viewer)), {
    headers: {
      ...noStoreHeaders,
    },
  });
}
