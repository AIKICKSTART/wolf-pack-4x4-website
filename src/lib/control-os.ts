import "server-only";

import { siteUrl } from "@/lib/site-data";

export type ControlOsServiceId = "website" | "cms" | "primitives" | "hermes" | "postiz";

export type ControlOsService = {
  id: ControlOsServiceId;
  label: string;
  owner: string;
  url: string;
  healthUrl: string;
  frameUrl: string;
  frameMode: "embed" | "launch";
  operatorOnly: boolean;
};

export type ControlOsLaunchLink = {
  description: string;
  href: string;
  label: string;
  operatorOnly: boolean;
  serviceId: ControlOsServiceId;
};

export type ControlOsLaunchSection = {
  id: "website-sections" | "cms-workflow" | "hermes-control" | "postiz-marketing";
  links: ControlOsLaunchLink[];
  summary: string;
  title: string;
};

export type ControlOsHealth = {
  checkedAt: string;
  services: Array<{
    id: ControlOsServiceId;
    label: string;
    ok: boolean;
    status: "reachable" | "auth-required" | "unreachable";
    statusCode: number | null;
  }>;
};

function cleanOrigin(value: string | undefined, fallback: string) {
  const candidate = value?.trim();
  if (!candidate) return fallback;

  try {
    return new URL(candidate).origin;
  } catch {
    return fallback;
  }
}

function joinUrl(origin: string, path: string) {
  return new URL(path, origin).toString();
}

export function getControlOsServices(): ControlOsService[] {
  const websiteOrigin = cleanOrigin(
    process.env.CONTROL_OS_WEBSITE_URL ?? process.env.PAYLOAD_PUBLIC_SERVER_URL,
    siteUrl,
  );
  const cmsOrigin = cleanOrigin(process.env.CONTROL_OS_CMS_URL, websiteOrigin);
  const primitivesOrigin = cleanOrigin(process.env.CONTROL_OS_PRIMITIVES_URL, joinUrl(websiteOrigin, "/ui-primitives"));
  const hermesOrigin = cleanOrigin(process.env.CONTROL_OS_HERMES_URL, "https://hermes.wolfpack4x4.au");
  const postizOrigin = cleanOrigin(process.env.CONTROL_OS_POSTIZ_URL, "https://marketing.wolfpack4x4.au");

  return [
    {
      id: "website",
      label: "Website",
      owner: "Public customer site",
      url: websiteOrigin,
      healthUrl: websiteOrigin,
      frameUrl: websiteOrigin,
      frameMode: "embed",
      operatorOnly: false,
    },
    {
      id: "cms",
      label: "CMS",
      owner: "Payload content source",
      url: joinUrl(cmsOrigin, "/admin"),
      healthUrl: joinUrl(cmsOrigin, "/admin"),
      frameUrl: joinUrl(cmsOrigin, "/admin"),
      frameMode: "embed",
      operatorOnly: false,
    },
    {
      id: "primitives",
      label: "UI Primitives",
      owner: "Section and component registry",
      url: primitivesOrigin,
      healthUrl: primitivesOrigin,
      frameUrl: primitivesOrigin,
      frameMode: "embed",
      operatorOnly: false,
    },
    {
      id: "hermes",
      label: "Hermes",
      owner: "Agent control centre",
      url: hermesOrigin,
      healthUrl: hermesOrigin,
      frameUrl: hermesOrigin,
      frameMode: "launch",
      operatorOnly: true,
    },
    {
      id: "postiz",
      label: "Postiz",
      owner: "Social approval and scheduling",
      url: postizOrigin,
      healthUrl: postizOrigin,
      frameUrl: postizOrigin,
      frameMode: "launch",
      operatorOnly: true,
    },
  ];
}

function serviceById(services: ControlOsService[], id: ControlOsServiceId) {
  const service = services.find((candidate) => candidate.id === id);
  if (!service) {
    throw new Error(`Control OS service "${id}" is not registered.`);
  }

  return service;
}

function servicePath(services: ControlOsService[], id: ControlOsServiceId, path: string) {
  return joinUrl(serviceById(services, id).url, path);
}

