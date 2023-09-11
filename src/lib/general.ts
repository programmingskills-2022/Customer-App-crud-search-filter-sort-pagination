// export default async function getCustomerData() {
//   try {
//     const res = await fetch(
//       "https://api.jsonbin.io/v3/b/62b9da24192a674d291c921b"
//     );

//     if (!res.ok) {
//       throw new Error("Failed to fetch data");
//     }
//     return res.json();
//   } catch (err) {
//     console.error("An error occurred:", err);
//   }
// }

export function generateId(array: any) {
  return array.length > 1 ? array[array.length - 1].id + 1 : 1;
}
