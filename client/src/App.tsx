import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState(null);

  const jobDescription =
    "We are Awesome Co. and we are looking for a Software Engineer to join our team. You will be working on our core product, which is a platform that helps people write better cover letters. You will be responsible for building new features, fixing bugs, and improving the performance of our platform. The ideal candidate is passionate about writing clean code, has experience with React and Node.js, and is a great team player. If you are interested in this position, please send us your resume and a cover letter explaining why you are a good fit for this role.";
  const salutation = "Dear Hiring Manager,";
  const name = "John Doe";
  const wordLimit = 200;
  const model = "gpt-3.5-turbo"; //"gpt-4o",
  const temperature = 0.7;

  useEffect(() => {
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
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {!data ? (
          <div>Loading...</div>
        ) : data !== null && data !== undefined ? (
          <div style={{ whiteSpace: "pre-line" }}>{data}</div>
        ) : null}
      </header>
    </div>
  );
}

export default App;
