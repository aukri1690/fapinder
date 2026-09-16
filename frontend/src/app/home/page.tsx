import SwipeDeck, { type Item } from "../../components/SwipeDeck";

const getItems = async (): Promise<Item[]> => {
  const res = await fetch(`${process.env.GO_API_URL}/api/item`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("failed to fetch items");
  }

  return res.json();
};

const Home = async () => {
  const items = await getItems();

  return <SwipeDeck items={items} />;
};

export default Home;