import { useEffect, useState } from "react";
import axios from "axios";
import { X } from "lucide-react";

const ProductModal = ({ open, onClose, product, fetchProducts }) => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    type: "Foods",
    quantity: "",
    mrp: "",
    price: "",
    status: "published",
    isExchangeable: false,
    images: [],
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        type: product.type || "Foods",
        quantity: product.quantity || "",
        mrp: product.mrp || "",
        price: product.price || "",
        status: product.status || "published",
        isExchangeable: product.isExchangeable || false,
        images: product.images || [],
      });
    } else {
      setFormData({
        name: "",
        type: "Foods",
        quantity: "",
        mrp: "",
        price: "",
        status: "published",
        isExchangeable: false,
        images: [],
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: name === "isExchangeable" ? value === "true" : value,
    });
  };

  const uploadImage = async (file) => {
    const form = new FormData();

    form.append("image", file);

    const { data } = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/upload/image `,
      form,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      },
    );

    return data.imageUrl;
  };

  const handleImageUpload = async (e) => {
    try {
      const files = [...e.target.files];

      const uploadedImages = await Promise.all(
        files.map((file) => uploadImage(file)),
      );

      console.log(uploadedImages);

      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...uploadedImages],
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const removeImage = (index) => {
    const images = [...formData.images];

    images.splice(index, 1);

    setFormData({
      ...formData,
      images,
    });
  };

  const handleSubmit = async () => {
    if (
      !formData.name ||
      !formData.quantity ||
      !formData.mrp ||
      !formData.price
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      if (product) {
        await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/update/${product._id}`,
          formData,
          {
            withCredentials: true,
          },
        );

        alert("Product Updated");
      } else {
        await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/create`,
          formData,
          {
            withCredentials: true,
          },
        );

        alert("Product Created");
      }

      fetchProducts();

      onClose();
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center">
      <div className="bg-white w-[650px] rounded-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="text-2xl font-semibold">
            {product ? "Edit Product" : "Add Product"}
          </h2>

          <button onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-2">
          <div>
            <label className="font-medium">Product Name</label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

          <div>
            <label className="font-medium">Product Type</label>

            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
            >
              <option>Foods</option>
              <option>Electronics</option>
              <option>Fashion</option>
              <option>Books</option>
            </select>
          </div>

          <div>
            <label className="font-medium">Quantity Stock</label>

            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

          <div>
            <label className="font-medium">MRP</label>

            <input
              type="number"
              name="mrp"
              value={formData.mrp}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

          <div>
            <label className="font-medium">Selling Price</label>

            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

          <div>
            <label className="font-medium">Status</label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
            >
              <option value="published">Published</option>

              <option value="unpublished">Unpublished</option>
            </select>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="font-medium">Upload Product Images</label>

              <label htmlFor="images" className="text-blue-600 cursor-pointer">
                Add More Photos
              </label>
            </div>

            <label
              htmlFor="images"
              className="border-2 border-dashed rounded-xl min-h-[120px] flex items-center justify-center cursor-pointer"
            >
              Click To Upload
            </label>

            <input
              id="images"
              type="file"
              multiple
              className="hidden"
              onChange={handleImageUpload}
            />

            <div className="flex gap-3 flex-wrap mt-4">
              {formData.images?.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image}
                    alt=""
                    className="w-20 h-20 rounded-lg object-contain border p-1"
                  />

                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-white border rounded-full w-6 h-6 text-red-500"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="font-medium">Exchange Eligibility</label>

            <select
              name="isExchangeable"
              value={formData.isExchangeable}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
            >
              <option value={true}>Yes</option>

              <option value={false}>No</option>
            </select>
          </div>
        </div>

        <div className="border-t p-5 flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-[#2438D8] text-white px-8 py-3 rounded-lg"
          >
            {loading ? "Saving..." : product ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
