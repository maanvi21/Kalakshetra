import React, { useState } from "react";
import "./Browse.css";
import ProductCard from "../components/ProductCard.js";
import Search from "../components/Search.js";
import Header from "../components/user-components/Header.js";
import productItems from "../data/ProductData.js";
import { useStateValue } from "../context/CartContext.js";
import AdminHeader from "../components/admin-components/AdminHeader.js";

export default function AdminBrowse() {
  const { state } = useStateValue();

  // State for storing uploaded images per category
  const [uploadedImages, setUploadedImages] = useState({
    sarees: [],
    kurtis: [],
    offers: [],
  });

  // Handle file upload
  const handleImageUpload = (event, category) => {
    const files = Array.from(event.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));

    setUploadedImages((prev) => ({
      ...prev,
      [category]: [...prev[category], ...imageUrls],
    }));
  };

  return (
    <div className="browse-page">
      <AdminHeader />
      <div className="browse_header">
        <Search />
      </div>

      {/* Kalamkari Sarees */}
      <div className="category">
        <h2>Kalamkari Sarees</h2>
        <input
          type="file"
          accept="image/*"
          multiple
          id="upload-sarees"
          className="file-input"
          onChange={(e) => handleImageUpload(e, "sarees")}
        />
        <label htmlFor="upload-sarees" className="upload-btn">
          Upload Images
        </label>

        {/* Display Uploaded Images */}
        <div className="uploaded-images">
          {uploadedImages.sarees.map((img, index) => (
            <img key={index} src={img} alt={`Uploaded Saree ${index}`} className="uploaded-img" />
          ))}
        </div>

        <div className="scroll-container">
          <div className="horizontal-scroll">
            {productItems.map((item) => (
              <ProductCard key={`saree-${item.id}`} items={[item]} />
            ))}
          </div>
        </div>
      </div>

      {/* Kalamkari Kurtis */}
      <div className="category">
        <h2>Kalamkari Kurtis</h2>
        <input
          type="file"
          accept="image/*"
          multiple
          id="upload-kurtis"
          className="file-input"
          onChange={(e) => handleImageUpload(e, "kurtis")}
        />
        <label htmlFor="upload-kurtis" className="upload-btn">
          Upload Images
        </label>

        {/* Display Uploaded Images */}
        <div className="uploaded-images">
          {uploadedImages.kurtis.map((img, index) => (
            <img key={index} src={img} alt={`Uploaded Kurti ${index}`} className="uploaded-img" />
          ))}
        </div>

        <div className="scroll-container">
          <div className="horizontal-scroll">
            {productItems.map((item) => (
              <ProductCard key={`kurti-${item.id}`} items={[item]} />
            ))}
          </div>
        </div>
      </div>

      {/* Offers */}
      <div className="category">
        <h2>Offers</h2>
        <input
          type="file"
          accept="image/*"
          multiple
          id="upload-offers"
          className="file-input"
          onChange={(e) => handleImageUpload(e, "offers")}
        />
        <label htmlFor="upload-offers" className="upload-btn">
          Upload Images
        </label>

        {/* Display Uploaded Images */}
        <div className="uploaded-images">
          {uploadedImages.offers.map((img, index) => (
            <img key={index} src={img} alt={`Uploaded Offer ${index}`} className="uploaded-img" />
          ))}
        </div>

        <div className="scroll-container">
          <div className="horizontal-scroll">
            {productItems.map((item) => (
              <ProductCard key={`offer-${item.id}`} items={[item]} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}