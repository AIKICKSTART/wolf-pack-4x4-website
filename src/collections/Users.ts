import type { CollectionBeforeValidateHook, CollectionConfig } from "payload";

import { canAccessAdminPanel, canReadUsers, isAdmin, isAdminField } from "./access.ts";

const assignDefaultRole: CollectionBeforeValidateHook = async ({ data, operation, req }) => {
  if (operation !== "create") {
    return data;
  }

  const nextData = data ?? {};
  const { totalDocs } = await req.payload.count({
    collection: "users",
    overrideAccess: true,
  });

  if (totalDocs === 0) {
    return {
      ...nextData,
      role: "operator",
    };
  }

  if (!nextData.role) {
    return {
      ...nextData,
      role: "client-reviewer",
    };
  }

  return nextData;
};

export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    group: "Admin",
    useAsTitle: "email",
  },
  access: {
    admin: canAccessAdminPanel,
    create: isAdmin,
    delete: isAdmin,
    read: canReadUsers,
    update: isAdmin,
  },
  hooks: {
    beforeValidate: [assignDefaultRole],
  },
  fields: [
    {
      name: "name",
      type: "text",
    },
    {
      name: "role",
      type: "select",
      access: {
        create: isAdminField,
        update: isAdminField,
      },
      defaultValue: "client-reviewer",
      options: [
        { label: "Operator", value: "operator" },
        { label: "Admin", value: "admin" },
        { label: "Editor", value: "editor" },
        { label: "SEO manager", value: "seo-manager" },
        { label: "Client reviewer", value: "client-reviewer" },
      ],
      required: true,
      saveToJWT: true,
    },
  ],
};
