import { useCurrentUser } from "../hooks/useCurrentUser";
import { useFetchItems } from "../hooks/useFetchItems";

const Closet = () => {
  const user = useCurrentUser();
  const userId = user?.id; // izvuci ID
  const items = useFetchItems(userId);

  return <div className="card-container"></div>;
};

export default Closet;
