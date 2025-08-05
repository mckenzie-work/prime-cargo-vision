import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import SeaCargo from "./pages/SeaCargo";
import AirCargo from "./pages/AirCargo";
import ChinaWarehouse from "./pages/ChinaWarehouse";
import GhanaWarehouse from "./pages/GhanaWarehouse";
import Claims from "./pages/Claims";
import Admins from "./pages/Admins";
import Settings from "./pages/Settings";
import ShippingRates from "./pages/ShippingRates";
import ProfileSettings from "./pages/ProfileSettings";
import Notifications from "./pages/Notifications";
import Support from "./pages/Support";
import ContainerDetails from "./pages/ContainerDetails";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <Dashboard />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/clients"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <Clients />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/cargos/sea"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <SeaCargo />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/cargos/air"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <AirCargo />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/goods-received/china"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <ChinaWarehouse />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/goods/china"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <ChinaWarehouse />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/goods-received/ghana"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <GhanaWarehouse />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/goods/ghana"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <GhanaWarehouse />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/cargos/claims"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <Claims />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-admins"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <Admins />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <Settings />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/rates"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <ShippingRates />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <ProfileSettings />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <Notifications />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/support"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <Support />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/container/:id"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <ContainerDetails />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </AuthProvider>
);

export default App;