import { useEffect, useState } from "react";
import "./App.css";
import SettingsAccordion from "./components/SettingsAccordion";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "./components/ui/label";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";

function App() {
  const [coverLetterText, setCoverLetterText] = useState("");
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

    /* const response = await fetch("http://localhost:3000/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    console.log("response: ", data.chatCompletion.choices[0].message.content);
    setCoverLetterText(data.chatCompletion.choices[0].message.content); */

    setCoverLetterText(
      `Lorem ipsum odor amet, consectetuer adipiscing elit. Inceptos pellentesque turpis; primis pellentesque luctus in. Viverra sagittis dictum amet maecenas finibus aenean viverra semper. Parturient blandit fermentum tristique amet posuere? Phasellus lacus conubia neque auctor nisi per lectus. Eu pharetra habitant et vehicula nascetur dolor ut. Odio curabitur tempor efficitur fusce potenti. Posuere a dui venenatis gravida velit posuere. Habitasse nascetur vivamus feugiat mauris orci.

      Amet platea ante fusce eu auctor ornare ante. Nam class blandit dui ad orci imperdiet convallis dis mi. Enim placerat mattis inceptos purus maecenas taciti phasellus ornare. Enim sagittis eros nulla non primis. Placerat praesent mus volutpat aptent ex pharetra nullam fringilla orci. Ligula nec iaculis iaculis interdum non a eleifend. Velit magna dictum; lorem dignissim per sem. Amet egestas per donec; semper molestie curabitur. Dui sapien platea at mauris luctus mattis donec.

      Netus eros velit placerat porta nullam. Habitant volutpat sed pellentesque ac rutrum metus massa. Faucibus eget nascetur elit; torquent luctus ex euismod. Senectus mus conubia tortor tempus imperdiet in donec cubilia netus. Magna arcu risus vel; aptent nec egestas? Eu suspendisse auctor quam posuere fermentum pharetra convallis. Consectetur commodo elit mi taciti tortor torquent. Erat viverra orci nisi non porttitor vivamus efficitur porttitor.
      
      Lorem ipsum odor amet, consectetuer adipiscing elit. Inceptos pellentesque turpis; primis pellentesque luctus in. Viverra sagittis dictum amet maecenas finibus aenean viverra semper. Parturient blandit fermentum tristique amet posuere? Phasellus lacus conubia neque auctor nisi per lectus. Eu pharetra habitant et vehicula nascetur dolor ut. Odio curabitur tempor efficitur fusce potenti. Posuere a dui venenatis gravida velit posuere. Habitasse nascetur vivamus feugiat mauris orci.

      Amet platea ante fusce eu auctor ornare ante. Nam class blandit dui ad orci imperdiet convallis dis mi. Enim placerat mattis inceptos purus maecenas taciti phasellus ornare. Enim sagittis eros nulla non primis. Placerat praesent mus volutpat aptent ex pharetra nullam fringilla orci. Ligula nec iaculis iaculis interdum non a eleifend. Velit magna dictum; lorem dignissim per sem. Amet egestas per donec; semper molestie curabitur. Dui sapien platea at mauris luctus mattis donec.

      Netus eros velit placerat porta nullam. Habitant volutpat sed pellentesque ac rutrum metus massa. Faucibus eget nascetur elit; torquent luctus ex euismod. Senectus mus conubia tortor tempus imperdiet in donec cubilia netus. Magna arcu risus vel; aptent nec egestas? Eu suspendisse auctor quam posuere fermentum pharetra convallis. Consectetur commodo elit mi taciti tortor torquent. Erat viverra orci nisi non porttitor vivamus efficitur porttitor.`,
    );
  }

  useEffect(() => {
    console.log("userData:", userData);
  }, [userData]);

  return (
    <div className="App mx-auto max-w-5xl">
      <header className="App-header"></header>
      <div className="flex h-screen flex-col gap-4 py-4">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
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
            <SettingsAccordion
              settings={userData.settings}
              onUpdate={(newSettings) =>
                setUserData({ ...userData, settings: newSettings })
              }
            />
            <Button type="submit">Generate</Button>
          </div>
        </form>
        {!coverLetterText ? (
          <div>Loading...</div>
        ) : coverLetterText !== null && coverLetterText !== undefined ? (
          <Textarea
            style={{ whiteSpace: "pre-line" }}
            value={coverLetterText}
            // readOnly
            onChange={(event) => setCoverLetterText(event.target.value)}
            className="flex-1 bg-white text-neutral-800"
          ></Textarea>
        ) : null}
      </div>
    </div>
  );
}

export default App;
