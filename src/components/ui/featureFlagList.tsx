"use client";
import React, { useState } from 'react';
import FeatureFlagItem from './featureFlagItem';
import { Button } from '@/components/ui/button';

const initialFlags = [
  { id: '1', name: 'Feature A', enabled: true, environment: 'Production' },
  { id: '2', name: 'Feature B', enabled: false, environment: 'Staging' },
];

const FeatureFlagList: React.FC = () => {
  const [flags, setFlags] = useState(initialFlags);
  const [newFeatureName, setNewFeatureName] = useState('');
  const [newFeatureEnv, setNewFeatureEnv] = useState('');

  const handleToggle = (id: string) => {
    setFlags(flags.map(flag => flag.id === id ? { ...flag, enabled: !flag.enabled } : flag));
  };

  const handleDelete = (id: string) => {
    setFlags(flags.filter(flag => flag.id !== id));
  };

  const handleCreate = () => {
    const newFlag = { id: String(flags.length + 1), name: newFeatureName, enabled: false, environment: newFeatureEnv };
    setFlags([...flags, newFlag]);
    setNewFeatureName('');
    setNewFeatureEnv('');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Feature Name"
          value={newFeatureName}
          onChange={(e) => setNewFeatureName(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Environment"
          value={newFeatureEnv}
          onChange={(e) => setNewFeatureEnv(e.target.value)}
          className="border p-2 rounded"
        />
        <Button onClick={handleCreate}>Create Feature</Button>
      </div>
      {flags.map(flag => (
        <FeatureFlagItem
          key={flag.id}
          feature={flag}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default FeatureFlagList;
