"use client";

import { useEffect } from "react";

/**
 * Client-side content protection. Blocks the obvious casual-copy paths —
 * context menu, drag-to-save, Ctrl+U/Ctrl+S/Ctrl+C/Ctrl+P and
 * common devtools shortcuts. A determined user with devtools or `view-source:`
 * can still get at the markup — this is deterrent, not DRM.
 *
 * Form inputs are left alone so people can still type into the wishlist &
 * contact forms.
 */
export default function ContentGuard() {
  useEffect(() => {
    const isFormField = (t: EventTarget | null) => {
      const el = t as HTMLElement | null;
      if (!el) return false;
      const tag = el.tagName;
      return (
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        tag === "SELECT" ||
        el.isContentEditable
      );
    };

    const onContext = (e: MouseEvent) => {
      e.preventDefault();
    };
    const onDrag = (e: DragEvent) => {
      e.preventDefault();
    };
    const onCopyCut = (e: ClipboardEvent) => {
      if (isFormField(e.target)) return;
      e.preventDefault();
    };
    const onSelectStart = (e: Event) => {
      if (isFormField(e.target)) return;
      e.preventDefault();
    };
    const onKey = (e: KeyboardEvent) => {
      // Allow typing into form fields
      if (isFormField(e.target)) return;
      const k = e.key.toLowerCase();
      const ctrl = e.ctrlKey || e.metaKey;

      // Block F12
      if (e.key === "F12") {
        e.preventDefault();
        return;
      }
      // Block Ctrl+U (view source), Ctrl+S (save page), Ctrl+P (print),
      // Ctrl+Shift+I / J / C (devtools), Ctrl+Shift+S (save-as)
      if (ctrl && ["u", "s", "p"].includes(k)) {
        e.preventDefault();
        return;
      }
      if (ctrl && e.shiftKey && ["i", "j", "c", "s", "k"].includes(k)) {
        e.preventDefault();
        return;
      }
      // Block Ctrl+C / Ctrl+X outside inputs
      if (ctrl && (k === "c" || k === "x" || k === "a")) {
        e.preventDefault();
        return;
      }
    };

    document.addEventListener("contextmenu", onContext);
    document.addEventListener("dragstart", onDrag);
    document.addEventListener("drop", onDrag);
    document.addEventListener("copy", onCopyCut);
    document.addEventListener("cut", onCopyCut);
    document.addEventListener("selectstart", onSelectStart);
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("contextmenu", onContext);
      document.removeEventListener("dragstart", onDrag);
      document.removeEventListener("drop", onDrag);
      document.removeEventListener("copy", onCopyCut);
      document.removeEventListener("cut", onCopyCut);
      document.removeEventListener("selectstart", onSelectStart);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return null;
}
