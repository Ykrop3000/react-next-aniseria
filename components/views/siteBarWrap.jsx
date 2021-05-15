export default function SiteBar({ children }) {
  return (
    <div
      style={{
        position: "sticky",
        top: "42px",
      }}
    >
      {children}
    </div>
  );
}
