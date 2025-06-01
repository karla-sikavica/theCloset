import { useCurrentUser } from "../hooks/useCurrentUser";
import { useFetchItems } from "../hooks/useFetchItems";

const Profile = () => {
  const user = useCurrentUser();
  const userId = user?.id;
  const items = useFetchItems(userId);
  console.log(user);
  console.log("items:", items);
  return (
    <div>
      <div className="profile-title">{user?.name}'s analytics</div>
      <div className="most-least-div">
        <div className="most-least-title">here are your 5 most worn items</div>
      </div>
      <div className="most-least-div">
        <div className="most-least-title">here are your 5 least worn items</div>
      </div>
      <div className="most-least-div">
        <div className="most-least-title">
          here are your smartest wardrobe investments
        </div>
      </div>
      <div className="most-least-div">
        <div className="most-least-title">
          here are your not so smart wardrobe investments
        </div>
      </div>
    </div>
  );
};

export default Profile;
