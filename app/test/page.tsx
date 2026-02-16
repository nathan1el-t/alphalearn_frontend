// "use client";

// import { useConcepts } from "@/hooks/useConcepts";

// export default function test() {
//   const { concepts, isLoading, error } = useConcepts();

//   if (isLoading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div>
//       <h1>Concepts</h1>
//       {concepts.map((concept) => (
//         <div className="border" key={String(concept.conceptId)}>
//           <h2>{concept.title}</h2>
//           <p>{concept.description}</p>
//         </div>
//       ))}
//     </div>
//   );
// }
