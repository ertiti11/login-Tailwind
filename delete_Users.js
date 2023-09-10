/* eslint-disable no-unused-vars */
import PocketBase from "pocketbase";

export const client = new PocketBase("https://login.pockethost.io");

function print(data) {
  console.log(data);
}
const Admin = await client.admins.authWithPassword(
  "admin@admin.com",
  "29700709@Ll"
);
async function main() {
  const resultList = await client.collection("users").getFullList();

  resultList.map(async (item) => {
    await client.collection("users").delete(item.id);
    print(item.id + " deleted");
  });
}

main();
