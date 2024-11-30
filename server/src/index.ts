import cors from "cors";
import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import { OpenAI } from "openai";
import { errorHandler } from "./middleware/errorHandler";
import { AppError } from "./types";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

app.post("/api/chat", async (req, res) => {
  const {
    jobDescription,
    name,
    salutation = "Dear Hiring Manager",
    wordLimit = 200,
    model = "gpt-3.5-turbo",
    temperature = 0.7,
  } = req.body;

  if (!jobDescription) {
    return res.status(400).json({ error: "Job description required" });
  }

  if (!name) {
    return res.status(400).json({ error: "Name required" });
  }

  const prompt = `Here is a job description, write a cover letter for this job on behalf of the user: ${jobDescription}. `;

  try {
    const chatCompletion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are an expert in recruitment and job applications. Write a cover letter for this job.",
        },
        {
          role: "system",
          content:
            "Although we call it a letter it will be sent digitally, so we dont need subject line or an address or date.",
        },
        {
          role: "system",
          content: "Do not start with a subject line",
        },
        {
          role: "system",
          content: `Make sure to include the salutation ${salutation}`,
        },
        {
          role: "system",
          content: `Sign off with the users name ${name}`,
        },
        {
          role: "system",
          content: `The cover letter should be about ${wordLimit} words long and should explain why you are a good fit for the job.`,
        },
        { role: "user", content: prompt },
      ],
      temperature,
      model,
    });

    res.json({ chatCompletion });
  } catch (error) {
    res.status(500).json({
      error: `An error occurred while processing your request: ${error}`,
    });
  }
});

// 404 handler
app.use((req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Route ${req.originalUrl} not found`, 404));
});

// Error handling
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
