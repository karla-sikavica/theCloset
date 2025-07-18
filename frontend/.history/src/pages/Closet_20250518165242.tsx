/* import { useCurrentUser } from "../hooks/useCurrentUser";
import { useFetchItems } from "../hooks/useFetchItems";
import "./css/Closet.css";

const Closet = () => {
  const user = useCurrentUser();
  const userId = user?.id;
  const items = useFetchItems(userId);

  return (
    <div className="card-container">
      <div className="card-div">
        {items.map((item) => (
          <div key={item.id} className="card">
            <div className="image-div">
              <img className="img" src={item.imageUrl} alt={item.name} />
            </div>
            <div className="card-body">
              <div className="body-div">{item.brand}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Closet; */

import { useCurrentUser } from "../hooks/useCurrentUser";
import { useFetchItems } from "../hooks/useFetchItems";
import "./css/Closet.css";

interface ClosetProps {
  onDragStart?: (item: any) => (e: React.DragEvent) => void;
}

const Closet = ({ onDragStart }: ClosetProps) => {
  const user = useCurrentUser();
  const userId = user?.id;
  const items = useFetchItems(userId);

  return (
    <div className="card-container">
      <div className="card-div">
        {items.map((item) => (
          <div key={item.id} className="card">
            <div className="image-div">
              <img
                className="img"
                src={item.imageUrl}
                alt={item.name}
                draggable
                onDragStart={onDragStart ? onDragStart(item) : undefined}
              />
            </div>
            <div className="card-body">
              <div className="body-div">{item.brand}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Closet;
