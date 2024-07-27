export const getJobs = async () => {
  const res = await fetch(
    "http://localhost:8000/jobs",
    {
      method: "GET",
    }
  );
  const data = await res.json();
  return data;
};

export const getJobById = async (id) => {
  const token = await window.Clerk.session.getToken();
  
  const res = await fetch(`http://localhost:8000/jobs/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  return data;
};

export const createJob = async ({
  title,
  description,
  type,
  location,
  questions,
}) => {
  const token = await window.Clerk.session.getToken();

  await fetch("http://localhost:8000/jobs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title,
      description,
      type,
      location,
      questions,
    }),
  });
};
