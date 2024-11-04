import { db } from "@/db";
import { bikes } from "@/db/schema";
import { ilike, desc, eq } from "drizzle-orm";

export async function getBikes(query: string) {
  const filteredBikes = await db.query.bikes.findMany({
    where: query 
      ? (bikes, { or }) => 
          or(
            ilike(bikes.name, `%${query}%`),
            ilike(bikes.type, `%${query}%`)
          )
      : undefined, // No filter if query is empty
    orderBy: desc(bikes.id), // Sort by id in descending order
  });

  return filteredBikes;
}

export async function getBikeById(id: number) {
  const bike = await db.query.bikes.findFirst({
    where: eq(bikes.id, id),
  });

  return bike;
}