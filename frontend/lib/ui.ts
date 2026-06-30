export const pageStyle = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
} as const;

export const rolePageStyle = {
  ...pageStyle,
  flexDirection: "column" as const,
  gap: 24,
  padding: 24,
};

export const buttonStyle = (pressed: boolean, color = "#2ecc71", pressedColor = "#1f8f3a") => ({
  width: 160,
  height: 160,
  borderRadius: 16,
  border: "none",
  backgroundColor: pressed ? pressedColor : color,
  color: "white",
  fontSize: 18,
  fontWeight: "bold" as const,
  cursor: "pointer",
  transition: "background-color 0.1s",
  touchAction: "manipulation" as const,
  WebkitTapHighlightColor: "transparent",
});

export const roleButtonStyle = {
  width: 220,
  padding: "20px 32px",
  borderRadius: 16,
  border: "none",
  color: "white",
  fontSize: 20,
  fontWeight: "bold" as const,
  cursor: "pointer",
  touchAction: "manipulation" as const,
  WebkitTapHighlightColor: "transparent",
} as const;

export function getSocketUrl() {
  const envUrl = process.env.NEXT_PUBLIC_SOCKET_URL?.trim();
  if (envUrl) {
    return envUrl.replace(/\/$/, "");
  }

  if (typeof window !== "undefined") {
    const protocol = window.location.protocol === "https:" ? "https:" : "http:";
    return `${protocol}//${window.location.hostname}:3001`;
  }

  return "http://localhost:3001";
}