export function getControlOsLaunchSections(services = getControlOsServices()): ControlOsLaunchSection[] {
  return [
    {
      id: "website-sections",
      title: "Website sections",
      summary: "Public customer routes for the production site shell.",
      links: [
        {
          description: "Public homepage and primary conversion surface.",
          href: servicePath(services, "website", "/"),
          label: "Homepage",
          operatorOnly: false,
          serviceId: "website",
        },
        {
          description: "Service index backed by CMS overrides and SEO data.",
          href: servicePath(services, "website", "/services"),
          label: "Services",
          operatorOnly: false,
          serviceId: "website",
        },
        {
          description: "Location landing pages for Illawarra and surrounding suburbs.",
          href: servicePath(services, "website", "/locations"),
          label: "Locations",
          operatorOnly: false,
          serviceId: "website",
        },
        {
          description: "4x4 parts lookup and fitment entry point.",
          href: servicePath(services, "website", "/parts"),
          label: "Parts",
          operatorOnly: false,
          serviceId: "website",
        },
        {
          description: "Published CMS posts and marketing content.",
          href: servicePath(services, "website", "/blog"),
          label: "Blog",
          operatorOnly: false,
          serviceId: "website",
        },
      ],
    },
    {
      id: "cms-workflow",
      title: "CMS workflow",
      summary: "Payload collections plus the primitive block studio used to assemble pages.",
      links: [
        {
          description: "Payload dashboard for operators and editors.",
          href: servicePath(services, "cms", "/admin"),
          label: "Payload admin",
          operatorOnly: false,
          serviceId: "cms",
        },
        {
          description: "Campaign and landing pages with block layouts.",
          href: servicePath(services, "cms", "/admin/collections/marketing-pages"),
          label: "Marketing pages",
          operatorOnly: false,
          serviceId: "cms",
        },
        {
          description: "Targeted page overrides for services, locations, parts, and standard pages.",
          href: servicePath(services, "cms", "/admin/collections/content-overrides"),
          label: "Content overrides",
          operatorOnly: false,
          serviceId: "cms",
        },
        {
          description: "The composed CMS builder primitive for block layout decisions.",
          href: servicePath(services, "primitives", "/ui-primitives/cms/full-studio"),
          label: "Block studio",
          operatorOnly: false,
          serviceId: "primitives",
        },
      ],
    },
    {
      id: "hermes-control",
      title: "Hermes control centre",
      summary: "Agent workspace, approval bridge, and operator dashboard surfaces.",
      links: [
        {
          description: "Protected Hermes Web UI for agent operation.",
          href: servicePath(services, "hermes", "/"),
          label: "Hermes app",
          operatorOnly: true,
          serviceId: "hermes",
        },
        {
          description: "Operator dashboard built from the UI primitive library.",
          href: servicePath(services, "primitives", "/ui-primitives/dashboards/hermes-operator"),
          label: "Operator dashboard",
          operatorOnly: true,
          serviceId: "primitives",
        },
        {
          description: "Hermes-specific agent primitives for chat, tools, safety, and handoff flows.",
          href: servicePath(services, "primitives", "/ui-primitives/hermes-agent"),
          label: "Agent primitives",
          operatorOnly: true,
          serviceId: "primitives",
        },
        {
          description: "Payload approval records created by Hermes before publishing or scheduling.",
          href: servicePath(services, "cms", "/admin/collections/marketing-approvals"),
          label: "Approval queue",
          operatorOnly: true,
          serviceId: "cms",
        },
      ],
    },
    {
      id: "postiz-marketing",
      title: "Marketing publishing",
      summary: "Postiz scheduling and supporting content-system primitives.",
      links: [
        {
          description: "Protected Postiz dashboard for social scheduling.",
          href: servicePath(services, "postiz", "/"),
          label: "Postiz app",
          operatorOnly: true,
          serviceId: "postiz",
        },
        {
          description: "Social scheduler primitive surface for reviewing workflow states.",
          href: servicePath(services, "primitives", "/ui-primitives/social-scheduler"),
          label: "Scheduler primitives",
          operatorOnly: true,
          serviceId: "primitives",
        },
        {
          description: "Email builder primitive surface for campaign drafts.",
          href: servicePath(services, "primitives", "/ui-primitives/email-builder"),
          label: "Email builder",
          operatorOnly: true,
          serviceId: "primitives",
        },
      ],
    },
  ];
}

async function checkService(service: ControlOsService): Promise<ControlOsHealth["services"][number]> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 2500);

  try {
    const response = await fetch(service.healthUrl, {
      cache: "no-store",
      method: "GET",
      redirect: "manual",
      signal: controller.signal,
    });
    const authRequired = response.status === 401 || response.status === 403 || response.status === 302 || response.status === 307;
    const reachable = response.status >= 200 && response.status < 300;

    return {
      id: service.id,
      label: service.label,
      ok: reachable || authRequired,
      status: authRequired ? "auth-required" : reachable ? "reachable" : "unreachable",
      statusCode: response.status,
    };
  } catch {
    return {
      id: service.id,
      label: service.label,
      ok: false,
      status: "unreachable",
      statusCode: null,
    };
  } finally {
    clearTimeout(timeout);
  }
}

export async function getControlOsHealth(services = getControlOsServices()): Promise<ControlOsHealth> {
  return {
    checkedAt: new Date().toISOString(),
    services: await Promise.all(services.map(checkService)),
  };
}
