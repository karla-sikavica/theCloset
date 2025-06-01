import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useFetchItems } from "../../hooks/useFetchItems";
import "../css/Items.css";

interface ClosetProps {
  items: any[]; // zamijeni sa stvarnim tipom ako imaš
  onDragStart?: (item: any) => (e: React.DragEvent) => void;
}

const Items = ({ onDragStart }: ClosetProps) => {
  const user = useCurrentUser();
  const userId = user?.id;
  const items = useFetchItems(userId);

  return (
    <div className="items-card-container">
      <div className="items-card-div">
        {items.map((item) => (
          <div key={item.id} className="items-card">
            <div className="items-image-div">
              <img
                className="items-img"
                src={item.imageUrl}
                alt={item.name}
                draggable
                onDragStart={onDragStart ? onDragStart(item) : undefined}
              />
            </div>
            <div className="items-card-body">
              <div className="items-body-div">{item.brand}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Items;
