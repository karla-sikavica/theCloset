<form className="formContainer" onSubmit={handleSubmit}>
  <div className="formContent">
    <div className="image-input-div">
      <div className="file-upload-wrapper">
        <label htmlFor="imageUrl" className="file-upload-label">
          {previewUrl ? (
            <img src={previewUrl} alt="Preview" className="preview-img" />
          ) : (
            <>
              📸 Click to add an image<br />
              <br />
              Lay your item on a flat surface and take a picture of it from above
            </>
          )}
        </label>
        <input
          type="file"
          id="imageUrl"
          onChange={handleImageChange}
          className={`hidden-file-input ${errors.image ? "input-error" : ""}`}
        />
        {errors.image && <p className="error-text">{errors.image}</p>}
      </div>
    </div>

    <div className="form-div">
      <div className="input-label-div">
        <label htmlFor="name">name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="item name"
          value={clothingItem.name}
          onChange={handleInputChange}
          className={errors.name ? "input-error" : ""}
        />
        {errors.name && <p className="error-text">{errors.name}</p>}
      </div>

      <div className="input-label-div">
        <label htmlFor="brand">brand</label>
        <input
          type="text"
          id="brand"
          name="brand"
          placeholder="brand"
          value={clothingItem.brand}
          onChange={handleInputChange}
          className={errors.brand ? "input-error" : ""}
        />
        {errors.brand && <p className="error-text">{errors.brand}</p>}
      </div>

      <div className="input-label-div">
        <label htmlFor="material">material</label>
        <input
          type="text"
          id="material"
          name="material"
          placeholder="material"
          value={clothingItem.material}
          onChange={handleInputChange}
          className={errors.material ? "input-error" : ""}
        />
        {errors.material && <p className="error-text">{errors.material}</p>}
      </div>

      <div className="input-label-div">
        <label htmlFor="price">price</label>
        <input
          type="text"
          id="price"
          name="price"
          placeholder="price"
          value={clothingItem.price === "0" ? "" : clothingItem.price}
          onChange={handleInputChange}
          className={errors.price ? "input-error" : ""}
        />
        {errors.price && <p className="error-text">{errors.price}</p>}
      </div>

      <div className="input-label-div">
        <label htmlFor="category">category</label>
        <select
          id="category"
          name="category"
          value={clothingItem.category}
          onChange={(e) => {
            const selectedId = parseInt(e.target.value);
            setclothingItem({
              ...clothingItem,
              category: selectedId,
              subcategory: "",
            });
          }}
          className={errors.category ? "input-error" : ""}
        >
          <option value="">category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {errors.category && <p className="error-text">{errors.category}</p>}
      </div>

      <div className="input-label-div">
        <label htmlFor="subcategory">subcategory</label>
        <select
          id="subcategory"
          name="subcategory"
          value={clothingItem.subcategory}
          onChange={(e) => {
            setclothingItem((prev) => ({
              ...prev,
              subcategory: parseInt(e.target.value),
            }));
          }}
          className={errors.subcategory ? "input-error" : ""}
        >
          <option value="">subcategory</option>
          {subcategories.map((subcat) => (
            <option key={subcat.id} value={subcat.id}>
              {subcat.name}
            </option>
          ))}
        </select>
        {errors.subcategory && <p className="error-text">{errors.subcategory}</p>}
      </div>

      <div className="input-label-div">
        <label htmlFor="size">size</label>
        <select
          id="size"
          name="size"
          onChange={handleInputChange}
          value={clothingItem.size}
          className={errors.size ? "input-error" : ""}
        >
          <option value="">size</option>
          <option value="xxs">xxs</option>
                        <option value="xs">xs</option>
                        <option value="s">s</option>
                        <option value="m">m</option>
                        <option value="l">l</option>
                        <option value="xl">xl</option>
                        <option value="xxl">xxl</option>
                        <option value="xxxl">xxxl</option>
                        <option value="one size">one size</option>
                        <option value="tall">tall</option>
                        <option value="petite">petite</option>
                        <option value="plus">plus</option>
                        <option value="slim fit">slim fit</option>
                        <option value="regular fit">regular fit</option>
                        <option value="oversized">oversized</option>

                        <option value="34">34</option>
                        <option value="35">35</option>
                        <option value="36">36</option>
                        <option value="37">37</option>
                        <option value="38">38</option>
                        <option value="39">39</option>
                        <option value="40">40</option>
                        <option value="41">41</option>
                        <option value="42">42</option>
                        <option value="43">43</option>
                        <option value="44">44</option>
                        <option value="45">45</option>
                        <option value="46">46</option>

                        <option value="us 4">us 4</option>
                        <option value="us 5">us 5</option>
                        <option value="us 6">us 6</option>
                        <option value="us 7">us 7</option>
                        <option value="us 8">us 8</option>
                        <option value="us 9">us 9</option>
                        <option value="us 10">us 10</option>
                        <option value="us 11">us 11</option>
                        <option value="us 12">us 12</option>

                        <option value="uk 4">uk 4</option>
                        <option value="uk 5">uk 5</option>
                        <option value="uk 6">uk 6</option>
                        <option value="uk 7">uk 7</option>
                        <option value="uk 8">uk 8</option>
                        <option value="uk 9">uk 9</option>
                        <option value="uk 10">uk 10</option>

                        <option value="32">32</option>
                        <option value="34">34</option>
                        <option value="36">36</option>
                        <option value="38">38</option>
                        <option value="40">40</option>
                        <option value="42">42</option>
                        <option value="44">44</option>
                        <option value="46">46</option>
        </select>
        {errors.size && <p className="error-text">{errors.size}</p>}
      </div>