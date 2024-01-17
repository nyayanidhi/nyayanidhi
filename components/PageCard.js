export default function PageCard({ children }) {
  return (
    <div
      className="bg-gray-200 p-4 flex flex-col justify-between min-h-screen"
      style={{ minHeight: "calc(100vh - 60px)" }}
    >
      <div
        className="min-h-screen bg-white p-6 rounded shadow-lg"
        style={{ minHeight: "calc(100vh - 100px)" }}
      >
        {children}
      </div>
    </div>
  );
}
