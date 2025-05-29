import "../css/ClothingItem.css";

const ClothingItem = ({
  item,
  onClose,
  onDelete,
}: {
  item: any;
  onClose: () => void;
  onDelete: (id: number) => void;
}) => {
  return (
    <div className="clothing-detail-overlay">
      <div className="clothing-detail-modal">
        <button className="close-btn" onClick={onClose}>
          ✖
        </button>
        <div className="clothing-detail-content">
          <div className="detail-image">
            <img src={item.imageUrl} alt={item.name} />
          </div>
          <div className="detail-form">
            <h2>{item.name}</h2>
            <p>
              <strong>Brand:</strong> {item.brand}
            </p>
            <p>
              <strong>Material:</strong> {item.material}
            </p>
            <p>
              <strong>Price:</strong> ${item.price}
            </p>
            <p>
              <strong>Size:</strong> {item.size}
            </p>
            {/* You can turn these into editable inputs if you want */}
            <button className="delete-btn" onClick={() => onDelete(item.id)}>
              🗑 Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClothingItem;
