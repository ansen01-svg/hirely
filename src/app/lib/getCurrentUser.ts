type GetcurrentUserPropType = {
  email: string;
};

export const getcurrentUser = async ({ email }: GetcurrentUserPropType) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/users/getCurrentUser?email=${email}`
    );
    // const data = await response.json();
    // return data;
    // console.log(response);
  } catch (error) {
    console.error(error);
  }
};
