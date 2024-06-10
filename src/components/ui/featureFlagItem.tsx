import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';

interface FeatureFlagItemProps {
  feature: { id: string; name: string; enabled: boolean; environment: string };
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const FeatureFlagItem: React.FC<FeatureFlagItemProps> = ({ feature, onToggle, onDelete }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white shadow rounded mb-2">
      <div>
        <h3 className="text-lg font-bold">{feature.name}</h3>
        <p className="text-sm text-gray-600">Environment: {feature.environment}</p>
      </div>
      <div className="flex items-center space-x-4">
        <Switch checked={feature.enabled} onChange={() => onToggle(feature.id)} />
        <Button variant="destructive" onClick={() => onDelete(feature.id)}>Delete</Button>
      </div>
    </div>
  );
};

export default FeatureFlagItem;
