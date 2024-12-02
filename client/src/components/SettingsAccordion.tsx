import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Settings } from "@/types/data";

function SettingsAccordion({
  settings = {
    apiKey: "",
    name: "",
    model: "gpt-3.5-turbo",
    temperature: 0.7,
    wordLimit: 200,
    workExperience: "",
  },
  onUpdate,
}: {
  settings: Settings;
  onUpdate: (settings: Settings) => void;
}) {
  const [value, setValue] = useState("default"); // Change to open/close

  function handleSettingsChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target;

    onUpdate({ ...settings, [name]: value });
  }

  return (
    <Accordion
      type="single"
      collapsible
      className=""
      value={value}
      onValueChange={setValue}
    >
      <AccordionItem value="fields" className="">
        <AccordionTrigger className="rounded-lg border bg-neutral-800 px-4 text-sm">
          Settings
        </AccordionTrigger>
        <AccordionContent className="px-4">
          <div className="mt-4 flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <Label htmlFor="api-key" className="text-xs">
                OpenAI API Key
              </Label>
              <Input
                name="apiKey"
                id="api-key"
                type="text"
                defaultValue={settings.apiKey}
                onChange={handleSettingsChange}
                className="w-full autofill:shadow-[inset_0_0_0px_1000px_hsl(var(--background))]"
              />
            </div>
            <div className="row flex justify-between gap-4">
              <div className="flex w-full flex-1 flex-col gap-1">
                <Label htmlFor="name" className="text-xs">
                  Name
                </Label>
                <Input
                  name="name"
                  id="name"
                  type="text"
                  placeholder="e.g. John Doe"
                  defaultValue={settings.name}
                  onChange={handleSettingsChange}
                  className="w-full autofill:shadow-[inset_0_0_0px_1000px_hsl(var(--background))]"
                />
              </div>

              <div className="flex flex-1 flex-col gap-1">
                <Label className="text-xs">Model</Label>
                <Select
                  name="model"
                  defaultValue={settings.model}
                  onValueChange={(value) =>
                    handleSettingsChange({
                      target: { name: "model", value },
                    } as React.ChangeEvent<HTMLInputElement>)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Model" />
                  </SelectTrigger>
                  <SelectContent className="w-full">
                    <SelectItem value="gpt-3.5-turbo">gpt-3.5-turbo</SelectItem>
                    <SelectItem value="gpt-4o">gpt-4o</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-1 flex-col gap-1">
                <Label htmlFor="temperature" className="text-xs">
                  Temperature
                </Label>
                <Input
                  name="temperature"
                  id="temperature"
                  type="number"
                  step="0.1"
                  placeholder="0.7"
                  defaultValue={settings.temperature}
                  onChange={handleSettingsChange}
                  className="w-full autofill:shadow-[inset_0_0_0px_1000px_hsl(var(--background))]"
                />
              </div>

              <div className="flex flex-1 flex-col gap-1">
                <Label htmlFor="word-limit" className="text-xs">
                  Word Limit
                </Label>
                <Input
                  name="wordLimit"
                  id="word-limit"
                  type="number"
                  step="1"
                  placeholder="300"
                  defaultValue={settings.wordLimit}
                  onChange={handleSettingsChange}
                  className="w-full autofill:shadow-[inset_0_0_0px_1000px_hsl(var(--background))]"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="work-experience" className="text-xs">
                Work Experience
              </Label>
              <Textarea
                name="workExperience"
                id="work-experience"
                value={settings.workExperience}
                onChange={handleSettingsChange}
              />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default SettingsAccordion;
