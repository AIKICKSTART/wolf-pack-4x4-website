import type { Access, FieldAccess, PayloadRequest, Where } from "payload";

export type CmsRole = "operator" | "admin" | "editor" | "seo-manager" | "client-reviewer";

export const publicRead: Access = () => true;

const cmsRoles = new Set<CmsRole>(["operator", "admin", "editor", "seo-manager", "client-reviewer"]);

function getRole(user: PayloadRequest["user"]): CmsRole | undefined {
  const role = user && typeof user === "object" && "role" in user ? user.role : undefined;
  return typeof role === "string" && cmsRoles.has(role as CmsRole) ? (role as CmsRole) : undefined;
}

function getUserId(user: PayloadRequest["user"]) {
  const id = user && typeof user === "object" && "id" in user ? user.id : undefined;
  return typeof id === "string" || typeof id === "number" ? id : undefined;
}

export function hasRole(user: PayloadRequest["user"], roles: CmsRole[]) {
  const role = getRole(user);
  return Boolean(role && roles.includes(role));
}

export function isAdminUser(user: PayloadRequest["user"]) {
  return hasRole(user, ["operator", "admin"]);
}

export const isAuthenticated: Access = ({ req: { user } }) => Boolean(user);

export const canAccessAdminPanel = ({ req }: { req: PayloadRequest }) =>
  hasRole(req.user, ["operator", "admin", "editor", "seo-manager", "client-reviewer"]);

export const isAdminField: FieldAccess = ({ req }) => isAdminUser(req.user);

export const isAdmin: Access = ({ req: { user } }) => isAdminUser(user);

export const canManageContent: Access = ({ req: { user } }) =>
  hasRole(user, ["operator", "admin", "editor", "seo-manager"]);

export const canManageContentField: FieldAccess = ({ req }) =>
  hasRole(req.user, ["operator", "admin", "editor", "seo-manager"]);

export const canDeleteContent: Access = ({ req: { user } }) => hasRole(user, ["operator", "admin", "editor"]);

export const canReviewMarketing: Access = ({ req: { user } }) =>
  hasRole(user, ["operator", "admin", "editor", "seo-manager", "client-reviewer"]);

export const canReviewMarketingField: FieldAccess = ({ req }) =>
  hasRole(req.user, ["operator", "admin", "editor", "seo-manager", "client-reviewer"]);

export const canManageInfrastructure: Access = ({ req: { user } }) => hasRole(user, ["operator"]);

export const canManageInfrastructureField: FieldAccess = ({ req }) => hasRole(req.user, ["operator"]);

export const canReadUsers: Access = ({ req: { user } }) => {
  if (hasRole(user, ["operator", "admin"])) {
    return true;
  }

  const userId = getUserId(user);
  if (!userId) {
    return false;
  }

  return {
    id: {
      equals: userId,
    },
  };
};

export const publishedOrCanManageContent: Access = ({ req: { user } }) => {
  if (hasRole(user, ["operator", "admin", "editor", "seo-manager"])) {
    return true;
  }

  return {
    _status: {
      equals: "published",
    },
  } satisfies Where;
};
