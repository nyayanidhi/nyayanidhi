export default function LoadingComponent() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div
        className="animate-spin h-12 w-12 mb-4"
        style={{
          border: "4px solid #2563EB",
          borderTopColor: "transparent",
        }}
      />
      <p className="text-lg text-gray-500">Loading...</p>
    </div>
  );
}
