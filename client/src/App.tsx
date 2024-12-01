import { useEffect, useState } from "react";
import "./App.css";
import SettingsAccordion from "./components/SettingsAccordion";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "./components/ui/label";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";

function App() {
  const [coverLetterText, setCoverLetterText] = useState(null);
  const [userData, setUserData] = useState({
    jobDescription:
      "We are Awesome Co. and we are looking for a Software Engineer to join our team. You will be working on our core product, which is a platform that helps people write better cover letters. You will be responsible for building new features, fixing bugs, and improving the performance of our platform. The ideal candidate is passionate about writing clean code, has experience with React and Node.js, and is a great team player. If you are interested in this position, please send us your resume and a cover letter explaining why you are a good fit for this role.",
    salutation: "Dear Hiring Manager,",
    settings: {
      name: "John Doe",
      model: "gpt-3.5-turbo",
      temperature: 0.7,
      wordLimit: 200,
    },
  });

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    console.log("userData :", userData);

    fetchResponse(userData);
  }

  async function fetchResponse(settings: {
    jobDescription: string;
    salutation: string;
    settings: {
      name: string;
      model: string;
      temperature: number;
      wordLimit: number;
    };
  }) {
    console.log("settings:", settings);

    const response = await fetch("http://localhost:3000/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    console.log("response: ", data.chatCompletion.choices[0].message.content);
    setCoverLetterText(data.chatCompletion.choices[0].message.content);
  }

  useEffect(() => {
    console.log("userData:", userData);
  }, [userData]);

  return (
    <div className="App mx-auto max-w-5xl p-4">
      <header className="App-header"></header>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <SettingsAccordion
            settings={userData.settings}
            onUpdate={(newSettings) =>
              setUserData({ ...userData, settings: newSettings })
            }
          />
          <div className="">
            <Label htmlFor="salutation" className="text-xs">
              Salutation
            </Label>
            <Input id="salutation" defaultValue={userData.salutation}></Input>
          </div>
          <div className="">
            <Label htmlFor="job-description" className="text-xs">
              Job Description
            </Label>
            <Textarea
              id="job-description"
              value={userData.jobDescription}
              onChange={(event) =>
                setUserData({
                  ...userData,
                  jobDescription: event.target.value,
                })
              }
            ></Textarea>
          </div>
          <Button type="submit">Generate</Button>
        </div>
      </form>
      {!coverLetterText ? (
        <div>Loading...</div>
      ) : coverLetterText !== null && coverLetterText !== undefined ? (
        <div style={{ whiteSpace: "pre-line" }}>{coverLetterText}</div>
      ) : null}
    </div>
  );
}

export default App;
