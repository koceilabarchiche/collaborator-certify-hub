
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
import { MoreHorizontal, Plus, User, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

// Types
export interface Collaborator {
  id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  status: "active" | "inactive";
  certificationCount: number;
}

// Sample data
const collaboratorsData: Collaborator[] = [
  {
    id: "1",
    name: "Sophie Martin",
    email: "sophie.martin@exemple.fr",
    department: "IT",
    position: "Développeur Senior",
    status: "active",
    certificationCount: 3,
  },
  {
    id: "2",
    name: "Thomas Dubois",
    email: "thomas.dubois@exemple.fr",
    department: "Ressources Humaines",
    position: "Recruteur",
    status: "active",
    certificationCount: 1,
  },
  {
    id: "3",
    name: "Emma Bernard",
    email: "emma.bernard@exemple.fr",
    department: "Marketing",
    position: "Chef de Projet",
    status: "active",
    certificationCount: 2,
  },
  {
    id: "4",
    name: "Lucas Petit",
    email: "lucas.petit@exemple.fr",
    department: "Finance",
    position: "Analyste Financier",
    status: "inactive",
    certificationCount: 0,
  },
  {
    id: "5",
    name: "Chloé Leroy",
    email: "chloe.leroy@exemple.fr",
    department: "IT",
    position: "Architecte Solution",
    status: "active",
    certificationCount: 5,
  },
];

export function CollaboratorsList() {
  const [collaborators, setCollaborators] = useState(collaboratorsData);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCollaborators = collaborators.filter(
    (collaborator) =>
      collaborator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      collaborator.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      collaborator.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="w-full sm:w-auto">
          <SearchBar 
            onSearch={setSearchQuery} 
            placeholder="Rechercher un collaborateur..." 
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
            Ajouter un collaborateur
          </Button>
        </div>
      </div>

      <div className="rounded-xl border bg-card overflow-hidden animate-fade-in">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Collaborateur</TableHead>
              <TableHead>Département</TableHead>
              <TableHead>Poste</TableHead>
              <TableHead>Certifications</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCollaborators.length > 0 ? (
              filteredCollaborators.map((collaborator) => (
                <TableRow key={collaborator.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src="" alt={collaborator.name} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {collaborator.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{collaborator.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {collaborator.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{collaborator.department}</TableCell>
                  <TableCell>{collaborator.position}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        collaborator.certificationCount > 0
                          ? "default"
                          : "outline"
                      }
                      className={cn(
                        "rounded-full",
                        collaborator.certificationCount === 0 &&
                          "text-muted-foreground"
                      )}
                    >
                      {collaborator.certificationCount}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        collaborator.status === "active"
                          ? "default"
                          : "secondary"
                      }
                      className={cn(
                        "rounded-full bg-opacity-20",
                        collaborator.status === "active"
                          ? "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {collaborator.status === "active"
                        ? "Actif"
                        : "Inactif"}
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
                        <DropdownMenuItem>Voir le profil</DropdownMenuItem>
                        <DropdownMenuItem>Modifier</DropdownMenuItem>
                        <DropdownMenuItem>Gérer les certifications</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-24 text-center"
                >
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <User className="h-10 w-10 mb-2 text-muted-foreground/50" />
                    <p>Aucun collaborateur trouvé</p>
                    <p className="text-sm">
                      Essayez de modifier votre recherche ou d'ajouter un nouveau collaborateur
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
