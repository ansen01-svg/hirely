export const fetchJobs = async () => {
  const url =
    "https://jsearch.p.rapidapi.com/search?query=all%20developer%20in%20New-York%2C%20USA&page=1&num_pages=1&date_posted=all";
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": process.env.RAPID_API_KEY || "",
      "x-rapidapi-host": "jsearch.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);

    if (response.status !== 200) {
      return {};
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    return {};
  }
};
