import { useEffect, useState } from "react";
import axios from "axios";

import ProductModal from "../components/ProductModal";
import DeleteModal from "../components/DeleteModal";
import ProductCard from "../components/ProductCard";
import { LayoutGrid } from "lucide-react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);

  const API_URL = import.meta.env.VITE_BACKEND_URL;
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/products`, {
        withCredentials: true,
      });

      console.log(data);

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
        {
          status: updatedStatus,
        },
        {
          withCredentials: true,
        },
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

  return (
    <div className="p-8">
      <div className="flex justify-between mb-8">
        <h1 className="text-3xl font-semibold">Products</h1>

        <button
          onClick={() => {
            setSelectedProduct(null);
            setOpenModal(true);
          }}
          className="bg-blue-600 text-white px-5 py-2 rounded"
        >
          Add Product
        </button>
      </div>

      {products.length === 0 ? (
        <div className="h-[70vh] flex flex-col justify-center items-center">
          <LayoutGrid size={70} className="text-[#0A1970]" />

          <h2 className="text-xl font-semibold mt-6">
            Feels a little empty over here...{" "}
          </h2>

          <p className="text-gray-500 mt-1 text-xs">
            you can create products without connecting the store{" "}
          </p>
          <p className="text-gray-500 mt-1 text-xs">
            you can add products to the store anytime
          </p>

          <button
            onClick={() => setOpenModal(true)}
            className="mt-6 bg-blue-600 text-white px-9 py-2 rounded"
          >
            Add Your Products
          </button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onToggle={handleToggleStatus}
              onEdit={(product) => {
                setSelectedProduct(product);
                setOpenModal(true);
              }}
              onDelete={(product) => {
                setSelectedProduct(product);
                setDeleteModal(true);
              }}
            />
          ))}
        </div>
      )}

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
        onToggle={handleToggleStatus}
      />
    </div>
  );
};

export default Products;
