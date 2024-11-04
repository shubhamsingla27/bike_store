import SearchForm from "../../components/SearchForm";
import BikeCard, { BikeCardType }  from "@/components/BikeCard";
import { getBikes } from "@/db/queries";


// export const dynamic = "force-dynamic";

export default async function Home({searchParams}:{
  searchParams: Promise<{query:string}>
}) {
  const query = (await searchParams).query
  const bikes = await getBikes(query)

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Start Your Next Adventure on Two Wheels
        </h1>
        <p className="sub-heading !max-w-3xl">Discover the perfect bike to explore the world—whether it's a scenic trail or a bustling city street.</p>
        <SearchForm query={query}/>
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : "Popular Bikes"}
        </p>
        <ul className="mt-7 card_grid">
          {bikes?.length > 0 ? bikes.map((bike: BikeCardType) => (
            <BikeCard key={bike?.id} bike={bike} />
          )
          ):(
            <p className="no-results">No bikes found</p>
          )}
        </ul>
      </section>
    </>
  );
}
