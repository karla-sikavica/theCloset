import { useCurrentUser } from "../hooks/useCurrentUser";
import { useFetchItems } from "../hooks/useFetchItems";

const Closet = () => {
  const user = useCurrentUser();
  const userId = user?.id; // izvuci ID
  const items = useFetchItems(userId);

  return <div className="card-container">
    <div className="card-div">
      {items.map((item) => (
        <div key={item.id} className="card">
          <p>{item.name}</p>

    </div>
        </div>

  </div>;
};

export default Closet;
