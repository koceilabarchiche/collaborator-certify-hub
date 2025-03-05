
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CollaboratorsList } from "@/components/collaborators/CollaboratorsList";
import { CertificationsList } from "@/components/certifications/CertificationsList";
import AppLayout from "@/components/layout/AppLayout";

const Index = () => {
  return (
    <AppLayout>
      <div className="space-y-8">
        <DashboardHeader />
        
        <Tabs defaultValue="certifications" className="space-y-4">
          <TabsList>
            <TabsTrigger value="certifications">Certifications</TabsTrigger>
            <TabsTrigger value="collaborators">Collaborateurs</TabsTrigger>
          </TabsList>
          <TabsContent value="certifications" className="animate-fade-in">
            <CertificationsList />
          </TabsContent>
          <TabsContent value="collaborators" className="animate-fade-in">
            <CollaboratorsList />
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Index;
