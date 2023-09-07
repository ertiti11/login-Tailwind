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
  let colores = [];
  try {
    const azul = await client
      .collection("encuesta")
      .getFullList(
        { fields: "colores", filter: 'colores = "azul"' },
        { requestKey: null }
      );
    colores.push(azul.length);
  } catch (e) {
    console.log("azul" + e);
  }

  try {
    const rojo = await client
      .collection("encuesta")
      .getFullList(
        { fields: "colores", filter: 'colores = "rojo"' },
        { requestKey: null }
      );
    colores.push(rojo.length);
  } catch (e) {
    console.log("rojo" + e);
  }

  try {
    const verde = await client
      .collection("encuesta")
      .getFullList(
        { fields: "colores", filter: 'colores = "verde"' },
        { requestKey: null }
      );
    colores.push(verde.length);
  } catch (e) {
    console.log("verde" + e);
  }

  const getVotes = await client
    .collection("encuesta")
    .getFullList({ fields: "colores" }, { requestKey: null });

  const data = {
    votes: getVotes.length,
    colores: colores,
  };
  return data;
};
