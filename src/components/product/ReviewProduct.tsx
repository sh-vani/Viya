import { useState, ReactNode } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

/* ================= STAR ================= */
const Star = ({
    active,
    onClick,
}: {
    active: boolean;
    onClick: () => void;
}) => (
    <svg
        viewBox="0 0 20 20"
        fill="currentColor"
        onClick={onClick}
        className={`h-6 w-6 cursor-pointer transition ${active ? "text-[#E5B876]" : "text-muted-foreground/30"
            }`}
    >
        <path
            fillRule="evenodd"
            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z"
            clipRule="evenodd"
        />
    </svg>
);

interface ReviewProductProps {
    children?: ReactNode;
    triggerClassName?: string;
}

const ReviewProduct = ({ children, triggerClassName }: ReviewProductProps) => {
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");

    const submit = () => {
        // Simple submission logic
        console.log("Review submitted:", { rating, review });
        setOpen(false);
        setRating(0);
        setReview("");
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children ? (
                    <button
                        type="button"
                        className={`appearance-none bg-transparent border-none p-0 m-0 cursor-pointer text-left block ${triggerClassName}`}
                    >
                        {children}
                    </button>
                ) : (
                    <Button
                        variant="outline"
                        className="h-12 w-full rounded-none border-foreground font-light text-foreground hover:bg-foreground hover:text-background"
                    >
                        Review product
                    </Button>
                )}
            </DialogTrigger>

            <DialogContent className="relative max-w-sm rounded-3xl p-8 border-none box-shadow-premium">
                {/* Close */}
                <button
                    onClick={() => setOpen(false)}
                    className="absolute right-6 top-6 text-muted-foreground hover:text-foreground transition-colors"
                >
                    <X className="h-5 w-5" />
                </button>

                <DialogHeader>
                    <DialogTitle className="text-2xl font-display font-bold text-[#2A241E]">
                        Share Your Experience
                    </DialogTitle>
                    <p className="text-sm text-muted-foreground font-light">Your feedback helps our community thrive.</p>
                </DialogHeader>

                <div className="mt-8 space-y-8">
                    {/* Rating */}
                    <div className="space-y-4 text-center">
                        <p className="text-xs uppercase tracking-widest font-bold text-[#8C8276]">Select Rating</p>
                        <div className="flex justify-center gap-2">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <Star
                                    key={i}
                                    active={i <= rating}
                                    onClick={() => setRating(i)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Review */}
                    <div className="space-y-3">
                        <p className="text-xs uppercase tracking-widest font-bold text-[#8C8276]">Your Reflection</p>
                        <Textarea
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            placeholder="How did this piece make you feel? Describe the craftsmanship..."
                            className="min-h-32 resize-none rounded-2xl bg-[#FBF9F6] border-none focus:ring-1 focus:ring-[#E5B876] font-light p-4 text-sm"
                        />
                    </div>

                    {/* Submit */}
                    <Button
                        onClick={submit}
                        disabled={!rating || !review.trim()}
                        className="h-14 w-full rounded-2xl bg-[#2B1E0E] text-white hover:bg-[#1f160a] font-bold shadow-lg transition-all active:scale-95"
                    >
                        Submit Reflection
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ReviewProduct;
