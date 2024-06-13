import React from "react";

interface FeatureTypeEditSelectProps {
  isEnabled: boolean;
  onChange: (
    selection: string,
    userId: string | null,
    subscriptionId: string | null,
    subscriptionType: string | null
  ) => void;
  currentType: string;
  userId: string | null;
  subscriptionId: string | null;
  subscriptionType: string | null;
}

const FeatureTypeEditSelect: React.FC<FeatureTypeEditSelectProps> = ({
  isEnabled,
  onChange,
  currentType,
  userId,
  subscriptionId,
  subscriptionType,
}) => {
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value;
    onChange(newType, userId, subscriptionId, subscriptionType);
  };

  return (
    <div className="space-y-2">
      <label>Feature Type</label>
      <select
        disabled={!isEnabled}
        value={currentType}
        onChange={handleTypeChange}
        className="w-full p-2 border rounded"
      >
        <option value="Global">Global</option>
        <option value="User">User</option>
        <option value="Subscription">Subscription</option>
      </select>
      {currentType === "User" && (
        <div>
          <label>User ID</label>
          <input
            type="text"
            value={userId || ""}
            onChange={(e) =>
              onChange(
                currentType,
                e.target.value,
                subscriptionId,
                subscriptionType
              )
            }
            disabled={!isEnabled}
            className="w-full p-2 border rounded"
          />
        </div>
      )}
      {currentType === "Subscription" && (
        <div>
          <label>Subscription ID</label>
          <input
            type="text"
            value={subscriptionId || ""}
            onChange={(e) =>
              onChange(currentType, userId, e.target.value, subscriptionType)
            }
            disabled={!isEnabled}
            className="w-full p-2 border rounded"
          />
          <label>Subscription Type</label>
          <input
            type="text"
            value={subscriptionType || ""}
            onChange={(e) =>
              onChange(currentType, userId, subscriptionId, e.target.value)
            }
            disabled={!isEnabled}
            className="w-full p-2 border rounded"
          />
        </div>
      )}
    </div>
  );
};

export default FeatureTypeEditSelect;
