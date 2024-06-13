import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

interface TagsInputProps {
  isEnabled: boolean;
}

const TagsInput: React.FC<TagsInputProps> = ({ isEnabled }) => {
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const handleTagInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(event.target.value);
  };

  const handleAddTag = () => {
    if (tagInput.trim() !== "" && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return (
    <div className="space-y-2">
      <Label>Tags</Label>
      <div className="flex items-center space-x-2">
        <Input
          value={tagInput}
          onChange={handleTagInputChange}
          placeholder="Add a tag"
          disabled={!isEnabled}
        />
        <Button onClick={handleAddTag} disabled={!isEnabled}>
          Add
        </Button>
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {tags.map((tag) => (
          <div
            key={tag}
            className="flex items-center space-x-1 bg-gray-200 dark:bg-gray-700 rounded-md px-2 py-1"
          >
            <span>{tag}</span>
            <X
              className="cursor-pointer"
              onClick={() => handleRemoveTag(tag)}
              size={16}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagsInput;
