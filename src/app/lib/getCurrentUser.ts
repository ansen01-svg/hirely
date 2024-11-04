import { getSignedToken } from "./getSignedToken";

export const getCurrentUser = async () => {
  try {
    const token = await getSignedToken();

    const response = await fetch(
      `http://localhost:3000/api/users/getCurrentUser`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: { tags: ["user"] },
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Failed to fetch current user:", error);
    throw error;
  }
};
