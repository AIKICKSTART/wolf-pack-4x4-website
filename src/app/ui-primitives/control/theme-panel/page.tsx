import type { Metadata } from "next";

import { ThemeProvider } from "../../builder/theme";
import { TOKEN_CONTROL_COUNT } from "../../builder/theme-catalog";
import { PageHeader } from "../../components/page-header";
import { ThemeControlPanel } from "./theme-control-panel";
import styles from "./theme-panel.module.css";

export const metadata: Metadata = {
  title: "Theme control panel | UI Primitives",
};

/**
 * Showcase route for the theme control panel. The {@link ThemeProvider} wraps
 * the panel + its live preview so token edits cascade only inside this preview
 * subtree (`disablePersistence` keeps the global saved theme choice intact).
 * Every `--primitive-*` token resolves because the route sits inside the
 * `ui-primitives` `.dashboard` scope provided by the layout shell.
 */
export default function ThemePanelShowcasePage() {
  return (
    <main className={styles.pageMain}>
      <PageHeader
        kicker="01 / Shared DNA / Theming"
        title="Theme control panel"
        description={`Adjust any of the ${TOKEN_CONTROL_COUNT} central design tokens — grouped by control level and category — and watch the live preview re-theme. Edits write CSS custom properties through the theme provider, never component hardcodes.`}
        dnaSectionId="theming"
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Theming", href: "/ui-primitives/theming" },
          { label: "Theme control panel" },
        ]}
      />

      <ThemeProvider disablePersistence>
        <ThemeControlPanel initialLevel="global" />
      </ThemeProvider>
    </main>
  );
}
