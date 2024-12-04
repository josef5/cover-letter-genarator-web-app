import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as z from "zod";
import "./App.css";
import SettingsAccordion from "./components/SettingsAccordion";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import type { UserData } from "./types/data";

const schema = z.object({
  jobDescription: z.string().min(1, { message: "Required" }),
  salutation: z.string().min(1, { message: "Required" }),
  settings: z.object({
    apiKey: z.string().min(1, { message: "Required" }),
    name: z.string().min(1, { message: "Required" }),
    model: z.string().min(1, { message: "Required" }),
    temperature: z.number().min(0, { message: "Required" }),
    wordLimit: z.number().min(1, { message: "Required" }),
    workExperience: z.string().min(1, { message: "Required" }),
  }),
});

type FormValues = z.infer<typeof schema>;

function App() {
  const [coverLetterText, setCoverLetterText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [accordionValue, setAccordionValue] = useState("default"); // State for accordion
  /* const [userData, setUserData] = useState<UserData>({
    // TODO: remove placeholder values
    jobDescription:
      "We are Awesome Co. and we are looking for a Software Engineer to join our team. You will be working on our core product, which is a platform that helps people write better cover letters. You will be responsible for building new features, fixing bugs, and improving the performance of our platform. The ideal candidate is passionate about writing clean code, has experience with React and Node.js, and is a great team player. If you are interested in this position, please send us your resume and a cover letter explaining why you are a good fit for this role.",
    salutation: "Dear Hiring Manager,",
    settings: {
      apiKey: "abc123",
      name: "John Doe",
      model: "gpt-3.5-turbo",
      temperature: 0.7,
      wordLimit: 200,
      workExperience:
        "I am a frontend developer with 4 years of experience in React, Vue and TypeScript.",
    },
  });*/

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      // TODO: remove placeholder values
      jobDescription:
        "We are Awesome Co. and we are looking for a Software Engineer to join our team. You will be working on our core product, which is a platform that helps people write better cover letters. You will be responsible for building new features, fixing bugs, and improving the performance of our platform. The ideal candidate is passionate about writing clean code, has experience with React and Node.js, and is a great team player. If you are interested in this position, please send us your resume and a cover letter explaining why you are a good fit for this role.",
      salutation: "Dear Hiring Manager,",
      settings: {
        apiKey: "abc123",
        name: "John Smith",
        model: "gpt-3.5-turbo",
        temperature: 0.7,
        wordLimit: 200,
        workExperience:
          "I am a frontend developer with 4 years of experience in React, Vue and TypeScript.",
      },
    },
  });

  function onSubmit(data: FormValues) {
    setAccordionValue("close");
    fetchCompletion(data);
  }

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  async function fetchCompletion(userData: UserData) {
    console.log("userData :", userData);

    /* try {
      setCoverLetterText("");
      setError(null);
      setIsLoading(true);

      const response = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error(
          `Server error. Status: ${response.status}: ${response.statusText}`,
        );
      }

      const data = await response.json();

      console.log("response: ", data.chatCompletion.choices[0].message.content);
      setCoverLetterText(data.chatCompletion.choices[0].message.content);
    } catch (error) {
      if (error instanceof TypeError) {
        console.error("Network error fetching chat completion:", error);
      } else {
        console.error(error);
      }

      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    } */

    setIsLoading(true);

    await sleep(1000);

    setCoverLetterText("");
    setIsLoading(false);
    setError(null);

    setCoverLetterText(
      `Lorem ipsum odor amet, consectetuer adipiscing elit. Inceptos pellentesque turpis; primis pellentesque luctus in. Viverra sagittis dictum amet maecenas finibus aenean viverra semper. Parturient blandit fermentum tristique amet posuere? Phasellus lacus conubia neque auctor nisi per lectus. Eu pharetra habitant et vehicula nascetur dolor ut. Odio curabitur tempor efficitur fusce potenti. Posuere a dui venenatis gravida velit posuere. Habitasse nascetur vivamus feugiat mauris orci.

      Amet platea ante fusce eu auctor ornare ante. Nam class blandit dui ad orci imperdiet convallis dis mi. Enim placerat mattis inceptos purus maecenas taciti phasellus ornare. Enim sagittis eros nulla non primis. Placerat praesent mus volutpat aptent ex pharetra nullam fringilla orci. Ligula nec iaculis iaculis interdum non a eleifend. Velit magna dictum; lorem dignissim per sem. Amet egestas per donec; semper molestie curabitur. Dui sapien platea at mauris luctus mattis donec.

      Netus eros velit placerat porta nullam. Habitant volutpat sed pellentesque ac rutrum metus massa. Faucibus eget nascetur elit; torquent luctus ex euismod. Senectus mus conubia tortor tempus imperdiet in donec cubilia netus. Magna arcu risus vel; aptent nec egestas? Eu suspendisse auctor quam posuere fermentum pharetra convallis. Consectetur commodo elit mi taciti tortor torquent. Erat viverra orci nisi non porttitor vivamus efficitur porttitor.
      
      Lorem ipsum odor amet, consectetuer adipiscing elit. Inceptos pellentesque turpis; primis pellentesque luctus in. Viverra sagittis dictum amet maecenas finibus aenean viverra semper. Parturient blandit fermentum tristique amet posuere? Phasellus lacus conubia neque auctor nisi per lectus. Eu pharetra habitant et vehicula nascetur dolor ut. Odio curabitur tempor efficitur fusce potenti. Posuere a dui venenatis gravida velit posuere. Habitasse nascetur vivamus feugiat mauris orci.

      Amet platea ante fusce eu auctor ornare ante. Nam class blandit dui ad orci imperdiet convallis dis mi. Enim placerat mattis inceptos purus maecenas taciti phasellus ornare. Enim sagittis eros nulla non primis. Placerat praesent mus volutpat aptent ex pharetra nullam fringilla orci. Ligula nec iaculis iaculis interdum non a eleifend. Velit magna dictum; lorem dignissim per sem. Amet egestas per donec; semper molestie curabitur. Dui sapien platea at mauris luctus mattis donec.

      Netus eros velit placerat porta nullam. Habitant volutpat sed pellentesque ac rutrum metus massa. Faucibus eget nascetur elit; torquent luctus ex euismod. Senectus mus conubia tortor tempus imperdiet in donec cubilia netus. Magna arcu risus vel; aptent nec egestas? Eu suspendisse auctor quam posuere fermentum pharetra convallis. Consectetur commodo elit mi taciti tortor torquent. Erat viverra orci nisi non porttitor vivamus efficitur porttitor.`,
    );
  }

  return (
    <div className="App mx-auto max-w-5xl">
      <div className="flex h-screen flex-col gap-4 py-4">
        <h1 className="text-base font-bold">Cover Letter Generator</h1>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Form {...form}>
              <div className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="salutation"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-1">
                      <FormLabel className="text-xs">Salutation</FormLabel>
                      <FormControl>
                        <Input placeholder="Dear Hiring Manager," {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="jobDescription"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-1">
                      <FormLabel className="text-xs">Job Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <SettingsAccordion
                  accordionValue={accordionValue}
                  setAccordionValue={setAccordionValue}
                />
                <Button type="submit">Generate</Button>
              </div>
            </Form>
          </form>
        </FormProvider>
        {error && <div className="text-red-500">{error}</div>}
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          coverLetterText && (
            <Textarea
              style={{ whiteSpace: "pre-line" }}
              value={coverLetterText}
              onChange={(event) => setCoverLetterText(event.target.value)}
              className="flex-1 bg-white text-neutral-800"
            ></Textarea>
          )
        )}
      </div>
    </div>
  );
}

export default App;
