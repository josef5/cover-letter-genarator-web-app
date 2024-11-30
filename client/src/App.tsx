import { useEffect, useState } from "react";
import "./App.css";
import SettingsAccordion from "./components/SettingsAccordion";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "./components/ui/label";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";

function App() {
  const [data, setData] = useState(null);
  const [settings, setSettings] = useState({
    name: "John Doe",
    model: "gpt-3.5-turbo",
    temperature: 0.7,
    wordLimit: 200,
  });
  const [salutation, setSalutation] = useState("Dear Hiring Manager,");
  const [jobDescription, setJobDescription] = useState("");

  function handleSubmit(event: React.FormEvent) {
    console.log("event :", event);
    event.preventDefault();
  }

  /* const jobDescription =
    "We are Awesome Co. and we are looking for a Software Engineer to join our team. You will be working on our core product, which is a platform that helps people write better cover letters. You will be responsible for building new features, fixing bugs, and improving the performance of our platform. The ideal candidate is passionate about writing clean code, has experience with React and Node.js, and is a great team player. If you are interested in this position, please send us your resume and a cover letter explaining why you are a good fit for this role.";
  const salutation = "Dear Hiring Manager,";
  const name = "John Doe";
  const wordLimit = 200;
  const model = "gpt-3.5-turbo"; //"gpt-4o",
  const temperature = 0.7; */

  /* useEffect(() => {
    fetch("http://localhost:3000/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jobDescription,
        salutation,
        name,
        wordLimit,
        model,
        temperature,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(
          "response: ",
          data.chatCompletion.choices[0].message.content
        );
        setData(data.chatCompletion.choices[0].message.content);
      });
  }, []); */

  useEffect(() => {
    console.log("settings:", settings);
  }, [settings]);

  return (
    <div className="App mx-auto max-w-5xl p-4">
      <header className="App-header"></header>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <SettingsAccordion
            settings={settings}
            onUpdate={(newSettings) => setSettings(newSettings)}
          />
          <div className="">
            <Label htmlFor="salutation" className="text-xs">
              Salutation
            </Label>
            <Input id="salutation" defaultValue={salutation}></Input>
          </div>
          <div className="">
            <Label htmlFor="job-description" className="text-xs">
              Job Description
            </Label>
            <Textarea
              id="job-description"
              value={jobDescription}
              onChange={(event) => setJobDescription(event.target.value)}
            ></Textarea>
          </div>
          <Button type="submit">Generate</Button>
        </div>
      </form>
      {!data ? (
        <div>Loading...</div>
      ) : data !== null && data !== undefined ? (
        <div style={{ whiteSpace: "pre-line" }}>{data}</div>
      ) : null}
    </div>
  );
}

export default App;
