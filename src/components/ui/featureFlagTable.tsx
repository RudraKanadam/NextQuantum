"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import FeatureLogicModal from './FeatureLogicModal';

type Environment = 'UAT' | 'Dev' | 'Prod';

const dummyData = [
  { id: '1', name: 'Feature A', environments: { UAT: true, Dev: false, Prod: true } },
  { id: '2', name: 'Feature B', environments: { UAT: false, Dev: true, Prod: false } },
];

const FeatureFlagTable: React.FC = () => {
  const router = useRouter();
  const [features, setFeatures] = useState(dummyData);
  const [selectedFeature, setSelectedFeature] = useState<any>(null);
  const [selectedEnv, setSelectedEnv] = useState<Environment | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleToggle = () => {
    if (selectedFeature && selectedEnv) {
      setFeatures(features.map(feature => 
        feature.id === selectedFeature.id ? { 
          ...feature, 
          environments: { 
            ...feature.environments, 
            [selectedEnv]: !feature.environments[selectedEnv]
          }
        } : feature
      ));
    }
    setIsAlertOpen(false);
  };

  const handleToggleClick = (feature: any, env: Environment) => {
    setSelectedFeature(feature);
    setSelectedEnv(env);
    setIsAlertOpen(true);
  };

  const handleLogicClick = (feature: any) => {
    setSelectedFeature(feature);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFeature(null);
  };

  const handleRowClick = (featureId: string) => {
    router.push(`/feature/${featureId}`);
  };

  return (
    <div className="overflow-auto">
      <table className="min-w-full bg-white dark:bg-black shadow-md rounded-lg text-gray-900 dark:text-white">
        <thead>
          <tr>
            <th className="py-3 px-6 text-left">Feature Name</th>
            <th className="py-3 px-6 text-left">UAT</th>
            <th className="py-3 px-6 text-left">Dev</th>
            <th className="py-3 px-6 text-left">Production</th>
            <th className="py-3 px-6 text-left">Settings</th>
          </tr>
        </thead>
        <tbody>
          {features.map((feature) => (
            <tr
              key={feature.id}
              className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
              onClick={() => handleRowClick(feature.id)}
            >
              <td className="py-3 px-6">{feature.name}</td>
              <td className="py-3 px-6" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center space-x-2">
                  <p className={`text-sm ${feature.environments.UAT ? 'text-green-500' : 'text-red-500'}`}>
                    {feature.environments.UAT ? 'On' : 'Off'}
                  </p>
                  <Switch
                    checked={feature.environments.UAT}
                    onCheckedChange={() => handleToggleClick(feature, 'UAT')}
                  />
                </div>
              </td>
              <td className="py-3 px-6" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center space-x-2">
                  <p className={`text-sm ${feature.environments.Dev ? 'text-green-500' : 'text-red-500'}`}>
                    {feature.environments.Dev ? 'On' : 'Off'}
                  </p>
                  <Switch
                    checked={feature.environments.Dev}
                    onCheckedChange={() => handleToggleClick(feature, 'Dev')}
                  />
                </div>
              </td>
              <td className="py-3 px-6" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center space-x-2">
                  <p className={`text-sm ${feature.environments.Prod ? 'text-green-500' : 'text-red-500'}`}>
                    {feature.environments.Prod ? 'On' : 'Off'}
                  </p>
                  <Switch
                    checked={feature.environments.Prod}
                    onCheckedChange={() => handleToggleClick(feature, 'Prod')}
                  />
                </div>
              </td>
              <td className="py-3 px-6" onClick={(e) => e.stopPropagation()}>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">...</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleLogicClick(feature)}>Logic</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => console.log(`Edit feature ${feature.id}`)}>Edit</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => console.log(`Delete feature ${feature.id}`)}>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && selectedFeature && (
        <FeatureLogicModal feature={selectedFeature} onClose={closeModal} />
      )}

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Toggle</AlertDialogTitle>
            <AlertDialogDescription>
              {`Are you sure you want to ${selectedFeature?.environments[selectedEnv!] ? 'turn off' : 'turn on'} the feature ${selectedFeature?.name} for ${selectedEnv} environment?`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsAlertOpen(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleToggle}>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default FeatureFlagTable;
