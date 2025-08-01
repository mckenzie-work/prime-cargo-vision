import { 
  Package, 
  Truck, 
  DollarSign, 
  Users, 
  Ship, 
  Plane,
  TrendingUp,
  Calendar
} from "lucide-react";
import { MetricCard } from "@/components/ui/metric-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";

const transitingCargo = [
  {
    id: "TC001",
    type: "Sea",
    container: "MSKU7823456",
    client: "Global Traders Ltd",
    route: "Shanghai → Tema",
    eta: "2024-08-15",
    status: "in-transit" as const,
  },
  {
    id: "TC002", 
    type: "Air",
    container: "AWB98765432",
    client: "Express Imports",
    route: "Guangzhou → Accra",
    eta: "2024-08-05",
    status: "delayed" as const,
  },
  {
    id: "TC003",
    type: "Sea", 
    container: "COSCO8901234",
    client: "West African Supplies",
    route: "Shenzhen → Tema",
    eta: "2024-08-20",
    status: "in-transit" as const,
  },
];

const recentClients = [
  { name: "Global Traders Ltd", activity: "New shipment created", time: "2 hours ago", status: "active" as const },
  { name: "Express Imports", activity: "Payment received", time: "4 hours ago", status: "active" as const },
  { name: "West African Supplies", activity: "Documents uploaded", time: "1 day ago", status: "pending" as const },
  { name: "Modern Electronics", activity: "Delivery completed", time: "2 days ago", status: "completed" as const },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Monitor your logistics operations and key metrics
          </p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Last 30 days
          </Button>
          <Button size="sm">
            <Package className="h-4 w-4 mr-2" />
            New Shipment
          </Button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="CBM in Warehouse"
          value="2,847"
          change={{ value: "+12% from last month", type: "increase" }}
          icon={Package}
        />
        <MetricCard
          title="Active Shipments"
          value="18"
          change={{ value: "+3 new this week", type: "increase" }}
          icon={Truck}
        />
        <MetricCard
          title="Revenue This Month"
          value="$124,750"
          change={{ value: "+8% from last month", type: "increase" }}
          icon={DollarSign}
        />
        <MetricCard
          title="Active Clients"
          value="64"
          change={{ value: "2 new this week", type: "neutral" }}
          icon={Users}
        />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Transiting Cargo */}
        <div className="xl:col-span-2">
          <div className="logistics-card">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Cargo in Transit</h3>
                <Button variant="ghost" size="sm">View All</Button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="logistics-table">
                <thead>
                  <tr>
                    <th>Tracking ID</th>
                    <th>Type</th>
                    <th>Container/AWB</th>
                    <th>Client</th>
                    <th>Route</th>
                    <th>ETA</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transitingCargo.map((cargo) => (
                    <tr key={cargo.id} className="hover:bg-muted/50">
                      <td className="font-medium">{cargo.id}</td>
                      <td>
                        <div className="flex items-center">
                          {cargo.type === "Sea" ? (
                            <Ship className="h-4 w-4 mr-2 text-primary" />
                          ) : (
                            <Plane className="h-4 w-4 mr-2 text-secondary" />
                          )}
                          {cargo.type}
                        </div>
                      </td>
                      <td className="font-mono text-xs">{cargo.container}</td>
                      <td>{cargo.client}</td>
                      <td className="text-sm">{cargo.route}</td>
                      <td>{cargo.eta}</td>
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

        {/* Recent Client Activity */}
        <div>
          <div className="logistics-card">
            <div className="p-6 border-b border-border">
              <h3 className="text-lg font-semibold">Recent Client Activity</h3>
            </div>
            <div className="p-6 space-y-4">
              {recentClients.map((client, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{client.name}</p>
                    <p className="text-sm text-muted-foreground">{client.activity}</p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs text-muted-foreground">{client.time}</p>
                      <StatusBadge status={client.status} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="logistics-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Sea Cargo</p>
              <p className="text-xl font-semibold">14 containers</p>
            </div>
            <Ship className="h-8 w-8 text-primary" />
          </div>
          <div className="mt-3 flex items-center text-sm text-success">
            <TrendingUp className="h-4 w-4 mr-1" />
            +2 this week
          </div>
        </div>

        <div className="logistics-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Air Cargo</p>
              <p className="text-xl font-semibold">4 shipments</p>
            </div>
            <Plane className="h-8 w-8 text-secondary" />
          </div>
          <div className="mt-3 flex items-center text-sm text-success">
            <TrendingUp className="h-4 w-4 mr-1" />
            +1 this week
          </div>
        </div>

        <div className="logistics-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Open Claims</p>
              <p className="text-xl font-semibold">2 pending</p>
            </div>
            <Package className="h-8 w-8 text-warning" />
          </div>
          <div className="mt-3 text-sm text-muted-foreground">
            Avg. resolution: 3 days
          </div>
        </div>
      </div>
    </div>
  );
}