"use client";
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

const FeatureLogicModal = ({ feature, onClose }: any) => {
  const [selection, setSelection] = useState('Users');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [operator, setOperator] = useState('==');
  const [isUATEnabled, setIsUATEnabled] = useState(false);
  const [isDEVEnabled, setIsDEVEnabled] = useState(false);
  const [isPRODEnabled, setIsPRODEnabled] = useState(false);

  const handleSelectionChange = (value: string) => {
    setSelection(value);
  };

  const handleOperatorChange = (value: string) => {
    setOperator(value);
  };

  const handleTagInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(event.target.value);
  };

  const handleAddTag = () => {
    if (tagInput.trim() !== '' && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const handleConfirm = async () => {
    const environments = [
      { name: 'UAT', enabled: isUATEnabled },
      { name: 'Dev', enabled: isDEVEnabled },
      { name: 'Prod', enabled: isPRODEnabled },
    ];

    try {
      for (const env of environments) {
        if (env.enabled) {
          await fetch('/api/features', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: feature.name,
              environment: env.name,
              status: true,
              subscriptionType: selection,
              subscriptionId: null,
              userId: null,
            }),
          });
        }
      }

      onClose();
    } catch (error) {
      console.error('Error creating feature:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
      <div className="bg-white dark:bg-black p-6 rounded-lg shadow-lg w-full max-w-md">
        <Tabs defaultValue="UAT">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="UAT">UAT</TabsTrigger>
            <TabsTrigger value="DEV">DEV</TabsTrigger>
            <TabsTrigger value="PROD">PROD</TabsTrigger>
          </TabsList>
          <TabsContent value="UAT">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>UAT Logic</CardTitle>
                    <CardDescription>
                      Configure the UAT logic for the feature {feature.name}.
                    </CardDescription>
                  </div>
                  <Switch checked={isUATEnabled} onCheckedChange={setIsUATEnabled} />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Selection</Label>
                  <Select onValueChange={handleSelectionChange} defaultValue={selection} disabled={!isUATEnabled}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Users">Users</SelectItem>
                      <SelectItem value="Subscription">Subscription</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Operator</Label>
                  <Select onValueChange={handleOperatorChange} defaultValue={operator} disabled={!isUATEnabled}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an operator" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="==">==</SelectItem>
                      <SelectItem value="!=">!=</SelectItem>
                      <SelectItem value=">">{'>'}</SelectItem>
                      <SelectItem value="<">{'<'}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Tags</Label>
                  <div className="flex items-center space-x-2">
                    <Input value={tagInput} onChange={handleTagInputChange} placeholder="Add a tag" disabled={!isUATEnabled} />
                    <Button onClick={handleAddTag} disabled={!isUATEnabled}>Add</Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((tag) => (
                      <div key={tag} className="flex items-center space-x-1 bg-gray-200 dark:bg-gray-700 rounded-md px-2 py-1">
                        <span>{tag}</span>
                        <X className="cursor-pointer" onClick={() => handleRemoveTag(tag)} size={16} />
                      </div>
                    ))}
                  </div>
                </div>
                <p>Logic settings for UAT environment...</p>
              </CardContent>
              <CardFooter className="flex justify-between mt-4">
                <Button variant="outline" onClick={onClose}>Close</Button>
                <Button onClick={handleConfirm}>Confirm</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="DEV">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>DEV Logic</CardTitle>
                    <CardDescription>
                      Configure the DEV logic for the feature {feature.name}.
                    </CardDescription>
                  </div>
                  <Switch checked={isDEVEnabled} onCheckedChange={setIsDEVEnabled} />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Selection</Label>
                  <Select onValueChange={handleSelectionChange} defaultValue={selection} disabled={!isDEVEnabled}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Users">Users</SelectItem>
                      <SelectItem value="Subscription">Subscription</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Operator</Label>
                  <Select onValueChange={handleOperatorChange} defaultValue={operator} disabled={!isDEVEnabled}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an operator" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="==">==</SelectItem>
                      <SelectItem value="!=">!=</SelectItem>
                      <SelectItem value=">">{'>'}</SelectItem>
                      <SelectItem value="<">{'<'}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Tags</Label>
                  <div className="flex items-center space-x-2">
                    <Input value={tagInput} onChange={handleTagInputChange} placeholder="Add a tag" disabled={!isDEVEnabled} />
                    <Button onClick={handleAddTag} disabled={!isDEVEnabled}>Add</Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((tag) => (
                      <div key={tag} className="flex items-center space-x-1 bg-gray-200 dark:bg-gray-700 rounded-md px-2 py-1">
                        <span>{tag}</span>
                        <X className="cursor-pointer" onClick={() => handleRemoveTag(tag)} size={16} />
                      </div>
                    ))}
                  </div>
                </div>
                <p>Logic settings for DEV environment...</p>
              </CardContent>
              <CardFooter className="flex justify-between mt-4">
                <Button variant="outline" onClick={onClose}>Close</Button>
                <Button onClick={handleConfirm}>Confirm</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="PROD">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>PROD Logic</CardTitle>
                    <CardDescription>
                      Configure the PROD logic for the feature {feature.name}.
                    </CardDescription>
                  </div>
                  <Switch checked={isPRODEnabled} onCheckedChange={setIsPRODEnabled} />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Selection</Label>
                  <Select onValueChange={handleSelectionChange} defaultValue={selection} disabled={!isPRODEnabled}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Users">Users</SelectItem>
                      <SelectItem value="Subscription">Subscription</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Operator</Label>
                  <Select onValueChange={handleOperatorChange} defaultValue={operator} disabled={!isPRODEnabled}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an operator" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="==">==</SelectItem>
                      <SelectItem value="!=">!=</SelectItem>
                      <SelectItem value=">">{'>'}</SelectItem>
                      <SelectItem value="<">{'<'}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Tags</Label>
                  <div className="flex items-center space-x-2">
                    <Input value={tagInput} onChange={handleTagInputChange} placeholder="Add a tag" disabled={!isPRODEnabled} />
                    <Button onClick={handleAddTag} disabled={!isPRODEnabled}>Add</Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((tag) => (
                      <div key={tag} className="flex items-center space-x-1 bg-gray-200 dark:bg-gray-700 rounded-md px-2 py-1">
                        <span>{tag}</span>
                        <X className="cursor-pointer" onClick={() => handleRemoveTag(tag)} size={16} />
                      </div>
                    ))}
                  </div>
                </div>
                <p>Logic settings for PROD environment...</p>
              </CardContent>
              <CardFooter className="flex justify-between mt-4">
                <Button variant="outline" onClick={onClose}>Close</Button>
                <Button onClick={handleConfirm}>Confirm</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FeatureLogicModal;
