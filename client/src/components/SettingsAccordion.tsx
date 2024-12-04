import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  // Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormContext } from "react-hook-form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

function SettingsAccordion({
  accordionValue,
  setAccordionValue,
}: {
  accordionValue: string;
  setAccordionValue: (value: string) => void;
}) {
  const { control } = useFormContext();
  // const [accordionValue, setAccordionValue] = useState("default"); // Change to open/close

  function handleAccordionChange(value: string) {
    setAccordionValue(value);
  }

  return (
    <Accordion
      type="single"
      collapsible
      className=""
      value={accordionValue}
      onValueChange={handleAccordionChange}
    >
      <AccordionItem value="fields" className="">
        <AccordionTrigger className="rounded-lg border bg-neutral-800 px-4 text-sm">
          Settings
        </AccordionTrigger>
        <AccordionContent className="px-4">
          <div className="mt-4 flex flex-col gap-4">
            <FormField
              control={control}
              name="settings.apiKey"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1">
                  <FormLabel className="text-xs">OpenAI API Key</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your API key"
                      {...field}
                      className="w-full autofill:shadow-[inset_0_0_0px_1000px_hsl(var(--background))]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="row-of-inputs flex justify-between gap-4">
              <FormField
                control={control}
                name="settings.name"
                render={({ field }) => (
                  <FormItem className="flex flex-1 flex-col gap-1">
                    <FormLabel className="text-xs">Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. John Smith"
                        {...field}
                        className="w-full autofill:shadow-[inset_0_0_0px_1000px_hsl(var(--background))]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="settings.model"
                render={({ field }) => (
                  <FormItem className="flex flex-1 flex-col gap-1">
                    <FormLabel className="text-xs">Model</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
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
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="settings.temperature"
                render={({ field }) => (
                  <FormItem className="flex flex-1 flex-col gap-1">
                    <FormLabel className="text-xs">Temperature</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.1"
                        placeholder="0.7"
                        min="0.0"
                        max="2.0"
                        {...field}
                        className="w-full autofill:shadow-[inset_0_0_0px_1000px_hsl(var(--background))]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="settings.wordLimit"
                render={({ field }) => (
                  <FormItem className="flex flex-1 flex-col gap-1">
                    <FormLabel className="text-xs">Word Limit</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="300"
                        step="100"
                        {...field}
                        className="w-full autofill:shadow-[inset_0_0_0px_1000px_hsl(var(--background))]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-1">
              <FormField
                control={control}
                name="settings.workExperience"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-1">
                    <FormLabel className="text-xs">Work Experience</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default SettingsAccordion;
