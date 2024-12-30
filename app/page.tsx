import Hero from "./Components/Hero";
import Body from "./Components/Body";
import Footer from "./Components/Footer";
export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Body />
      <Footer />
    </div>
  );
}
