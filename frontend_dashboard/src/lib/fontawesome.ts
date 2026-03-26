import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

// Prevent Font Awesome from automatically adding its CSS <style> tag to the <head>.
// We import the CSS once (above) to keep styling deterministic in Next.js.
config.autoAddCss = false;
