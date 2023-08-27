export default async function getCustomerData() {
  const res = await fetch(
    "https://api.jsonbin.io/v3/b/62b9da24192a674d291c921b"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
