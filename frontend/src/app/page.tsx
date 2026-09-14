import SwipeDeck, { type Item } from "../components/SwipeDeck";

async function getItems(): Promise<Item[]> {
  const res = await fetch(`${process.env.GO_API_URL}/api/item`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("failed to fetch items");
  }

  return res.json();
}

export default async function Home() {
  const items = await getItems();

  return <SwipeDeck items={items} />;
}