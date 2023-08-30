import PocketBase from "pocketbase";

export const client = new PocketBase("https://login.pockethost.io");

export const registerRequest = async (user) =>
  await client.collection("users").create(user);

// (optional) send an email verification request
// await client.collection("users").requestVerification("test@example.com");

export const loginRequest = async ({ email, password }) => {
  console.log("loginRequest", email, password);
  return await client.collection("users").authWithPassword(email, password);
};
