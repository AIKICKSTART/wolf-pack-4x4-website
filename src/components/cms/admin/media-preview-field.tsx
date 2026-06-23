"use client";

import { useDocumentInfo } from "@payloadcms/ui";
import { useState, type CSSProperties } from "react";

const MIN_ZOOM = 1;
const MAX_ZOOM = 3;
const ZOOM_STEP = 0.5;

const captionStyle: CSSProperties = {
  color: "var(--theme-elevation-500)",
  fontSize: 13,
  margin: "8px 0 0",
};

const zoomButtonStyle: CSSProperties = {
  alignItems: "center",
  background: "var(--theme-input-bg)",
  border: "1px solid var(--theme-border-color)",
  borderRadius: 4,
  color: "inherit",
  cursor: "pointer",
  display: "inline-flex",
  height: 28,
  justifyContent: "center",
  lineHeight: 1,
  width: 28,
};

export function MediaPreviewField() {
  const { savedDocumentData } = useDocumentInfo();
  const [zoom, setZoom] = useState<number>(1);

  // Create view: nothing uploaded/saved yet.
  if (!savedDocumentData) {
    return null;
  }

  const mimeType = typeof savedDocumentData.mimeType === "string" ? savedDocumentData.mimeType : "";
  const url = typeof savedDocumentData.url === "string" ? savedDocumentData.url : "";
  const filename = typeof savedDocumentData.filename === "string" ? savedDocumentData.filename : "";
  const alt = typeof savedDocumentData.alt === "string" ? savedDocumentData.alt : "";

  if (!url) {
    return null;
  }

  if (mimeType.startsWith("video/")) {
    return (
      <div style={{ marginBottom: 24 }}>
        <video
          controls
          preload="metadata"
          src={url}
          style={{ background: "#000", borderRadius: 8, maxWidth: 760, width: "100%" }}
        />
        <p style={captionStyle}>{filename}</p>
      </div>
    );
  }

  if (mimeType.startsWith("image/")) {
    const zoomOut = () => setZoom((z) => Math.max(MIN_ZOOM, +(z - ZOOM_STEP).toFixed(2)));
    const zoomIn = () => setZoom((z) => Math.min(MAX_ZOOM, +(z + ZOOM_STEP).toFixed(2)));

    return (
      <div style={{ marginBottom: 24 }}>
        <div style={{ alignItems: "center", display: "flex", gap: 8, marginBottom: 8 }}>
          <button
            aria-label="Zoom out"
            disabled={zoom <= MIN_ZOOM}
            onClick={zoomOut}
            style={zoomButtonStyle}
            type="button"
          >
            &minus;
          </button>
          <span style={{ fontVariantNumeric: "tabular-nums", minWidth: 44, textAlign: "center" }}>
            {Math.round(zoom * 100)}%
          </span>
          <button
            aria-label="Zoom in"
            disabled={zoom >= MAX_ZOOM}
            onClick={zoomIn}
            style={zoomButtonStyle}
            type="button"
          >
            +
          </button>
        </div>
        <div
          style={{
            border: "1px solid var(--theme-border-color)",
            borderRadius: 8,
            maxHeight: 480,
            maxWidth: 760,
            overflow: "auto",
          }}
        >
          <img
            alt={alt || filename}
            src={url}
            style={{ display: "block", height: "auto", width: `${zoom * 100}%` }}
          />
        </div>
        <p style={captionStyle}>{filename}</p>
      </div>
    );
  }

  return (
    <p style={{ marginBottom: 24 }}>
      <a href={url} rel="noreferrer" target="_blank">
        {filename || url}
      </a>
    </p>
  );
}

export default MediaPreviewField;
