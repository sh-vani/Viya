// import { useEffect, useRef } from "react";
// import { X } from "lucide-react";
// import { Button } from "@/components/ui/button";

// interface ImageZoomProps {
//  images: string[];
//  initialIndex: number;
//  isOpen: boolean;
//  onClose: () => void;
// }

// const ImageZoom = ({ images, initialIndex, isOpen, onClose }: ImageZoomProps) => {
//  const scrollRef = useRef<HTMLDivElement>(null);

//  useEffect(() => {
//   const handleEscKey = (event: KeyboardEvent) => {
//    if (event.key === "Escape") {
//     onClose();
//    }
//   };

//   if (isOpen) {
//    document.addEventListener("keydown", handleEscKey);
//    document.body.style.overflow = "hidden";
//   }

//   return () => {
//    document.removeEventListener("keydown", handleEscKey);
//    document.body.style.overflow = "unset";
//   };
//  }, [isOpen, onClose]);

//  // Scroll to the selected image when modal opens
//  useEffect(() => {
//   if (isOpen && scrollRef.current) {
//    const imageElement = scrollRef.current.children[0]?.children[initialIndex] as HTMLElement;
//    if (imageElement) {
//     imageElement.scrollIntoView();
//    }
//   }
//  }, [isOpen, initialIndex]);

//  if (!isOpen) return null;

//  return (
//   <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm animate-fade-in">
//    {/* Backdrop */}
//    <div 
//     className="absolute inset-0" 
//     onClick={onClose}
//    />
   
//    {/* Close button */}
//    <Button
//     variant="ghost"
//     size="sm"
//     onClick={onClose}
//     className="absolute top-6 right-6 z-10 hover:bg-transparent text-black border-none p-2"
//    >
//     <X className="h-8 w-8" />
//    </Button>

//    {/* Scrollable image container */}
//    <div ref={scrollRef} className="relative w-full h-full overflow-y-auto">
//     <div className="space-y-4">
//      {images.map((image, index) => (
//       <div key={index} className="w-full flex justify-center">
//        <img
//         src={image}
//         alt={`Product view ${index + 1}`}
//         className="w-full max-w-none object-cover animate-scale-in"
//        />
//       </div>
//      ))}
//     </div>
//    </div>
//   </div>
//  );
// };

// export default ImageZoom;
import { useEffect, useRef } from "react";
import { X } from "lucide-react";

interface ImageZoomProps {
 images: string[];
 initialIndex: number;
 isOpen: boolean;
 onClose: () => void;
}

const ImageZoom = ({
 images,
 initialIndex,
 isOpen,
 onClose,
}: ImageZoomProps) => {
 const scrollRef = useRef<HTMLDivElement>(null);

 /* ================= ESC + BODY LOCK ================= */
 useEffect(() => {
  const handleEsc = (e: KeyboardEvent) => {
   if (e.key === "Escape") onClose();
  };

  if (isOpen) {
   document.body.style.overflow = "hidden";
   document.addEventListener("keydown", handleEsc);
  }

  return () => {
   document.body.style.overflow = "unset";
   document.removeEventListener("keydown", handleEsc);
  };
 }, [isOpen, onClose]);

 /* ================= AUTO SCROLL TO IMAGE ================= */
 useEffect(() => {
  if (isOpen && scrollRef.current) {
   const container = scrollRef.current;
   const child = container.children[initialIndex] as HTMLElement;

   if (child) {
    container.scrollTo({
     left: child.offsetLeft,
     behavior: "smooth",
    });
   }
  }
 }, [isOpen, initialIndex]);

 if (!isOpen) return null;

 return (
  <div className="fixed inset-0 z-50 bg-black">
   {/* Close Button */}
   <button
    onClick={onClose}
    className="absolute top-4 right-4 z-50 rounded-full bg-black/60 p-2"
   >
    <X className="h-6 w-6 text-white" />
   </button>

   {/* Image Slider */}
   <div
    ref={scrollRef}
    className="flex h-full w-full overflow-x-auto snap-x snap-mandatory scroll-smooth"
   >
    {images.map((img, index) => (
     <div
      key={index}
      className="flex h-full w-full flex-shrink-0 snap-center items-center justify-center"
     >
      <img
       src={img}
       alt={`Product ${index + 1}`}
       className="max-h-full max-w-full object-contain"
      />
     </div>
    ))}
   </div>
  </div>
 );
};

export default ImageZoom;

