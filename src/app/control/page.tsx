import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { filterControlOsServicesForViewer, getControlOsViewer } from "@/lib/control-os-auth";
import { getControlOsHealth, getControlOsLaunchSections, getControlOsServices } from "@/lib/control-os";
import { getRegistryStats } from "@/lib/primitives/registry";

import { ControlOsClient } from "./control-os-client";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Control OS",
  robots: {
    follow: false,
    index: false,
  },
};

export default async function ControlOsPage() {
  const requestHeaders = await headers();
  const viewer = await getControlOsViewer(requestHeaders);

  if (!viewer) {
    redirect("/admin/login?redirect=%2Fcontrol");
  }

  const allServices = getControlOsServices();
  const services = filterControlOsServicesForViewer(allServices, viewer);
  const health = await getControlOsHealth(services);
  const registryStats = getRegistryStats();
  const launchSections = getControlOsLaunchSections(allServices)
    .map((section) => ({
      ...section,
      links: section.links.filter((link) => viewer.isOperator || !link.operatorOnly),
    }))
    .filter((section) => section.links.length > 0);

  return (
    <ControlOsClient
      health={health}
      launchSections={launchSections}
      registryStats={registryStats}
      services={services}
      viewer={viewer}
    />
  );
}
