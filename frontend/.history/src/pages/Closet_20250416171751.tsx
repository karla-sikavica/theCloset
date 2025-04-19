import { useCurrentUser } from "../hooks/useCurrentUser";
import { useFetchItems } from "../hooks/useFetchItems";
import "./css/Closet.css";

const Closet = () => {
  const user = useCurrentUser();
  const userId = user?.id; // izvuci ID
  const items = useFetchItems(userId);

  return (
    <div className="card-container">
      <div className="card-div">
        {items.map((item) => (
          <div key={item.id} className="card">
            <div className="image-div">
              <img src={item.imageUrl} alt={item.name} />
            </div>
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Closet;
