import Image from "next/image";
import RandomJokeGenerator from "./components/random-joke";

export default function Home() {
  return (
   <div>
    <RandomJokeGenerator/>
   </div>
  );
}
