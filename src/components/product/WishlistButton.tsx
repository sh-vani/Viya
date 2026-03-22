import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/hooks/useWishlist";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface WishlistButtonProps {
    productId: number;
    className?: string;
    size?: "default" | "sm" | "lg" | "icon";
    variant?: "default" | "ghost" | "outline";
    showText?: boolean;
}

const WishlistButton = ({
    productId,
    className,
    size = "icon",
    variant = "ghost",
    showText = false
}: WishlistButtonProps) => {
    const { isInWishlist, toggleWishlist } = useWishlist();
    const inWishlist = isInWishlist(productId);

    const handleClick = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const result = await toggleWishlist(productId);

        if (result.success) {
            if (result.action === 'added') {
                toast.success("Added to Wishlist", {
                    description: "This item has been saved to your sacred sanctuary.",
                });
            } else {
                toast.info("Removed from Wishlist");
            }
        } else if (result.error) {
            toast.error(result.error);
        }
    };

    return (
        <Button
            size={size}
            variant={variant}
            className={cn(
                "transition-all",
                inWishlist && "text-red-500",
                className
            )}
            onClick={handleClick}
            aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
            <Heart
                className={cn(
                    "h-4 w-4",
                    inWishlist && "fill-current"
                )}
            />
            {showText && (
                <span className="ml-2">
                    {inWishlist ? "Saved" : "Save"}
                </span>
            )}
        </Button>
    );
};

export default WishlistButton;
