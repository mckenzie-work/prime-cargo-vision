import { useState } from "react";
import { Search, Plus, Filter, MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const clients = [
  {
    id: "CL001",
    name: "Global Traders Ltd",
    email: "contact@globaltraders.com",
    phone: "+233 24 123 4567",
    totalShipments: 24,
    activeShipments: 3,
    totalValue: "$45,600",
    status: "active" as const,
    lastActivity: "2024-08-01",
    location: "Accra, Ghana",
  },
  {
    id: "CL002", 
    name: "Express Imports Co.",
    email: "info@expressimports.gh",
    phone: "+233 20 987 6543",
    totalShipments: 18,
    activeShipments: 1,
    totalValue: "$32,400",
    status: "active" as const,
    lastActivity: "2024-07-30",
    location: "Kumasi, Ghana",
  },
  {
    id: "CL003",
    name: "West African Supplies",
    email: "admin@wasupplies.com", 
    phone: "+233 26 555 7890",
    totalShipments: 42,
    activeShipments: 5,
    totalValue: "$78,900",
    status: "active" as const,
    lastActivity: "2024-08-01",
    location: "Tema, Ghana",
  },
  {
    id: "CL004",
    name: "Modern Electronics",
    email: "sales@modernelec.gh",
    phone: "+233 23 444 1122",
    totalShipments: 6,
    activeShipments: 0,
    totalValue: "$15,200",
    status: "inactive" as const,
    lastActivity: "2024-06-15",
    location: "Takoradi, Ghana",
  },
];

export default function Clients() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive">("all");

  const filteredClients = clients.filter((client) => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || client.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Clients</h1>
          <p className="text-muted-foreground mt-1">
            Manage your client relationships and view shipping history
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Client
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search clients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={filterStatus === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus("all")}
          >
            All ({clients.length})
          </Button>
          <Button
            variant={filterStatus === "active" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus("active")}
          >
            Active ({clients.filter(c => c.status === "active").length})
          </Button>
          <Button
            variant={filterStatus === "inactive" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus("inactive")}
          >
            Inactive ({clients.filter(c => c.status === "inactive").length})
          </Button>
        </div>
      </div>

      {/* Clients Table */}
      <div className="logistics-card">
        <div className="overflow-x-auto">
          <table className="logistics-table">
            <thead>
              <tr>
                <th>Client</th>
                <th>Contact</th>
                <th>Shipments</th>
                <th>Total Value</th>
                <th>Last Activity</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-muted/50">
                  <td>
                    <div>
                      <div className="font-medium">{client.name}</div>
                      <div className="text-sm text-muted-foreground">{client.id}</div>
                      <div className="text-xs text-muted-foreground">{client.location}</div>
                    </div>
                  </td>
                  <td>
                    <div>
                      <div className="text-sm">{client.email}</div>
                      <div className="text-sm text-muted-foreground">{client.phone}</div>
                    </div>
                  </td>
                  <td>
                    <div>
                      <div className="font-medium">{client.totalShipments} total</div>
                      <div className="text-sm text-muted-foreground">{client.activeShipments} active</div>
                    </div>
                  </td>
                  <td className="font-medium">{client.totalValue}</td>
                  <td className="text-sm">{client.lastActivity}</td>
                  <td>
                    <StatusBadge status={client.status} />
                  </td>
                  <td>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Client
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Client
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="logistics-card p-4">
          <div className="text-sm text-muted-foreground">Total Clients</div>
          <div className="text-2xl font-semibold mt-1">{clients.length}</div>
        </div>
        <div className="logistics-card p-4">
          <div className="text-sm text-muted-foreground">Active Clients</div>
          <div className="text-2xl font-semibold mt-1">{clients.filter(c => c.status === "active").length}</div>
        </div>
        <div className="logistics-card p-4">
          <div className="text-sm text-muted-foreground">Total Shipments</div>
          <div className="text-2xl font-semibold mt-1">{clients.reduce((sum, c) => sum + c.totalShipments, 0)}</div>
        </div>
        <div className="logistics-card p-4">
          <div className="text-sm text-muted-foreground">Total Value</div>
          <div className="text-2xl font-semibold mt-1">$172,100</div>
        </div>
      </div>
    </div>
  );
}