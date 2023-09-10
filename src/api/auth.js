import PocketBase from "pocketbase";

export const client = new PocketBase("https://login.pockethost.io");

export const loginRequest = async ({ email, password }) => {
  return await client.collection("users").authWithPassword(email, password);
};

export const registerRequest = async (user) => {
  const newUser = await client.collection("users").create(user);
  if (newUser) {
    console.log("newUser", newUser);
    return loginRequest({ email: user.email, password: user.password });
  }
};

// (optional) send an email verification request
// await client.collection("users").requestVerification("test@example.com");

export const createQuest = async (quest) => {
  return await client.collection("encuesta").create(quest);
};

export const getData = async () => {
  let respuestas = [];
  try {
    const A = await client
      .collection("encuesta")
      .getFullList(
        { fields: "respuesta", filter: 'respuesta = "A"' },
        { requestKey: null }
      );
    respuestas.push(A.length);
  } catch (e) {
    console.log("A" + e);
  }

  try {
    const B = await client
      .collection("encuesta")
      .getFullList(
        { fields: "respueta", filter: 'respuesta = "B"' },
        { requestKey: null }
      );
    respuestas.push(B.length);
  } catch (e) {
    console.log("B" + e);
  }

  const getVotes = await client
    .collection("encuesta")
    .getFullList({ fields: "respuesta" }, { requestKey: null });

  const data = {
    votes: getVotes.length,
    respuestas: respuestas,
  };
  return data;
};
