import { useEffect, useRef } from "react";

export function useClickOutside(handler, listenCapturing = true) {
  const refEl = useRef(null);
  useEffect(
    function () {
      function handleClick(e) {
        if (refEl.current && !refEl.current.contains(e.target)) handler?.();
      }
      document.addEventListener("click", handleClick, listenCapturing);

      return () =>
        document.removeEventListener("click", handleClick, listenCapturing);
    },
    [handler, listenCapturing]
  );

  return { refEl };
}
