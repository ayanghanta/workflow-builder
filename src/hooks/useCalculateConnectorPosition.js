import { useLayoutEffect, useState } from "react";
import { useNodeContext } from "../context/NodesContext";

export function useCalculateConnectorPosition({ targetNodeId, sourceNodeId }) {
  const { elementRefs } = useNodeContext();
  const [canvasHeight, setCanvasHeight] = useState(() => window.innerHeight);
  const [position, setPosition] = useState({});

  useLayoutEffect(
    function () {
      if (elementRefs.current.length === 0) return;

      const maxBottom = Math.max(
        ...elementRefs.current.map(({ el }) => {
          if (!el) return 0;
          const rect = el.getBoundingClientRect();
          return rect.bottom + window.scrollY;
        }),
        window.innerHeight
      );

      setCanvasHeight(maxBottom);

      function updatePosition() {
        const targetNodeRef = elementRefs.current.find(
          (nRf) => nRf.id === targetNodeId
        )?.el;

        const sourseNodeRef = elementRefs.current.find(
          (nRf) => nRf.id === sourceNodeId
        )?.el;

        if (!targetNodeRef || !sourseNodeRef) return;

        const sourseRect = sourseNodeRef.getBoundingClientRect();

        const targetRect = targetNodeRef.getBoundingClientRect();

        const x1 = sourseRect.left + sourseRect.width / 2 + window.scrollX;
        const y1 = sourseRect.bottom + window.scrollY;
        const x2 = targetRect.left + targetRect.width / 2 + window.scrollX;
        const y2 = targetRect.top + window.scrollY;

        setPosition({ x1, y1, x2, y2 });
      }
      updatePosition();

      window.addEventListener("resize", updatePosition);
      window.addEventListener("scroll", updatePosition);

      return () => {
        window.removeEventListener("resize", updatePosition);
        window.removeEventListener("scroll", updatePosition);
      };
    },
    [targetNodeId, sourceNodeId, elementRefs]
  );

  return { canvasHeight, position };
}
