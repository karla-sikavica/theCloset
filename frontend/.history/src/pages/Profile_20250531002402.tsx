import { useCurrentUser } from "../hooks/useCurrentUser";
import { useFetchItems } from "../hooks/useFetchItems";

const Profile = () => {
  const user = useCurrentUser();
  const items = useFetchItems();
  console.log(user);
  console.log("items:", items);
  return <div></div>;
};

export default Profile;
