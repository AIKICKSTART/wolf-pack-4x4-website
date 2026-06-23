import type { CollectionConfig } from "payload";

import { canDeleteContent, canManageContent } from "./access.ts";

export const Enquiries: CollectionConfig = {
  slug: "enquiries",
  labels: {
    singular: "Enquiry",
    plural: "Enquiries",
  },
  admin: {
    defaultColumns: ["customerName", "phone", "vehicle", "status", "updatedAt"],
    group: "Leads",
    useAsTitle: "customerName",
  },
  access: {
    create: canManageContent,
    delete: canDeleteContent,
    read: canManageContent,
    update: canManageContent,
  },
  fields: [
    {
      name: "customerName",
      type: "text",
      required: true,
    },
    {
      name: "email",
      type: "email",
    },
    {
      name: "phone",
      type: "text",
      required: true,
    },
    {
      name: "vehicle",
      type: "text",
    },
    {
      name: "serviceInterest",
      type: "select",
      options: [
        { label: "Suspension and lift kits", value: "suspension-lift-kits" },
        { label: "Bull bars and protection", value: "bull-bars-protection" },
        { label: "Winches and recovery gear", value: "winches-recovery-gear" },
        { label: "4x4 lighting and electrical", value: "4x4-lighting-electrical" },
        { label: "Dual battery systems", value: "dual-battery-systems" },
        { label: "Canopies, racks and storage", value: "canopies-roof-racks-storage" },
        { label: "Towing and GVM support", value: "towing-gvm-upgrades" },
        { label: "Performance 4x4 upgrades", value: "performance-4x4-upgrades" },
        { label: "4x4 parts enquiry", value: "parts" },
        { label: "Other workshop enquiry", value: "other" },
      ],
    },
    {
      name: "message",
      type: "textarea",
      required: true,
    },
    {
      name: "source",
      type: "select",
      defaultValue: "website",
      options: [
        { label: "Website", value: "website" },
        { label: "Phone", value: "phone" },
        { label: "Email", value: "email" },
        { label: "Postiz campaign", value: "postiz" },
        { label: "Manual entry", value: "manual" },
      ],
      required: true,
    },
    {
      name: "status",
      type: "select",
      defaultValue: "new",
      options: [
        { label: "New", value: "new" },
        { label: "Needs follow-up", value: "needs-follow-up" },
        { label: "Quoted", value: "quoted" },
        { label: "Booked", value: "booked" },
        { label: "Closed", value: "closed" },
      ],
      required: true,
    },
    {
      name: "internalNotes",
      type: "textarea",
    },
  ],
};
