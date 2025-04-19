const ColorPicker = ({ colors, selectedColors, setSelectedColors }) => {
  const toggleColor = (color, isChecked) => {
    if (isChecked) {
      setSelectedColors([...selectedColors, color]);
    } else {
      setSelectedColors(selectedColors.filter((c) => c.id !== color.id));
    }
  };

  return (
    <div className="color-options-container">
      {colors.map((color) => {
        const isSelected = selectedColors.some((c) => c.id === color.id);
        return (
          <label
            key={color.id}
            className={`color-option ${isSelected ? "selected" : ""}`}
          >
            <input
              type="checkbox"
              value={color.id}
              checked={isSelected}
              onChange={(e) => toggleColor(color, e.target.checked)}
            />
            <span
              className="color-square"
              style={{ backgroundColor: color.name.toLowerCase() }}
            />
            {color.name}
          </label>
        );
      })}
    </div>
  );
};

export default ColorPicker;
