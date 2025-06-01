import React from "react";

interface AddImageUploadProps {
  previewUrl: string | null;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: { [key: string]: string };
}

const AddImageUpload: React.FC<AddImageUploadProps> = ({
  previewUrl,
  handleImageChange,
  errors,
}) => {
  return (
    <div className="image-input-div">
      <div className="file-upload-wrapper">
        <label htmlFor="imageUrl" className="file-upload-label">
          {previewUrl ? (
            <img src={previewUrl} alt="Preview" className="preview-img" />
          ) : (
            <div className="canvas-placeholder-img">
              <span className="placeholder-icon">📸</span>
              <span className="placeholder-title">click to add an image</span>
              <span className="placeholder-instructions">
                lay your item on a flat surface and take a picture from above.
              </span>
            </div>
          )}
        </label>
        <input
          type="file"
          id="imageUrl"
          onChange={handleImageChange}
          className={`hidden-file-input ${errors.image ? "input-error" : ""}`}
        />
        {/* Ako želiš prikazati grešku, otkomentiraj ovo:
        {errors.image && (
          <p className="error-text">{errors.image}</p>
        )} 
        */}
      </div>
    </div>
  );
};

export default AddImageUpload;
