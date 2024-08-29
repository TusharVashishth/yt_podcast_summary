// export const summaryTemplate = `
// You are an expert in summarizing YouTube videos.
// Your goal is to create a summary of a podcast.
// Below you find the transcript of a podcast:
// --------
// {text}
// --------

// The transcript of the podcast will also be used as the basis for a question and answer bot.
// Provide some examples questions and answers that could be asked about the podcast. Make these questions very specific.
// Total output will be a summary of the video and a list of example questions the user could ask of the video.and make sure you return data in proper markdown format.

// SUMMARY AND QUESTIONS:
// `;

export const summaryTemplate = `You are an expert in summarizing YouTube videos.

Create a Markdown-formatted summary of the podcast below. Also, generate specific questions and answers based on the podcast.

### Transcript:
{text}

### Output:
##Summary:
- [Your summary here]

## Example Questions:
1. **Question:[First question]** 
   **Answer:** [First answer]

2. **Question:[Second question]**   
   **Answer:** [Second answer]`;

export const summaryRefineTemplate = `
You are an expert in summarizing YouTube videos.
Your goal is to create a summary of a podcast.
We have provided an existing summary up to a certain point: {existing_answer}

Below you find the transcript of a podcast:
--------
{text}
--------

Given the new context, refine the summary and example questions.
The transcript of the podcast will also be used as the basis for a question and answer bot.
Provide some examples questions and answers that could be asked about the podcast. Make
these questions very specific.
If the context isn't useful, return the original summary and questions.
Total output will be a summary of the video and a list of example questions the user could ask of the video.and make sure you return data in proper markdown format.

SUMMARY AND QUESTIONS:
`;
