import { useEffect } from "react";
import { Leaf, Recycle, Heart, Package } from "lucide-react";
import ViyaHeader from "../../components/header/ViyaHeader";
import ViyaFooter from "../../components/footer/ViyaFooter";

const Sustainability = () => {
 useEffect(() => {
  document.title = "Sustainability - Viya";
 }, []);

 return (
  <div className="min-h-screen bg-background dark:bg-black">
   <ViyaHeader />
   
   <main className="pt-6 pb-16">
    <div className="container mx-auto px-4 max-w-4xl">
     {/* Header */}
     <div className="text-center mb-12">
      <h1 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">
       Our Commitment to Sustainability
      </h1>
      <p className="text-muted-foreground max-w-2xl mx-auto">
       Beautiful jewellery that's kind to the planet
      </p>
     </div>

     {/* Main Message */}
     <div className="bg-gradient-to-br from-green-50 to-cream-50 rounded-2xl p-8 md:p-12 text-center mb-12">
      <Leaf className="h-12 w-12 text-green-600 mx-auto mb-6" />
      <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
       Fashion with Responsibility
      </h2>
      <p className="text-muted-foreground max-w-lg mx-auto">
       At Viya, we believe that looking good shouldn't come at the cost of our environment. 
       We're committed to sustainable practices in every aspect of our business.
      </p>
     </div>

     {/* Initiatives */}
     <div className="grid md:grid-cols-2 gap-6 mb-12">
      <div className="bg-cream-50 rounded-2xl p-6">
       <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
        <Package className="h-6 w-6 text-green-600" />
       </div>
       <h3 className="font-semibold text-foreground mb-2">Eco-Friendly Packaging</h3>
       <p className="text-sm text-muted-foreground">
        All our packaging is made from recycled materials and is 100% recyclable. 
        We use minimal plastic and opt for paper-based alternatives.
       </p>
      </div>
      
      <div className="bg-cream-50 rounded-2xl p-6">
       <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
        <Recycle className="h-6 w-6 text-green-600" />
       </div>
       <h3 className="font-semibold text-foreground mb-2">Quality Over Quantity</h3>
       <p className="text-sm text-muted-foreground">
        We focus on creating durable, timeless pieces that last. 
        Our jewellery is designed to be worn for years, not discarded after a few uses.
       </p>
      </div>
      
      <div className="bg-cream-50 rounded-2xl p-6">
       <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
        <Heart className="h-6 w-6 text-green-600" />
       </div>
       <h3 className="font-semibold text-foreground mb-2">Ethical Sourcing</h3>
       <p className="text-sm text-muted-foreground">
        We work with trusted suppliers who follow ethical practices. 
        Our materials are sourced responsibly with fair labor practices.
       </p>
      </div>
      
      <div className="bg-cream-50 rounded-2xl p-6">
       <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
        <Leaf className="h-6 w-6 text-green-600" />
       </div>
       <h3 className="font-semibold text-foreground mb-2">Carbon Conscious</h3>
       <p className="text-sm text-muted-foreground">
        We optimize our shipping routes to reduce carbon emissions and 
        partner with eco-conscious logistics providers.
       </p>
      </div>
     </div>

     {/* Goals */}
     <div className="bg-cream-50 rounded-2xl p-8">
      <h2 className="font-display text-xl font-semibold text-foreground text-center mb-8">
       Our Goals for 2025
      </h2>
      <div className="grid md:grid-cols-3 gap-6 text-center">
       <div>
        <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
        <p className="text-sm text-muted-foreground">Plastic-free packaging</p>
       </div>
       <div>
        <div className="text-3xl font-bold text-green-600 mb-2">50%</div>
        <p className="text-sm text-muted-foreground">Recycled materials in products</p>
       </div>
       <div>
        <div className="text-3xl font-bold text-green-600 mb-2">Carbon</div>
        <p className="text-sm text-muted-foreground">Neutral shipping</p>
       </div>
      </div>
     </div>
    </div>
   </main>
   
   <ViyaFooter />
  </div>
 );
};

export default Sustainability;


