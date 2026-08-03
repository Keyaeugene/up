import { useEffect, useRef } from "react";

const SCAN_RESET_MS = 300;
const MIN_BARCODE_LENGTH = 3;

export function useBarcodeScanner(onScan: (code: string) => void) {
  const bufferRef = useRef("");
  const lastKeyTimeRef = useRef(0);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null;
      const tag = target?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || target?.isContentEditable) {
        return;
      }

      const now = Date.now();
      if (now - lastKeyTimeRef.current > SCAN_RESET_MS) {
        bufferRef.current = "";
      }
      lastKeyTimeRef.current = now;

      if (e.key === "Enter") {
        const code = bufferRef.current;
        bufferRef.current = "";
        if (code.length >= MIN_BARCODE_LENGTH) {
          onScan(code);
        }
        return;
      }

      if (e.key.length === 1) {
        bufferRef.current += e.key;
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onScan]);
}
