import { useState } from "react";
import { Ship, Plane, AlertTriangle, Clock, Plus, Search, Filter, Upload } from "lucide-react";
import { MetricCard } from "@/components/ui/metric-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function AirCargo() {
  const [activeTab, setActiveTab] = useState("air-cargos");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Cargo Management</h1>
          <p className="text-muted-foreground">Track and manage all cargo shipments</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4" />
            Import Excel
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4" />
            Quick Create
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-muted">
          <TabsTrigger value="sea-cargos" className="flex items-center gap-2">
            <Ship className="h-4 w-4" />
            Sea Cargos
          </TabsTrigger>
          <TabsTrigger value="air-cargos" className="flex items-center gap-2">
            <Plane className="h-4 w-4" />
            Air Cargos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="air-cargos" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-foreground">Air Cargos</h2>
              <p className="text-muted-foreground">Manage air cargoes attached to your shipping agency</p>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MetricCard
              title="Total Containers"
              value="0"
              icon={Plane}
              className="border-primary/20 bg-primary/5"
            />
            <MetricCard
              title="Demurraged"
              value="0"
              icon={AlertTriangle}
              className="border-destructive/20 bg-destructive/5"
            />
            <MetricCard
              title="In Transit"
              value="0"
              icon={Clock}
              className="border-blue-500/20 bg-blue-500/5"
            />
          </div>

          {/* Air Cargo Management Section */}
          <div className="logistics-card p-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Air Cargo Management</h3>
                <p className="text-muted-foreground">Track and manage all air cargo shipments and their current status</p>
              </div>

              {/* Search and Filters */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search by container ID, route, or dates" 
                    className="pl-10"
                  />
                </div>
                <Select>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filter by status..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                    <SelectItem value="transit">In Transit</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
                <Button size="sm">
                  <Plus className="h-4 w-4" />
                  Add Cargo
                </Button>
              </div>

              {/* Table */}
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <input type="checkbox" className="rounded" />
                      </TableHead>
                      <TableHead>Container ID</TableHead>
                      <TableHead>Loading Date</TableHead>
                      <TableHead>ETA</TableHead>
                      <TableHead>Rates</TableHead>
                      <TableHead>Total CBM</TableHead>
                      <TableHead>Exp. Revenue</TableHead>
                      <TableHead>Rec. Revenue</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Due Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell colSpan={10} className="text-center py-8 text-muted-foreground">
                        No air cargo data available. Start by adding your first cargo shipment.
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="sea-cargos" className="space-y-6">
          <div className="logistics-card p-6">
            <div className="text-center py-8">
              <Ship className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Sea Cargo Management</h3>
              <p className="text-muted-foreground">Sea cargo management will be implemented here</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}