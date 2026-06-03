import { LayoutGrid } from "lucide-react";

const EmptyState = ({ activeTab }) => {
  return (
    <div className="h-[80vh] flex flex-col items-center justify-center">
      <LayoutGrid
        size={70}
        className="text-[#0A1970]"
      />

      <h2 className="text-4xl font-semibold mt-8 text-[#374151]">
        No {activeTab} Products
      </h2>

      <p className="text-gray-400 mt-3 text-center">
        Your {activeTab} products will appear here
        <br />
        Create your first product to publish
      </p>
    </div>
  );
};

export default EmptyState;