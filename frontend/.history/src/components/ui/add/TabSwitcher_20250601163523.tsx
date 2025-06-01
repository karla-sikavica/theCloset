import React from "react";

interface TabSwitcherProps {
  activeTab: "clothing" | "outfit";
  setActiveTab: React.Dispatch<React.SetStateAction<"clothing" | "outfit">>;
}

const TabSwitcher: React.FC<TabSwitcherProps> = ({
  activeTab,
  setActiveTab,
}) => {
  return (
    <div className="tab-switch">
      <button
        className={activeTab === "clothing" ? "tab active" : "tab"}
        onClick={() => setActiveTab("clothing")}
        type="button"
      >
        clothing item
      </button>
      <button
        className={activeTab === "outfit" ? "tab active" : "tab"}
        onClick={() => setActiveTab("outfit")}
        type="button"
      >
        outfit
      </button>
    </div>
  );
};

export default TabSwitcher;
