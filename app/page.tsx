import { redirect } from "next/navigation";
//this page doesnt exist yet
export default function Home() {
  redirect("/lessons");
}