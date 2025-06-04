import React, { useState } from "react";
import AdminUirender from "../../../Authentications_role/Admin/AdminUiRender";
import { SidebarCon } from "../../../Authentications_role/Admin/AdminDashboard";
import "../../Css/AdminProductAdd.scss"; // We'll create this SCSS file
import { authaxios, productAxios } from "../../../AuthAxios/Auth";

const AdminProductAddPage = () => {
  return (
    <div className="admin-product-add-page">
      <AdminUirender>
        <SidebarCon>
          <div className="product-form-container">
            <h2 className="form-title">Add New Product</h2>
            <ProductAddForm />
          </div>
        </SidebarCon>
      </AdminUirender>
    </div>
  );
};

function ProductAddForm() {
  const [mainImagePreview, setMainImagePreview] = useState(null);
  const [galleryPreviews, setGalleryPreviews] = useState(Array(4).fill(null));
  const [mainImageFile, setMainImageFile] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]);

  const [Details, setdetails] = useState({
    title: "",
    quantity: "",
    price: "",
    productstock: "",
  });

  // This function handles the change of the main image file
  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMainImageFile(file); // Store the actual file object
      const reader = new FileReader();
      reader.onloadend = () => {
        setMainImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGalleryImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const newFiles = [...galleryFiles];
      newFiles[index] = file;
      setGalleryFiles(newFiles);

      const reader = new FileReader();
      reader.onloadend = () => {
        const newPreviews = [...galleryPreviews];
        newPreviews[index] = reader.result;
        setGalleryPreviews(newPreviews);
      };
      reader.readAsDataURL(file);
    }
  };

  const handler = (e, protit) => {
    console.log(e.target.value, protit);

    setdetails({ ...Details, [protit]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("title", Details.title);
    formdata.append("quantity", Details.quantity);
    formdata.append("price", Details.price);
    formdata.append("productstock", Details.productstock);

    // Append main image file
    if (mainImageFile) {
      formdata.append("singleimg", mainImageFile);
    }

    // Append gallery images
    galleryFiles.forEach((file, index) => {
      if (file) {
        formdata.append(`multiimg`, file); // Or use multiimg[] for arrays in some backends
      }
    });

    // Add headers for file upload
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    productAxios
      .post("/CreateProduct", formdata, config)
      .then((res) => {
        console.log(res);
        alert("Product added successfully!");
      })
      .catch((err) => {
        console.error(err);
        alert("Error adding product");
      });

    setdetails({
      ...Details,
      price: "",
      productstock: "",
      quantity: "",
      title: "",
    });
  };

  return (
    <form className="product-add-form" onSubmit={handleSubmit}>
      {/* Title Input */}
      <div className="form-group">
        <label htmlFor="productTitle" className="form-label">
          Product Title
        </label>
        <input
          type="text"
          id="productTitle"
          className="form-input"
          placeholder="Enter product title"
          onChange={(e) => {
            handler(e, "title");
          }}
          required
        />
      </div>

      {/* Count and Price */}
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="productCount" className="form-label">
            Count
          </label>
          <input
            type="number"
            id="productCount"
            className="form-input"
            placeholder="Available quantity"
            min="0"
            required
            onChange={(e) => {
              handler(e, "quantity");
            }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="productPrice" className="form-label">
            Price
          </label>
          <input
            type="number"
            id="productPrice"
            className="form-input"
            placeholder="Product price"
            min="0"
            step="0.01"
            required
            onChange={(e) => {
              handler(e, "price");
            }}
          />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="productTitle" className="form-label">
          Product Stock
        </label>
        <input
          type="number"
          id="productTitle"
          className="form-input"
          placeholder="Enter product Stock"
          required
          onChange={(e) => {
            handler(e, "productstock");
          }}
        />
      </div>
      {/* Main Image Upload */}
      <div className="form-group">
        <label htmlFor="mainImage" className="form-label">
          Main Product Image
        </label>
        <div className="image-upload-container">
          <input
            type="file"
            id="mainImage"
            className="image-upload-input"
            accept="image/*"
            onChange={handleMainImageChange}
            required
          />
          <label htmlFor="mainImage" className="image-upload-label">
            {mainImagePreview ? (
              <img
                src={mainImagePreview}
                alt="Main preview"
                className="image-preview"
              />
            ) : (
              <span>Click to upload main image</span>
            )}
          </label>
        </div>
      </div>

      {/* Gallery Images Upload */}
      <div className="form-group">
        <label className="form-label">Gallery Images (up to 4)</label>
        <div className="gallery-upload-container">
          {[0, 1, 2, 3].map((index) => (
            <div key={index} className="gallery-image-upload">
              <input
                type="file"
                id={`galleryImage${index}`}
                className="image-upload-input"
                accept="image/*"
                onChange={(e) => handleGalleryImageChange(e, index)}
              />
              <label
                htmlFor={`galleryImage${index}`}
                className="image-upload-label"
              >
                {galleryPreviews[index] ? (
                  <img
                    src={galleryPreviews[index]}
                    alt={`Gallery preview ${index}`}
                    className="image-preview1"
                  />
                ) : (
                  <span>+</span>
                )}
              </label>
            </div>
          ))}
        </div>
      </div>

      <button type="submit" className="submit-button">
        Add Product
      </button>
    </form>
  );
}

export default AdminProductAddPage;
