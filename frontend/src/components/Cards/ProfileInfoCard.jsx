import React, { useContext } from "react";
import { UserContext } from "../../Context/userContext";
import { useNavigate } from "react-router-dom";

function ProfileInfoCard() {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/");
  };

  // Helper: Generate initials
  const getInitials = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    user && (
      <div className="flex items-center gap-2">
        {/* Profile Image or Initials */}
        {user.profileImageUrl ? (
          <div className="h-11 w-11 rounded-full overflow-hidden border-2 border-gray-600">
            <img
              src={user.profileImageUrl}
              alt="profile"
              className="h-full w-full rounded-full object-cover"
            />
          </div>
        ) : (
          <div className="h-11 w-11 rounded-full bg-orange-600 text-white flex items-center justify-center text-sm font-semibold border-2 border-gray-600">
            {getInitials(user.name)}
          </div>
        )}

        {/* Name + Logout */}
        <div className="flex flex-col items-start gap-1">
          <p className="text-[15px] font-bold leading-3 text-white">
            {user.name || ""}
          </p>
          <button
            onClick={handleLogout}
            className="text-sm font-semibold text-amber-400 cursor-pointer hover:text-amber-300 hover:underline transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    )
  );
}

export default ProfileInfoCard;
