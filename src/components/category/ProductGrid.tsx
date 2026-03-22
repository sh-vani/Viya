import ProductCard from "@/components/product/ProductCard";
import Pagination from "./Pagination";
import pantheonImage from "@/assets/pantheon.jpg";
import eclipseImage from "@/assets/eclipse.jpg";
import haloImage from "@/assets/halo.jpg";
import obliqueImage from "@/assets/oblique.jpg";
import lintelImage from "@/assets/lintel.jpg";
import shadowlineImage from "@/assets/shadowline.jpg";
import organicEarring from "@/assets/organic-earring.png";
import linkBracelet from "@/assets/link-bracelet.png";

interface Product {
 id: number;
 name: string;
 category: string;
 price: string;
 image: string;
 isNew?: boolean;
 unit_price?: number;
}

// Extended product list for category page
const products: Product[] = [
 {
  id: 1,
  name: "Pantheon",
  category: "Earrings",
  price: "₹2,850",
  unit_price: 2850,
  image: pantheonImage,
  isNew: true,
 },
 {
  id: 2,
  name: "Eclipse",
  category: "Bracelets",
  price: "₹3,200",
  unit_price: 3200,
  image: eclipseImage,
 },
 {
  id: 3,
  name: "Halo",
  category: "Earrings",
  price: "₹1,950",
  unit_price: 1950,
  image: haloImage,
  isNew: true,
 },
 {
  id: 4,
  name: "Oblique",
  category: "Earrings",
  price: "₹1,650",
  unit_price: 1650,
  image: obliqueImage,
 },
 {
  id: 5,
  name: "Lintel",
  category: "Earrings",
  price: "₹2,250",
  unit_price: 2250,
  image: lintelImage,
 },
 {
  id: 6,
  name: "Shadowline",
  category: "Bracelets",
  price: "₹3,950",
  unit_price: 3950,
  image: shadowlineImage,
 },
 {
  id: 7,
  name: "Meridian",
  category: "Earrings",
  price: "₹2,450",
  unit_price: 2450,
  image: pantheonImage,
 },
 {
  id: 8,
  name: "Vertex",
  category: "Bracelets",
  price: "₹2,800",
  unit_price: 2800,
  image: eclipseImage,
 },
 {
  id: 9,
  name: "Apex",
  category: "Earrings",
  price: "₹1,550",
  unit_price: 1550,
  image: haloImage,
 },
 {
  id: 10,
  name: "Zenith",
  category: "Earrings",
  price: "₹1,850",
  unit_price: 1850,
  image: obliqueImage,
 },
 {
  id: 11,
  name: "Prism",
  category: "Earrings",
  price: "₹2,050",
  unit_price: 2050,
  image: lintelImage,
 },
 {
  id: 12,
  name: "Radiant",
  category: "Bracelets",
  price: "₹3,650",
  unit_price: 3650,
  image: shadowlineImage,
 },
 {
  id: 13,
  name: "Stellar",
  category: "Earrings",
  price: "₹2,150",
  unit_price: 2150,
  image: pantheonImage,
 },
 {
  id: 14,
  name: "Cosmos",
  category: "Bracelets",
  price: "₹2,950",
  unit_price: 2950,
  image: eclipseImage,
 },
 {
  id: 15,
  name: "Aurora",
  category: "Earrings",
  price: "₹1,750",
  unit_price: 1750,
  image: haloImage,
 },
 {
  id: 16,
  name: "Nebula",
  category: "Earrings",
  price: "₹1,850",
  unit_price: 1850,
  image: obliqueImage,
 },
 {
  id: 17,
  name: "Orbit",
  category: "Earrings",
  price: "₹2,350",
  unit_price: 2350,
  image: lintelImage,
 },
 {
  id: 18,
  name: "Galaxy",
  category: "Bracelets",
  price: "₹3,450",
  unit_price: 3450,
  image: shadowlineImage,
 },
 {
  id: 19,
  name: "Lunar",
  category: "Earrings",
  price: "₹2,050",
  unit_price: 2050,
  image: pantheonImage,
 },
 {
  id: 20,
  name: "Solar",
  category: "Bracelets",
  price: "₹3,150",
  unit_price: 3150,
  image: eclipseImage,
 },
 {
  id: 21,
  name: "Astral",
  category: "Earrings",
  price: "₹1,650",
  unit_price: 1650,
  image: haloImage,
 },
 {
  id: 22,
  name: "Cosmic",
  category: "Earrings",
  price: "₹1,950",
  unit_price: 1950,
  image: obliqueImage,
 },
 {
  id: 23,
  name: "Celestial",
  category: "Earrings",
  price: "₹2,250",
  unit_price: 2250,
  image: lintelImage,
 },
 {
  id: 24,
  name: "Ethereal",
  category: "Bracelets",
  price: "₹3,750",
  unit_price: 3750,
  image: shadowlineImage,
 },
];

const ProductGrid = () => {
 return (
  <section className="w-full px-6 mb-16">
   <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
    {products.map((product) => (
     <ProductCard key={product.id} product={product} />
    ))}
   </div>

   <Pagination />
  </section>
 );
};

export default ProductGrid;
