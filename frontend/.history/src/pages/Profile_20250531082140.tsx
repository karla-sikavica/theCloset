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
        <div className="most-least-title">top 5 most worn pieces</div>
      </div>
      <div className="most-least-div">
        <div className="most-least-title">top 5 least worn pieces</div>
      </div>
      <div className="most-least-div">
        <div className="most-least-title">
          your smartest wardrobe investments
        </div>
      </div>
      <div className="most-least-div">
        <div className="most-least-title">least cost effective pieces</div>
      </div>
    </div>
  );
};

export default Profile;
