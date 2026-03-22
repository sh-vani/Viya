
import ViyaHeader from "@/components/header/ViyaHeader";
import ViyaFooter from "@/components/footer/ViyaFooter";
import HeroBanner from "@/components/home/HeroBanner";
import FlashSale from "@/components/home/FlashSale";
import ExquisiteSelection from "@/components/home/ExquisiteSelection";
import BrandSection from "@/components/home/BrandSection";
import ExclusiveCollection from "@/components/home/ExclusiveCollection";
import VIYAExperience from "@/components/home/VIYAExperience";

const Index = () => {
    return (
        <div className="min-h-screen bg-background dark:bg-black">
            <ViyaHeader />

            <main>
                <HeroBanner />
                 <FlashSale />
                <ExquisiteSelection />
                <ExclusiveCollection />
                <BrandSection />
                <VIYAExperience />
            </main>

            <ViyaFooter />
        </div>
    );
};

export default Index;
