import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import MobileLayout from "@/components/layout/MobileLayout";
import Home from "@/pages/Home";
import Missions from "@/pages/Missions";
import Predictions from "@/pages/Predictions";
import Partners from "@/pages/Partners";
import Profile from "@/pages/Profile";
import Shop from "@/pages/Shop";
import Login from "@/pages/Login";
import NotFound from "@/pages/not-found";
import { useStore } from "@/lib/store";

function AppRouter() {
  return (
    <MobileLayout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/missions" component={Missions} />
        <Route path="/predictions" component={Predictions} />
        <Route path="/partners" component={Partners} />
        <Route path="/profile" component={Profile} />
        <Route path="/shop" component={Shop} />
        <Route component={NotFound} />
      </Switch>
    </MobileLayout>
  );
}

function App() {
  const { isAuthenticated } = useStore();

  return (
    <QueryClientProvider client={queryClient}>
        {isAuthenticated ? <AppRouter /> : <Login />}
        <Toaster />
    </QueryClientProvider>
  );
}

export default App;
