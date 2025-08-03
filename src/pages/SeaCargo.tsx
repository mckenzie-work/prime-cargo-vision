import { useState } from "react";
import { Search, Plus, Filter, Ship, MapPin, Calendar, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/ui/status-badge";

const seaCargo = [
  {
    id: "SC001",
    containerNo: "MSKU7823456",
    client: "Global Traders Ltd",
    origin: "Shanghai Port",
    destination: "Tema Port",
    loadingDate: "2024-07-15",
    eta: "2024-08-15",
    cbm: "67.5",
    weight: "12,400 kg",
    status: "in-transit" as const,
    vessel: "MSC MEDITERRANEAN",
    voyage: "24W28",
    goods: "Electronics & Machinery",
  },
  {
    id: "SC002",
    containerNo: "COSCO8901234", 
    client: "West African Supplies",
    origin: "Shenzhen Port",
    destination: "Tema Port",
    loadingDate: "2024-07-20",
    eta: "2024-08-20",
    cbm: "45.2",
    weight: "8,900 kg", 
    status: "in-transit" as const,
    vessel: "COSCO SHIPPING",
    voyage: "24W29",
    goods: "Textiles & Furniture",
  },
  {
    id: "SC003",
    containerNo: "EVER9876543",
    client: "Express Imports Co.",
    origin: "Ningbo Port",
    destination: "Tema Port", 
    loadingDate: "2024-07-25",
    eta: "2024-08-25",
    cbm: "32.8",
    weight: "6,200 kg",
    status: "pending" as const,
    vessel: "EVERGREEN MARINE",
    voyage: "24W30",
    goods: "Home Appliances",
  },
  {
    id: "SC004",
    containerNo: "HMMU5544332",
    client: "Modern Electronics",
    origin: "Qingdao Port",
    destination: "Tema Port",
    loadingDate: "2024-06-10",
    eta: "2024-07-10",
    cbm: "28.4",
    weight: "5,100 kg",
    status: "delivered" as const,
    vessel: "HMM ALGECIRAS",
    voyage: "24W22",
    goods: "Computer Parts",
  },
];

export default function SeaCargo() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "in-transit" | "pending" | "delivered">("all");

  const filteredCargo = seaCargo.filter((cargo) => {
    const matchesSearch = cargo.containerNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cargo.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cargo.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || cargo.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground flex items-center">
            <Ship className="h-6 w-6 mr-3 text-primary" />
            Sea Cargo
          </h1>
          <p className="text-muted-foreground mt-1">
            Track and manage all sea freight shipments
          </p>
        </div>
        <Button onClick={() => window.location.href = '/cargos/sea/new'}>
          <Plus className="h-4 w-4 mr-2" />
          Add Sea Cargo
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="logistics-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-muted-foreground">Total Containers</div>
              <div className="text-2xl font-semibold mt-1">{seaCargo.length}</div>
            </div>
            <Package className="h-8 w-8 text-primary/60" />
          </div>
        </div>
        <div className="logistics-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-muted-foreground">In Transit</div>
              <div className="text-2xl font-semibold mt-1">{seaCargo.filter(c => c.status === "in-transit").length}</div>
            </div>
            <Ship className="h-8 w-8 text-secondary/60" />
          </div>
        </div>
        <div className="logistics-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-muted-foreground">Total CBM</div>
              <div className="text-2xl font-semibold mt-1">{seaCargo.reduce((sum, c) => sum + parseFloat(c.cbm), 0).toFixed(1)}</div>
            </div>
            <Package className="h-8 w-8 text-accent/60" />
          </div>
        </div>
        <div className="logistics-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-muted-foreground">This Month</div>
              <div className="text-2xl font-semibold mt-1">12</div>
            </div>
            <Calendar className="h-8 w-8 text-warning/60" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by container, client, or tracking ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={statusFilter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("all")}
          >
            All
          </Button>
          <Button
            variant={statusFilter === "in-transit" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("in-transit")}
          >
            In Transit
          </Button>
          <Button
            variant={statusFilter === "pending" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("pending")}
          >
            Pending
          </Button>
          <Button
            variant={statusFilter === "delivered" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("delivered")}
          >
            Delivered
          </Button>
        </div>
      </div>

      {/* Cargo Table */}
      <div className="logistics-card">
        <div className="overflow-x-auto">
          <table className="logistics-table">
            <thead>
              <tr>
                <th>Tracking ID</th>
                <th>Container No.</th>
                <th>Client</th>
                <th>Route</th>
                <th>Vessel</th>
                <th>Cargo Details</th>
                <th>Loading Date</th>
                <th>ETA</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredCargo.map((cargo) => (
                <tr key={cargo.id} className="hover:bg-muted/50">
                  <td className="font-medium">{cargo.id}</td>
                  <td className="font-mono text-sm">{cargo.containerNo}</td>
                  <td>{cargo.client}</td>
                  <td>
                    <div className="flex items-center text-sm">
                      <MapPin className="h-3 w-3 mr-1 text-muted-foreground" />
                      {cargo.origin} → {cargo.destination}
                    </div>
                  </td>
                  <td>
                    <div>
                      <div className="font-medium text-sm">{cargo.vessel}</div>
                      <div className="text-xs text-muted-foreground">{cargo.voyage}</div>
                    </div>
                  </td>
                  <td>
                    <div>
                      <div className="text-sm">{cargo.goods}</div>
                      <div className="text-xs text-muted-foreground">
                        {cargo.cbm} CBM • {cargo.weight}
                      </div>
                    </div>
                  </td>
                  <td className="text-sm">{cargo.loadingDate}</td>
                  <td className="text-sm">{cargo.eta}</td>
                  <td>
                    <StatusBadge status={cargo.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}