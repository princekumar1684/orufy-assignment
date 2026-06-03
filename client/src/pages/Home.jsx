import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import ProductModal from "../components/ProductModal";
import { LayoutGrid } from "lucide-react";
import DeleteModal from "../components/DeleteModal";

const Home = () => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [activeTab, setActiveTab] = useState("published");
  const [products, setProducts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/products`, {
        withCredentials: true,
      });

      setProducts(data.products || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggleStatus = async (product) => {
    try {
      const updatedStatus =
        product.status === "published" ? "unpublished" : "published";

      await axios.post(
        `${API_URL}/api/products/update/${product._id}`,
        { status: updatedStatus },
        { withCredentials: true },
      );

      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.post(
        `${API_URL}/api/products/delete/${selectedProduct._id}`,
        {},
        {
          withCredentials: true,
        },
      );

      fetchProducts();
      setDeleteModal(false);
      setSelectedProduct(null);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(
    (product) => product.status === activeTab,
  );

  return (
    <div className="py-8">
      <div className="flex gap-10 border-b border-gray-300 mb-8 px-8">
        <button
          onClick={() => setActiveTab("published")}
          className={`pb-4 ${
            activeTab === "published"
              ? "border-b-2 border-blue-600 font-semibold"
              : "text-gray-500"
          }`}
        >
          Published
        </button>

        <button
          onClick={() => setActiveTab("unpublished")}
          className={`pb-4 ${
            activeTab === "unpublished"
              ? "border-b-2 border-blue-600 font-semibold"
              : "text-gray-500"
          }`}
        >
          Unpublished
        </button>
      </div>

      <div className="px-8">
        {filteredProducts.length === 0 ? (
          <div className="h-[70vh] flex flex-col justify-center items-center">
            <LayoutGrid size={70} className="text-[#0A1970]" />

            <h2 className="text-4xl font-semibold mt-6">
              No {activeTab} Products
            </h2>

            <p className="text-gray-500 mt-2">
              Your {activeTab} products will appear here
            </p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-4  sm:grid-cols-2 grid-cols-1  gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                showActions={true}
                onEdit={(p) => {
                  setSelectedProduct(p);
                  setOpenModal(true);
                }}
                onToggle={handleToggleStatus}
                onDelete={(p) => {
                  setSelectedProduct(p);
                  setDeleteModal(true);
                }}
              />
            ))}
          </div>
        )}
      </div>

      <ProductModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setSelectedProduct(null);
        }}
        product={selectedProduct}
        fetchProducts={fetchProducts}
      />

      <DeleteModal
        open={deleteModal}
        onClose={() => setDeleteModal(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default Home;
