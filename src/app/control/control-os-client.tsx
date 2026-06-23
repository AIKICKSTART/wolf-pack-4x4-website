"use client";

import { AlertTriangle, Blocks, Bot, ExternalLink, FilePenLine, Globe2, Megaphone, RefreshCw, ShieldCheck } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import type { ControlOsViewer } from "@/lib/control-os-auth";
import type { ControlOsHealth, ControlOsLaunchSection, ControlOsService } from "@/lib/control-os";

import styles from "./control-os.module.css";

type Props = {
  health: ControlOsHealth;
  launchSections: ControlOsLaunchSection[];
  registryStats: {
    blocks: number;
    families: number;
    improved: number;
    primitives: number;
  };
  services: ControlOsService[];
  viewer: ControlOsViewer;
};

const launchIcons: Record<ControlOsLaunchSection["id"], typeof Globe2> = {
  "cms-workflow": FilePenLine,
  "hermes-control": Bot,
  "postiz-marketing": Megaphone,
  "website-sections": Globe2,
};

function formatCheckedAt(value: string) {
  const normalized = value.replace("T", " ").slice(0, 19);
  return normalized ? `${normalized} UTC` : "unknown";
}

export function ControlOsClient({ health, launchSections, registryStats, services, viewer }: Props) {
  const [activeId, setActiveId] = useState(services[0]?.id ?? "website");
  const [blockedFrameIds, setBlockedFrameIds] = useState<Set<string>>(() => new Set());
  const [loadedFrameIds, setLoadedFrameIds] = useState<Set<string>>(() => new Set());
  const [currentHealth, setCurrentHealth] = useState(health);
  const [healthError, setHealthError] = useState<string | null>(null);
  const [isRefreshingHealth, setIsRefreshingHealth] = useState(false);
  const activeService = services.find((service) => service.id === activeId) ?? services[0];
  const healthById = useMemo(
    () => new Map(currentHealth.services.map((service) => [service.id, service])),
    [currentHealth.services],
  );
  const activeFrameBlocked = activeService?.frameMode === "embed" && blockedFrameIds.has(activeService.id);
  const activeFrameLoaded = activeService?.frameMode === "embed" && loadedFrameIds.has(activeService.id);

  async function refreshHealth() {
    setIsRefreshingHealth(true);
    setHealthError(null);

    try {
      const response = await fetch("/control/health", {
        cache: "no-store",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(response.status === 401 ? "Sign in again to refresh health." : `Health refresh failed (${response.status}).`);
      }

      const nextHealth = (await response.json()) as ControlOsHealth;
      setCurrentHealth(nextHealth);
    } catch (error) {
      setHealthError(error instanceof Error ? error.message : "Health refresh failed.");
    } finally {
      setIsRefreshingHealth(false);
    }
  }

  useEffect(() => {
    if (!activeService || activeService.frameMode !== "embed" || activeFrameBlocked || activeFrameLoaded) return;

    const timer = window.setTimeout(() => {
      setBlockedFrameIds((previous) => new Set(previous).add(activeService.id));
    }, 8000);

    return () => window.clearTimeout(timer);
  }, [activeFrameBlocked, activeFrameLoaded, activeService]);

  if (!activeService) return null;

  return (
    <main className={styles.shell}>
      <header className={styles.topbar}>
        <div className={styles.brand}>
          <span className={styles.eyebrow}>Wolfpack Control OS</span>
          <h1>Website and marketing cockpit</h1>
          <p>{viewer.name ?? viewer.email ?? viewer.role} access</p>
        </div>
        <div className={styles.healthPanel} aria-busy={isRefreshingHealth}>
          <div className={styles.statusStrip} aria-label="Service health">
            {services.map((service) => {
              const status = healthById.get(service.id);
              return (
                <span className={styles.pill} data-ok={status?.ok === true} key={service.id}>
                  <ShieldCheck size={15} aria-hidden="true" />
                  {service.label}: {status?.status ?? "unchecked"}
                </span>
              );
            })}
          </div>
          <div className={styles.healthActions}>
            <span className={styles.checkedAt}>Checked {formatCheckedAt(currentHealth.checkedAt)}</span>
            <button
              className={`${styles.action} ${styles.secondaryAction} ${styles.actionButton}`}
              disabled={isRefreshingHealth}
              onClick={refreshHealth}
              type="button"
            >
              <RefreshCw size={16} aria-hidden="true" data-spinning={isRefreshingHealth} />
              {isRefreshingHealth ? "Refreshing" : "Refresh health"}
            </button>
          </div>
          {healthError ? (
            <p className={styles.healthError} role="status">
              <AlertTriangle size={15} aria-hidden="true" />
              {healthError}
            </p>
          ) : null}
        </div>
      </header>

      <div className={styles.layout}>
        <nav className={styles.rail} aria-label="Control OS systems">
          <div className={styles.registryPanel} aria-label="UI primitive registry status">
            <span className={styles.eyebrow}>Primitive registry</span>
            <strong>{registryStats.primitives.toLocaleString()} components</strong>
            <div className={styles.registryGrid}>
              <span>
                <b>{registryStats.families}</b>
                Families
              </span>
              <span>
                <b>{registryStats.blocks}</b>
                CMS blocks
              </span>
              <span>
                <b>{registryStats.improved}</b>
                Improved
              </span>
            </div>
          </div>
          {services.map((service) => {
            const status = healthById.get(service.id);

            return (
              <button
                className={styles.tab}
                data-active={service.id === activeService.id}
                data-ok={status?.ok === true}
                key={service.id}
                onClick={() => setActiveId(service.id)}
                type="button"
              >
                <ShieldCheck size={18} aria-hidden="true" />
                <span>
                  {service.label}
                  <small>
                    {service.owner}
                    <span className={styles.tabStatus}>{status?.status ?? "unchecked"}</span>
                  </small>
                </span>
              </button>
            );
          })}
        </nav>

        <section className={styles.main} aria-labelledby="control-os-active-title">
          <div className={styles.serviceHeader}>
            <div>
              <span className={styles.eyebrow}>{activeService.operatorOnly ? "Operator only" : "Client approved"}</span>
              <h2 id="control-os-active-title">{activeService.label}</h2>
            </div>
            <div className={styles.actions}>
              <a className={styles.action} href={activeService.url} rel="noreferrer" target="_blank">
                <ExternalLink size={16} aria-hidden="true" />
                Open system
              </a>
              <a className={`${styles.action} ${styles.secondaryAction}`} href="/admin" rel="noreferrer" target="_blank">
                CMS admin
              </a>
            </div>
          </div>
          <section className={styles.launchpad} aria-label="Connected website workflows">
            {launchSections.map((section) => {
              const Icon = launchIcons[section.id] ?? Blocks;

              return (
                <article className={styles.launchCard} key={section.id}>
                  <header className={styles.launchHeader}>
                    <Icon size={18} aria-hidden="true" />
                    <div>
                      <h3>{section.title}</h3>
                      <p>{section.summary}</p>
                    </div>
                  </header>
                  <div className={styles.launchLinks}>
                    {section.links.map((link) => {
                      const status = healthById.get(link.serviceId);

                      return (
                        <a className={styles.launchLink} href={link.href} key={`${section.id}-${link.label}`} rel="noreferrer" target="_blank">
                          <span>
                            {link.label}
                            <small>{link.description}</small>
                          </span>
                          <span className={styles.launchStatus} data-ok={status?.ok === true}>
                            {status?.status ?? "unchecked"}
                          </span>
                        </a>
                      );
                    })}
                  </div>
                </article>
              );
            })}
          </section>
          <div className={styles.frameWrap}>
            {activeService.frameMode === "embed" && !activeFrameBlocked ? (
              <iframe
                className={styles.frame}
                key={activeService.id}
                onError={() => setBlockedFrameIds((previous) => new Set(previous).add(activeService.id))}
                onLoad={() => setLoadedFrameIds((previous) => new Set(previous).add(activeService.id))}
                referrerPolicy="no-referrer"
                sandbox="allow-forms allow-popups allow-same-origin allow-scripts"
                src={activeService.frameUrl}
                title={`${activeService.label} embedded operator view`}
              />
            ) : (
              <div className={styles.launchOnly}>
                <ShieldCheck size={24} aria-hidden="true" />
                <p>
                  {activeFrameBlocked
                    ? "This system blocked the embedded view or did not load in time. Open it in its protected app instead."
                    : "This system opens in its own protected app so terminal, deployment, and agent controls stay isolated."}
                </p>
                <a className={styles.action} href={activeService.url} rel="noreferrer" target="_blank">
                  <ExternalLink size={16} aria-hidden="true" />
                  Open {activeService.label}
                </a>
                {activeFrameBlocked ? (
                  <button
                    className={`${styles.action} ${styles.secondaryAction} ${styles.actionButton}`}
                    onClick={() => {
                      setBlockedFrameIds((previous) => {
                        const next = new Set(previous);
                        next.delete(activeService.id);
                        return next;
                      });
                      setLoadedFrameIds((previous) => {
                        const next = new Set(previous);
                        next.delete(activeService.id);
                        return next;
                      });
                    }}
                    type="button"
                  >
                    Try embed again
                  </button>
                ) : null}
              </div>
            )}
            <p className={styles.fallback}>
              If the upstream app blocks embedding, use Open system. Hermes terminals and deployment controls remain operator-only.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
