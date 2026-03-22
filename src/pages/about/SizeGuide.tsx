import { useEffect } from "react";
import ViyaHeader from "../../components/header/ViyaHeader";
import ViyaFooter from "../../components/footer/ViyaFooter";

const SizeGuide = () => {
 useEffect(() => {
  document.title = "Size Guide - Viya";
 }, []);

 return (
  <div className="min-h-screen bg-background dark:bg-black">
   <ViyaHeader />
   
   <main className="pt-6 pb-16">
    <div className="container mx-auto px-4 max-w-4xl">
     {/* Header */}
     <div className="text-center mb-12">
      <h1 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">
       Size Guide
      </h1>
      <p className="text-muted-foreground">
       Find your perfect fit with our comprehensive sizing guide
      </p>
     </div>

     {/* Ring Sizes */}
     <section className="mb-12">
      <h2 className="font-display text-2xl font-semibold text-foreground mb-6">
       Ring Sizing
      </h2>
      <div className="bg-cream-50 rounded-2xl p-6 mb-6">
       <h3 className="font-semibold text-foreground mb-4">How to Measure Your Ring Size</h3>
       <div className="grid md:grid-cols-2 gap-6">
        <div>
         <h4 className="font-medium text-foreground mb-2">Method 1: Using a Ring</h4>
         <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
          <li>Take a ring that fits well</li>
          <li>Measure inner diameter in mm</li>
          <li>Match with size chart below</li>
         </ol>
        </div>
        <div>
         <h4 className="font-medium text-foreground mb-2">Method 2: Using String</h4>
         <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
          <li>Wrap string around finger</li>
          <li>Mark where it overlaps</li>
          <li>Measure length and divide by 3.14</li>
         </ol>
        </div>
       </div>
      </div>
      
      <div className="overflow-x-auto">
       <table className="w-full border-collapse">
        <thead>
         <tr className="bg-cream-100">
          <th className="p-3 text-left text-sm font-medium">Indian Size</th>
          <th className="p-3 text-left text-sm font-medium">US Size</th>
          <th className="p-3 text-left text-sm font-medium">Diameter (mm)</th>
          <th className="p-3 text-left text-sm font-medium">Circumference (mm)</th>
         </tr>
        </thead>
        <tbody className="divide-y divide-cream-200">
         {[
          { indian: "6", us: "3", diameter: "14.1", circumference: "44.2" },
          { indian: "8", us: "4", diameter: "14.9", circumference: "46.8" },
          { indian: "10", us: "5", diameter: "15.7", circumference: "49.3" },
          { indian: "12", us: "6", diameter: "16.5", circumference: "51.9" },
          { indian: "14", us: "7", diameter: "17.3", circumference: "54.4" },
          { indian: "16", us: "8", diameter: "18.1", circumference: "56.9" },
          { indian: "18", us: "9", diameter: "18.9", circumference: "59.5" },
         ].map((size, index) => (
          <tr key={index} className="hover:bg-cream-50">
           <td className="p-3 text-sm">{size.indian}</td>
           <td className="p-3 text-sm">{size.us}</td>
           <td className="p-3 text-sm">{size.diameter}</td>
           <td className="p-3 text-sm">{size.circumference}</td>
          </tr>
         ))}
        </tbody>
       </table>
      </div>
     </section>

     {/* Bangles */}
     <section className="mb-12">
      <h2 className="font-display text-2xl font-semibold text-foreground mb-6">
       Bangle Sizing
      </h2>
      <div className="bg-cream-50 rounded-2xl p-6">
       <div className="grid md:grid-cols-2 gap-8">
        <div>
         <h3 className="font-semibold text-foreground mb-4">Standard Sizes</h3>
         <div className="space-y-3">
          <div className="flex justify-between py-2 border-b border-cream-200">
           <span className="text-muted-foreground">2.2</span>
           <span className="text-foreground">Extra Small</span>
          </div>
          <div className="flex justify-between py-2 border-b border-cream-200">
           <span className="text-muted-foreground">2.4</span>
           <span className="text-foreground">Small</span>
          </div>
          <div className="flex justify-between py-2 border-b border-cream-200">
           <span className="text-muted-foreground">2.6</span>
           <span className="text-foreground">Medium</span>
          </div>
          <div className="flex justify-between py-2 border-b border-cream-200">
           <span className="text-muted-foreground">2.8</span>
           <span className="text-foreground">Large</span>
          </div>
          <div className="flex justify-between py-2">
           <span className="text-muted-foreground">2.10</span>
           <span className="text-foreground">Extra Large</span>
          </div>
         </div>
        </div>
        <div>
         <h3 className="font-semibold text-foreground mb-4">How to Measure</h3>
         <p className="text-sm text-muted-foreground mb-4">
          Measure the widest part of your palm when your fingers are pressed together. The measurement in inches corresponds to the bangle size.
         </p>
         <p className="text-sm text-muted-foreground">
          <strong>Tip:</strong> If you're between sizes, choose the larger size for comfort.
         </p>
        </div>
       </div>
      </div>
     </section>

     {/* Necklaces */}
     <section>
      <h2 className="font-display text-2xl font-semibold text-foreground mb-6">
       Necklace & Chain Lengths
      </h2>
      <div className="bg-cream-50 rounded-2xl p-6">
       <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
         <div className="flex justify-between py-2 border-b border-cream-200">
          <span className="text-muted-foreground">Choker</span>
          <span className="text-foreground">14-16 inches</span>
         </div>
         <div className="flex justify-between py-2 border-b border-cream-200">
          <span className="text-muted-foreground">Princess</span>
          <span className="text-foreground">17-19 inches</span>
         </div>
         <div className="flex justify-between py-2 border-b border-cream-200">
          <span className="text-muted-foreground">Matinee</span>
          <span className="text-foreground">20-24 inches</span>
         </div>
         <div className="flex justify-between py-2">
          <span className="text-muted-foreground">Opera</span>
          <span className="text-foreground">28-36 inches</span>
         </div>
        </div>
        <div className="text-sm text-muted-foreground">
         <p className="mb-3">
          <strong>Choker:</strong> Sits on the neck, perfect for round necklines.
         </p>
         <p className="mb-3">
          <strong>Princess:</strong> Most popular length, suits most necklines.
         </p>
         <p className="mb-3">
          <strong>Matinee:</strong> Falls at the top of the bust, great for layering.
         </p>
         <p>
          <strong>Opera:</strong> Long length, can be doubled for layered look.
         </p>
        </div>
       </div>
      </div>
     </section>
    </div>
   </main>
   
   <ViyaFooter />
  </div>
 );
};

export default SizeGuide;


