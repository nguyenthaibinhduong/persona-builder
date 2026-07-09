import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AdminProvider } from "@/contexts/AdminContext";
import Index from "./pages/Index.tsx";
import Portfolio from "./pages/Portfolio.tsx";
import CVBuilder from "./pages/CVBuilder.tsx";
import NotFound from "./pages/NotFound.tsx";
import AdminLayout from "./pages/admin/AdminLayout.tsx";
import AdminDashboard from "./pages/admin/AdminDashboard.tsx";
import AdminSections from "./pages/admin/AdminSections.tsx";
import AdminProjects from "./pages/admin/AdminProjects.tsx";
import AdminExperience from "./pages/admin/AdminExperience.tsx";
import AdminSkills from "./pages/admin/AdminSkills.tsx";
import AdminTestimonials from "./pages/admin/AdminTestimonials.tsx";
import AdminLogin from "./pages/admin/AdminLogin.tsx";
import AdminBlog from "./pages/admin/AdminBlog.tsx";
import AdminServices from "./pages/admin/AdminServices.tsx";
import AdminPayments from "./pages/admin/AdminPayments.tsx";
import AdminUsers from "./pages/admin/AdminUsers.tsx";
import OrderConfirmation from "./pages/OrderConfirmation.tsx";
import MyOrders from "./pages/MyOrders.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LanguageProvider>
        <AdminProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter >
              <Routes>
                <Route path="/work" element={<Navigate to="/" replace />} />
                <Route path="/" element={<Portfolio />} />
                <Route path="/cv-builder" element={<Navigate to="/" replace />} />
                <Route path="/order-confirmation" element={<OrderConfirmation />} />
                <Route path="/my-orders" element={<MyOrders />} />
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route path="/adminabc" element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="sections" element={<AdminSections />} />
                  <Route path="projects" element={<AdminProjects />} />
                  <Route path="blog" element={<AdminBlog />} />
                  <Route path="services" element={<AdminServices />} />
                  <Route path="payments" element={<AdminPayments />} />
                  <Route path="users" element={<AdminUsers />} />
                  <Route path="experience" element={<AdminExperience />} />
                  <Route path="skills" element={<AdminSkills />} />
                  <Route path="testimonials" element={<AdminTestimonials />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AdminProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
