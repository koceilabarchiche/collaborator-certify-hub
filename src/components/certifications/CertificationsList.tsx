
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/ui/SearchBar";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreHorizontal, Plus, Award, Filter, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

// Types
export interface Certification {
  id: string;
  name: string;
  provider: string;
  category: string;
  status: "active" | "expired" | "expiring-soon";
  issuedAt: string;
  expiresAt: string;
  collaborator: {
    id: string;
    name: string;
  };
}

// Sample data
const certificationsData: Certification[] = [
  {
    id: "1",
    name: "AWS Certified Solutions Architect",
    provider: "Amazon Web Services",
    category: "Cloud",
    status: "active",
    issuedAt: "2023-05-15",
    expiresAt: "2026-05-15",
    collaborator: {
      id: "1",
      name: "Sophie Martin",
    },
  },
  {
    id: "2",
    name: "Microsoft Certified: Azure Developer",
    provider: "Microsoft",
    category: "Cloud",
    status: "expiring-soon",
    issuedAt: "2022-07-10",
    expiresAt: "2024-07-10",
    collaborator: {
      id: "5",
      name: "Chloé Leroy",
    },
  },
  {
    id: "3",
    name: "Project Management Professional (PMP)",
    provider: "Project Management Institute",
    category: "Management",
    status: "active",
    issuedAt: "2022-02-28",
    expiresAt: "2025-02-28",
    collaborator: {
      id: "3",
      name: "Emma Bernard",
    },
  },
  {
    id: "4",
    name: "Certified ScrumMaster (CSM)",
    provider: "Scrum Alliance",
    category: "Agile",
    status: "expired",
    issuedAt: "2021-11-05",
    expiresAt: "2023-11-05",
    collaborator: {
      id: "1",
      name: "Sophie Martin",
    },
  },
  {
    id: "5",
    name: "ITIL Foundation",
    provider: "Axelos",
    category: "IT Service Management",
    status: "active",
    issuedAt: "2023-01-20",
    expiresAt: "2026-01-20",
    collaborator: {
      id: "5",
      name: "Chloé Leroy",
    },
  },
];

// Format date to display
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString("fr-FR", options);
};

// Function to calculate days until expiration
const getDaysUntilExpiration = (expirationDate: string) => {
  const today = new Date();
  const expiration = new Date(expirationDate);
  const diffTime = expiration.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export function CertificationsList() {
  const [certifications, setCertifications] = useState(certificationsData);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCertifications = certifications.filter(
    (certification) =>
      certification.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      certification.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
      certification.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      certification.collaborator.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="w-full sm:w-auto">
          <SearchBar 
            onSearch={setSearchQuery} 
            placeholder="Rechercher une certification..." 
            className="w-full sm:w-[300px]"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button variant="outline" size="sm" className="h-10">
            <Filter className="mr-2 h-4 w-4" />
            Filtrer
          </Button>
          <Button className="ml-auto sm:ml-0 h-10">
            <Plus className="mr-2 h-4 w-4" />
            Ajouter une certification
          </Button>
        </div>
      </div>

      <div className="rounded-xl border bg-card overflow-hidden animate-fade-in">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Certification</TableHead>
              <TableHead>Collaborateur</TableHead>
              <TableHead>Catégorie</TableHead>
              <TableHead>Date d'obtention</TableHead>
              <TableHead>Date d'expiration</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCertifications.length > 0 ? (
              filteredCertifications.map((certification) => {
                const daysUntilExpiration = getDaysUntilExpiration(certification.expiresAt);
                return (
                  <TableRow key={certification.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">
                      <div className="flex items-start space-x-3">
                        <div className="rounded-full p-2 bg-primary/10 text-primary mt-0.5">
                          <Award className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="font-medium">{certification.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {certification.provider}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-7 w-7">
                          <AvatarImage src="" alt={certification.collaborator.name} />
                          <AvatarFallback className="bg-primary/10 text-primary text-xs">
                            {certification.collaborator.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span>{certification.collaborator.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="rounded-full">
                        {certification.category}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(certification.issuedAt)}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {certification.status !== "expired" ? (
                          <>
                            <Calendar className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                            <span>{formatDate(certification.expiresAt)}</span>
                          </>
                        ) : (
                          <span className="text-muted-foreground">{formatDate(certification.expiresAt)}</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={cn(
                          "rounded-full",
                          certification.status === "active" &&
                            "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20",
                          certification.status === "expired" &&
                            "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20",
                          certification.status === "expiring-soon" &&
                            "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20"
                        )}
                      >
                        {certification.status === "active" && "Valide"}
                        {certification.status === "expired" && "Expirée"}
                        {certification.status === "expiring-soon" && `Expire dans ${daysUntilExpiration} jours`}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            className="h-8 w-8 p-0"
                          >
                            <span className="sr-only">Menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Voir les détails</DropdownMenuItem>
                          <DropdownMenuItem>Modifier</DropdownMenuItem>
                          <DropdownMenuItem>Renouveler</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="h-24 text-center"
                >
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <Award className="h-10 w-10 mb-2 text-muted-foreground/50" />
                    <p>Aucune certification trouvée</p>
                    <p className="text-sm">
                      Essayez de modifier votre recherche ou d'ajouter une nouvelle certification
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
