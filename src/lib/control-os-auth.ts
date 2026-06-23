import "server-only";

import { createHash, timingSafeEqual } from "node:crypto";

import type { CmsRole } from "@/collections/access";
import type { ControlOsService } from "@/lib/control-os";

import { getCmsPayload } from "@/lib/cms/payload";

export type ControlOsViewer = {
  email: string | null;
  id: number | string;
  isOperator: boolean;
  name: string | null;
  role: CmsRole;
};

const controlOsRoles = new Set<CmsRole>(["operator", "admin", "editor", "seo-manager", "client-reviewer"]);

function getStringField(user: unknown, field: "email" | "name" | "role") {
  if (!user || typeof user !== "object" || !(field in user)) return null;
  const value = user[field as keyof typeof user];
  return typeof value === "string" ? value : null;
}

function getUserId(user: unknown) {
  if (!user || typeof user !== "object" || !("id" in user)) return null;
  const value = user.id;
  return typeof value === "string" || typeof value === "number" ? value : null;
}

function getRole(user: unknown): CmsRole | null {
  const role = getStringField(user, "role");
  return role && controlOsRoles.has(role as CmsRole) ? (role as CmsRole) : null;
}

function hashToken(token: string) {
  return createHash("sha256").update(token, "utf8").digest();
}

export async function getControlOsViewer(requestHeaders: Headers): Promise<ControlOsViewer | null> {
  const payload = await getCmsPayload();
  if (!payload) return null;

  try {
    const { user } = await payload.auth({ headers: requestHeaders });
    const role = getRole(user);
    const id = getUserId(user);

    if (!user || !role || id === null) {
      return null;
    }

    return {
      email: getStringField(user, "email"),
      id,
      isOperator: role === "operator",
      name: getStringField(user, "name"),
      role,
    };
  } catch {
    return null;
  }
}

export function filterControlOsServicesForViewer(services: ControlOsService[], viewer: ControlOsViewer) {
  if (viewer.isOperator) {
    return services;
  }

  return services.filter((service) => !service.operatorOnly);
}

export function hasValidControlHealthToken(requestHeaders: Headers) {
  const expected = process.env.CONTROL_HEALTH_TOKEN?.trim();
  if (!expected) return false;

  const authorization = requestHeaders.get("authorization")?.trim();
  if (!authorization?.toLowerCase().startsWith("bearer ")) return false;

  const provided = authorization.slice("bearer ".length).trim();
  if (!provided) return false;

  return timingSafeEqual(hashToken(provided), hashToken(expected));
}
