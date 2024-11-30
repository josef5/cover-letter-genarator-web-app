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
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useEffect, useState } from "react";

function SettingsAccordion({
  settings = {
    name: "",
    model: "gpt-3.5-turbo",
    temperature: 0.7,
    wordLimit: 200,
  },
  onUpdate,
}: {
  settings: {
    name: string;
    model: string;
    temperature: number;
    wordLimit: number;
  };
  onUpdate: (settings: {
    name: string;
    model: string;
    temperature: number;
    wordLimit: number;
  }) => void;
}) {
  const [value, setValue] = useState("default"); // Change to open/close
  const [settingsFormData, setSettingsFormData] = useState(settings);
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onUpdate(settingsFormData);
    setValue("close");
  };

  useEffect(() => {
    console.log("settingsFormData:", settingsFormData);
  }, [settingsFormData]);

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
        <AccordionContent className="px-4 pb-4">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between gap-4">
                <div className="w-full flex-1 flex-col">
                  <Label htmlFor="name" className="text-xs">
                    Name
                  </Label>
                  <Input
                    name="name"
                    id="name"
                    type="text"
                    placeholder="e.g. John Doe"
                    defaultValue={settingsFormData.name}
                    onChange={(event) =>
                      setSettingsFormData((prev) => ({
                        ...prev,
                        name: event.target.value,
                      }))
                    }
                    className="w-full autofill:shadow-[inset_0_0_0px_1000px_hsl(var(--background))]"
                  />
                </div>

                <div className="flex-1 flex-col">
                  <Label className="text-xs">Model</Label>
                  <Select
                    name="model-select"
                    defaultValue={settings.model}
                    onValueChange={(value) =>
                      setSettingsFormData((prev) => ({ ...prev, model: value }))
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Model" />
                    </SelectTrigger>
                    <SelectContent className="w-full">
                      <SelectItem value="gpt-3.5-turbo">
                        gpt-3.5-turbo
                      </SelectItem>
                      <SelectItem value="gpt-4o">gpt-4o</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex-1 flex-col">
                  <Label htmlFor="temperature" className="text-xs">
                    Temperature
                  </Label>
                  <Input
                    name="temperature"
                    id="temperature"
                    type="number"
                    step="0.1"
                    placeholder="0.7"
                    defaultValue={settingsFormData.temperature}
                    onChange={(event) =>
                      setSettingsFormData((prev) => ({
                        ...prev,
                        temperature: parseFloat(event.target.value),
                      }))
                    }
                    className="w-full autofill:shadow-[inset_0_0_0px_1000px_hsl(var(--background))]"
                  />
                </div>

                <div className="flex-1 flex-col">
                  <Label htmlFor="word-limit" className="text-xs">
                    Word Limit
                  </Label>
                  <Input
                    name="word-limit"
                    id="word-limit"
                    type="number"
                    step="1"
                    placeholder="300"
                    defaultValue={settingsFormData.wordLimit}
                    onChange={(event) =>
                      setSettingsFormData((prev) => ({
                        ...prev,
                        wordLimit: parseFloat(event.target.value),
                      }))
                    }
                    className="w-full autofill:shadow-[inset_0_0_0px_1000px_hsl(var(--background))]"
                  />
                </div>
              </div>
              <div className="flex justify-center">
                <Button type="submit" className="w-2/12 text-sm">
                  Save
                </Button>
              </div>
            </div>
          </form>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default SettingsAccordion;
