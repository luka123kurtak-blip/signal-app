export function ConnectionStatus({ connected }: { connected: boolean }) {
  return (
    <div
      style={{
        fontSize: 13,
        color: connected ? "#27ae60" : "#e67e22",
        display: "flex",
        alignItems: "center",
        gap: 6,
      }}
    >
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: connected ? "#27ae60" : "#e67e22",
        }}
      />
      {connected ? "Підключено" : "Підключення…"}
    </div>
  );
}
