import { NextResponse, type NextRequest } from "next/server"

import { getActiveRedirect } from "@/lib/cms/content"

const PRIMITIVES_HOST_LABEL = "primitives"

function requestHostname(request: NextRequest) {
  const forwardedHost = request.headers.get("x-forwarded-host")
  const hostHeader = request.headers.get("host")
  const rawHost = forwardedHost ?? hostHeader ?? request.nextUrl.host

  return rawHost.split(":")[0]?.toLowerCase() ?? ""
}

function isPrimitivesHost(request: NextRequest) {
  const hostname = requestHostname(request)
  const [label] = hostname.split(".")

  return label === PRIMITIVES_HOST_LABEL
}

function nextWithPrimitivePathname(request: NextRequest) {
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set("x-ofm-pathname", request.nextUrl.pathname)

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

export async function proxy(request: NextRequest) {
  if (isPrimitivesHost(request) && !request.nextUrl.pathname.startsWith("/ui-primitives")) {
    const destination = request.nextUrl.clone()
    destination.pathname =
      request.nextUrl.pathname === "/"
        ? "/ui-primitives"
        : `/ui-primitives${request.nextUrl.pathname}`

    return NextResponse.rewrite(destination)
  }

  if (request.nextUrl.pathname.startsWith("/ui-primitives")) {
    return nextWithPrimitivePathname(request)
  }

  const redirect = await getActiveRedirect(request.nextUrl.pathname)

  if (!redirect) {
    return NextResponse.next()
  }

  if (!redirect.destination.startsWith("/") || redirect.destination.startsWith("//")) {
    return NextResponse.next()
  }

  const destination = new URL(redirect.destination, request.url)
  destination.search = destination.search || request.nextUrl.search

  if (destination.pathname === request.nextUrl.pathname && destination.search === request.nextUrl.search) {
    return NextResponse.next()
  }

  return NextResponse.redirect(destination, redirect.statusCode)
}

export const config = {
  matcher: [
    "/((?!api|admin|control|graphql|graphql-playground|_next/static|_next/image|favicon.ico|icon.png|apple-icon.png|robots.txt|sitemap.xml|.*\\..*).*)",
  ],
}
