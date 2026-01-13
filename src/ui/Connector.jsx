function Connector({ position }) {
  if (!position) return null;
  const { x1, y1, x2, y2 } = position;
  return (
    <svg
      width="100%"
      height="100%"
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
      }}
    >
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="black" strokeWidth="3" />
    </svg>
  );
}

export default Connector;
