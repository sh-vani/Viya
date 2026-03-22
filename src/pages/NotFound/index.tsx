import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import ViyaHeader from "@/components/header/ViyaHeader";
import ViyaFooter from "@/components/footer/ViyaFooter";

const NotFound = () => {
 const location = useLocation();

 useEffect(() => {
  console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  document.title = "Page Not Found - Viya";
 }, [location.pathname]);

 return (
  <div className="min-h-screen bg-background dark:bg-black flex flex-col">
   <ViyaHeader />
   
   <main className="flex-1 flex items-center justify-center px-4">
    <div className="text-center max-w-md">
     <h1 className="font-display text-6xl font-bold text-gold-400 mb-4">404</h1>
     <h2 className="text-2xl font-semibold text-foreground mb-4">
      Oops! Page not found
     </h2>
     <p className="text-muted-foreground mb-8">
      The page you're looking for doesn't exist or has been moved. 
      Let's get you back to exploring our beautiful jewellery.
     </p>
     <Link to="/">
      <Button className="rounded-full">
       <Home className="h-4 w-4 mr-2" />
       Back to Home
      </Button>
     </Link>
    </div>
   </main>
   
   <ViyaFooter />
  </div>
 );
};

export default NotFound;


