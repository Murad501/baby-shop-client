import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { FaRegTimesCircle } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { categoryProvider } from "../../../Context/CategoryContext";
import { darkProvider } from "../../../Context/DarkContext";
import { loadingProvider } from "../../../Context/LoadingContext";
import { productProvider } from "../../../Context/ProductContext";
import { userProvider } from "../../../Context/UserContext";

const EditProduct = () => {
  const imgbbApi = process.env.REACT_APP_imgbbApi;
  const { setIsLoading } = useContext(loadingProvider);
  const { user } = useContext(userProvider);
  const navigate = useNavigate();
  const { isDark } = useContext(darkProvider);
  const { categories } = useContext(categoryProvider);

  const { id } = useParams();
  const { products, refetch } = useContext(productProvider);
  const product = products.find((product) => product?._id === id);

  const [selectedImage, setSelectedImage] = useState(product?.picture);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setIsLoading(true);
    const category = categories.find(
      (category) => category._id === data.category
    );

    const currentProduct = {
      postedBy: user.email,
      category,
      picture: product.picture,
      available: true,
      advertised: false,
      price: data.price,
      buyingPrice: data.buyingPrice,
      location: data.location,
      condition: data.condition,
      usesYears: data.usesYears,
      name: data.name,
      description: data.description,
      date: product.date,
      updateTime: new Date(),
    };

    if (selectedImage === product.picture) {
      console.log("from previous picture");
      fetch(`http://localhost:5000/product/${product._id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(currentProduct),
      })
        .then((res) => res.json())
        .then((data) => {
          refetch();
          navigate("/dashboard/my-products");
          setIsLoading(false);
          toast.success("Product Updated successfully");
        });
    } else {
      const image = data.profileImage[0];
      const formData = new FormData();
      formData.append("image", image);
      fetch(`https://api.imgbb.com/1/upload?key=${imgbbApi}`, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.data.url) {
            const imgUrl = result.data.url;
            currentProduct.picture = imgUrl;
            console.log(currentProduct);
            fetch(`http://localhost:5000/product/${product._id}`, {
              method: "PATCH",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(currentProduct),
            })
              .then((res) => res.json())
              .then((data) => {
                refetch();
                navigate("/dashboard/my-products");
                setIsLoading(false);
                toast.success("Product added successfully");
              });
          }
        });
    }
  };

  function handleImageChange(event) {
    const image = event.target.files[0];
    if (image) {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
    }
  }

  function handleRemoveImage(e) {
    setSelectedImage(null);
  }

  return (
    <div className="py-10">
      <h1
        className={`text-4xl font-bold text-center mb-10 ${
          !isDark && "text-rose-400"
        }`}
      >
        Update Product Details
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto">
        <div className="mb-4 md:col-span-4">
          <label htmlFor="name" className="block  font-medium mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            defaultValue={product?.name}
            {...register("name", { required: true })}
            className={`border bg-transparent ${
              isDark
                ? "border-gray-800 "
                : "border-gray-400 focus:border-rose-400"
            } p-2 w-full rounded-sm focus:outline-none`}
            required
          />
          {errors.name && (
            <span className="text-red-500">Name is required</span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="mb-4">
            <label htmlFor="category" className="block  font-medium mb-2">
              Category
            </label>
            <select
              type="text"
              id="category"
              defaultValue={product?.category._id}
              {...register("category", { required: true })}
              className={`border bg-transparent ${
                isDark
                  ? "border-gray-800 "
                  : "border-gray-400 focus:border-rose-400"
              } p-2 w-full rounded-sm focus:outline-none`}
              required
            >
              {categories.map((category, idx) => (
                <option value={category?._id} key={category?.id}>
                  {category?.name}
                </option>
              ))}
            </select>
            {errors.category && (
              <span className="text-red-500">Category is required</span>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="condition" className="block  font-medium mb-2">
              Condition
            </label>
            <select
              type="text"
              id="condition"
              defaultValue={product?.condition}
              {...register("condition", { required: true })}
              className={`border bg-transparent ${
                isDark
                  ? "border-gray-800 "
                  : "border-gray-400 focus:border-rose-400"
              } p-2 w-full rounded-sm focus:outline-none`}
              required
            >
              <option value="excellent">Excellent</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
            </select>
            {errors.condition && (
              <span className="text-red-500">Category is required</span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="mb-4">
            <label htmlFor="price" className="block  font-medium mb-2">
              Price $
            </label>
            <input
              type="number"
              id="price"
              defaultValue={product?.price}
              {...register("price", { required: true })}
              className={`border bg-transparent ${
                isDark
                  ? "border-gray-800 "
                  : "border-gray-400 focus:border-rose-400"
              } p-2 w-full rounded-sm focus:outline-none`}
              required
            />
            {errors.price && (
              <span className="text-red-500">Price is required</span>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="buyingPrice" className="block  font-medium mb-2">
              Buying Price $
            </label>
            <input
              type="number"
              id="buyingPrice"
              defaultValue={product?.buyingPrice}
              {...register("buyingPrice", { required: true })}
              className={`border bg-transparent ${
                isDark
                  ? "border-gray-800 "
                  : "border-gray-400 focus:border-rose-400"
              } p-2 w-full rounded-sm focus:outline-none`}
              required
            />
            {errors.buyingPrice && (
              <span className="text-red-500">Buying Price is required</span>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="mb-4 ">
            <label htmlFor="location" className="block  font-medium mb-2">
              Location
            </label>
            <input
              type="text"
              id="location"
              defaultValue={product?.location}
              {...register("location", { required: true })}
              className={`border bg-transparent ${
                isDark
                  ? "border-gray-800 "
                  : "border-gray-400 focus:border-rose-400"
              } p-2 w-full rounded-sm focus:outline-none`}
              required
            />
            {errors.location && (
              <span className="text-red-500">Location is required</span>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="usesYears" className="block  font-medium mb-2">
              Uses Year
            </label>
            <input
              type="number"
              id="usesYears"
              defaultValue={product?.usesYears}
              {...register("usesYears", { required: true })}
              className={`border bg-transparent ${
                isDark
                  ? "border-gray-800 "
                  : "border-gray-400 focus:border-rose-400"
              } p-2 w-full rounded-sm focus:outline-none`}
              required
            />
            {errors.usesYear && (
              <span className="text-red-500">Uses year is required</span>
            )}
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block  font-medium mb-2">
            Description
          </label>
          <textarea
            id="description"
            defaultValue={product?.description}
            {...register("description", { required: true })}
            className={`textarea textarea-bordered bg-transparent ${
              isDark
                ? "border-gray-800 "
                : "border-gray-400 focus:border-rose-400"
            } p-2 w-full rounded-sm focus:outline-none`}
            // className={`textarea textarea-bordered border-2 border-gray-300 p-2 w-full  rounded-sm focus:outline-none focus:border-orange-500 focus:text-orange-500`}
            required
          />
          {errors.description && (
            <span className="text-red-500">Description is required</span>
          )}
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2">Product Image</label>
          <div className="relative">
            <input
              {...register("profileImage")}
              type="file"
              className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
              onChange={handleImageChange}
            />
            <div
              className={`border h-60 flex items-center justify-center ${
                isDark
                  ? "border-gray-800 "
                  : "border-gray-400 focus:border-rose-400"
              } p-2 w-full rounded-sm focus:outline-none`}
            >
              {selectedImage ? (
                <div className="relative w-full h-full">
                  <img
                    src={selectedImage}
                    alt="Selected Profile"
                    className="h-full mx-auto"
                  />
                  <FaRegTimesCircle
                    className="absolute top-0 right-0  w-6 h-6 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none"
                    onClick={handleRemoveImage}
                  ></FaRegTimesCircle>
                </div>
              ) : (
                <div className="text-gray-400 text-sm">
                  Drag and drop your profile image here or click to select
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mb-6 flex justify-end items-center">
          <button
            type="submit"
            className={`${
              isDark
                ? "border-gray-800 border hover:text-white"
                : "bg-rose-400 text-white"
            } font-semibold px-4 py-2 rounded-none mt-5`}
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
