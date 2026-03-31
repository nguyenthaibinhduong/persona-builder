import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LanguageProvider>
        <AdminProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/cv-builder" element={<CVBuilder />} />
                <Route path="/adminabc" element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="sections" element={<AdminSections />} />
                  <Route path="projects" element={<AdminProjects />} />
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
