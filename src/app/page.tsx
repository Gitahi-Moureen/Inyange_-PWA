// import HeroSection from "./components/homepage/page";
// import Navbar from "./components/Navbar";

// export default function Home() {
//   return (
//     <div>
//       <HeroSection/>
//       <Navbar/>

//     </div>

//   );
// }
import HeroSection from "./components/homepage/page";
import { CartProvider } from "./context/page";
import Navbar from "./components/Navbar";
export default function Home() {
  return (
    <CartProvider>
      {" "}
      {/* Wrap your components with CartProvider */}
      <Navbar />
      <HeroSection />
    </CartProvider>
  );
}
