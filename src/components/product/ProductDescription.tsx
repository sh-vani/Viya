import { useState } from "react";
import { ChevronDown, Star } from "lucide-react";
import ReviewProduct from "./ReviewProduct";

/* ================= STAR ================= */
const CustomStar = ({ filled }: { filled: boolean }) => (
  <svg
    viewBox="0 0 20 20"
    fill="currentColor"
    className={`h-3 w-3 ${filled ? "text-[#E5B876]" : "text-[#E8E2D9]"}`}
  >
    <path
      fillRule="evenodd"
      d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z"
      clipRule="evenodd"
    />
  </svg>
);

interface ProductDescriptionProps {
  product: any;
}

const ProductDescription = ({ product }: ProductDescriptionProps) => {
  const [openSection, setOpenSection] = useState<string | null>("reviews");

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const productCode = product?.code || 'N/A';

  return (
    <div className="w-full pt-8 space-y-4">
      {/* Tab Navigation - Minimalist Style */}
      <div className="flex border-b border-[#E8E2D9] mb-10 overflow-x-auto no-scrollbar">
        {[
          { id: 'reviews', label: 'Patron Reflections' },
          { id: 'vision', label: 'The Vision' },
          { id: 'care', label: 'Maintenance' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => toggleSection(tab.id)}
            className={`pb-4 px-6 text-[10px] uppercase tracking-[0.2em] font-bold transition-all relative whitespace-nowrap ${openSection === tab.id ? "text-[#2A241E]" : "text-[#A69D91] hover:text-[#2A241E]"
              }`}
          >
            {tab.label}
            {openSection === tab.id && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#E5B876]" />
            )}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="min-h-[200px]">
        {openSection === "vision" && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 space-y-6">
            <p className="text-sm font-light text-[#5C544B] leading-relaxed italic border-l-2 border-[#E5B876] pl-6">
              "Every piece in our collection is a synthesis of ancestral Histor and modern architectural forms."
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              <DetailItem label="Reference ID" value={productCode} />
              <DetailItem label="Collection" value="Signature Histor" />
              <DetailItem label="Base" value="18k Gold Vermeil" />
              <DetailItem label="Stone" value="Sustainably Sourced" />
            </div>
          </div>
        )}

        {openSection === "care" && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 space-y-4">
            <CareItem text="Wipe gently with the signature microfiber cloth." />
            <CareItem text="Avoid contact with perfumes, oils, and harsh chemicals." />
            <CareItem text="Store in your individual luxury pouch to prevent abrasions." />
            <CareItem text="Professional cleaning recommended annually." />
          </div>
        )}

        {openSection === "reviews" && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 space-y-10">
            {/* Ratings Summary - Reference inspired bar chart */}
            <div className="flex flex-col md:flex-row gap-10 items-center bg-white p-8 rounded-[2rem] border border-[#F0EBE3] box-shadow-sm">
              <div className="text-center">
                <div className="text-5xl font-display font-bold text-[#2A241E] mb-2">4.8</div>
                <div className="flex justify-center mb-2 gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <CustomStar key={i} filled={i <= 4} />
                  ))}
                </div>
                <p className="text-[10px] uppercase tracking-widest text-[#A69D91] font-bold">128 Patron Reflections</p>
              </div>

              <div className="flex-1 w-full space-y-2.5 max-w-xs">
                {[
                  { star: 5, percent: 85 },
                  { star: 4, percent: 10 },
                  { star: 3, percent: 3 },
                  { star: 2, percent: 1 },
                  { star: 1, percent: 1 },
                ].map((item) => (
                  <div key={item.star} className="flex items-center gap-4">
                    <span className="text-[10px] font-bold w-4 text-[#2A241E]">{item.star}</span>
                    <div className="flex-1 h-1.5 bg-[#F0EBE3] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#E5B876] rounded-full"
                        style={{ width: `${item.percent}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-[#A69D91] w-8 font-medium">{item.percent}%</span>
                  </div>
                ))}
              </div>

              <div className="hidden md:block">
                <ReviewProduct />
              </div>
            </div>

            <div className="space-y-8 px-2">
              {[
                { name: "Sarah Montserrat", date: "Jan 12, 2024", text: "A masterpiece of understated elegance. Perfect balance of weight and shine. The gold finishing is exquisite.", rating: 5 },
                { name: "Evelyn Thorne", date: "Dec 28, 2023", text: "The craftsmanship is visible in every facet. VIYA truly understands modern luxury. Highly recommended for special occasions.", rating: 4 }
              ].map((review, i) => (
                <div key={i} className="pb-8 border-b border-[#F0EBE3] last:border-0 group">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex bg-[#27AE60] px-2 py-0.5 rounded-lg text-[10px] font-bold text-white items-center gap-1">
                        {review.rating} <Star className="h-2 w-2 fill-white text-white" />
                      </div>
                      <span className="text-sm font-bold text-[#2A241E]">{review.name}</span>
                      <div className="flex items-center gap-1.5 ml-2">
                        <div className="h-2 w-2 rounded-full bg-[#27AE60]/20 flex items-center justify-center">
                          <div className="h-1 w-1 rounded-full bg-[#27AE60]" />
                        </div>
                        <span className="text-[10px] uppercase tracking-widest text-[#27AE60] font-bold">Verified Patron</span>
                      </div>
                    </div>
                    <span className="text-[10px] text-[#A69D91] font-medium">{review.date}</span>
                  </div>
                  <p className="text-sm font-light text-[#5C544B] leading-relaxed mb-4 italic">"{review.text}"</p>
                </div>
              ))}
            </div>

            <div className="md:hidden">
              <ReviewProduct />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const DetailItem = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col space-y-1">
    <span className="text-[10px] uppercase tracking-widest text-[#A69D91] font-bold">{label}</span>
    <span className="text-xs font-medium text-[#2A241E]">{value}</span>
  </div>
);

const CareItem = ({ text }: { text: string }) => (
  <div className="flex items-start gap-4 group">
    <div className="h-4 w-4 rounded-full bg-[#E5B876]/10 flex items-center justify-center mt-0.5 group-hover:scale-110 transition-transform">
      <div className="h-1.5 w-1.5 rounded-full bg-[#E5B876]" />
    </div>
    <p className="text-sm font-light text-[#5C544B] leading-relaxed">{text}</p>
  </div>
);

export default ProductDescription;
