import axios from "axios";

const BASE_URL = "http://localhost:8000";

/**
 * Send a PDF resume to the backend and get back:
 *  - resume_skills: list of detected skills
 *  - matches: ranked list of job matches with scores and gaps
 *  - priority_gaps: most common missing skills across top 3 jobs
 */
export async function analyseResume(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post(`${BASE_URL}/analyse`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
}

/**
 * Fetch the full list of available jobs
 */
export async function fetchJobs() {
  const response = await axios.get(`${BASE_URL}/jobs`);
  return response.data.jobs;
}
