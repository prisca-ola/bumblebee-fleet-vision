import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Package, 
  Search, 
  AlertTriangle, 
  TrendingUp, 
  Sparkles,
  ShoppingCart,
  Building2,
  Clock
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Part {
  id: string;
  name: string;
  category: "Engine" | "Brake" | "Electrical" | "Transmission" | "Suspension" | "Body";
  supplier: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  unitCost: number;
  location: string;
  lastRestocked: string;
  predictedNeed: number; // parts needed in next 30 days
  averageMonthlyUsage: number;
}

const PartsInventory = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");

  // Mock parts inventory data
  const parts: Part[] = [
    {
      id: "PART-001",
      name: "Engine Oil Filter",
      category: "Engine",
      supplier: "AutoZone Nigeria",
      currentStock: 45,
      minStock: 30,
      maxStock: 100,
      unitCost: 2500,
      location: "Lagos Warehouse - A12",
      lastRestocked: "2024-01-05",
      predictedNeed: 38,
      averageMonthlyUsage: 42
    },
    {
      id: "PART-002",
      name: "Brake Pads (Front)",
      category: "Brake",
      supplier: "Bosch Parts Ltd",
      currentStock: 12,
      minStock: 20,
      maxStock: 80,
      unitCost: 15000,
      location: "Lagos Warehouse - B05",
      lastRestocked: "2023-12-28",
      predictedNeed: 25,
      averageMonthlyUsage: 28
    },
    {
      id: "PART-003",
      name: "Alternator Belt",
      category: "Electrical",
      supplier: "Continental Auto",
      currentStock: 8,
      minStock: 15,
      maxStock: 50,
      unitCost: 3500,
      location: "Abuja Depot - C18",
      lastRestocked: "2024-01-02",
      predictedNeed: 18,
      averageMonthlyUsage: 15
    },
    {
      id: "PART-004",
      name: "Transmission Fluid (5L)",
      category: "Transmission",
      supplier: "Shell Lubricants",
      currentStock: 67,
      minStock: 40,
      maxStock: 120,
      unitCost: 8500,
      location: "Lagos Warehouse - A08",
      lastRestocked: "2024-01-10",
      predictedNeed: 32,
      averageMonthlyUsage: 35
    },
    {
      id: "PART-005",
      name: "Shock Absorbers",
      category: "Suspension",
      supplier: "KYB Nigeria",
      currentStock: 5,
      minStock: 12,
      maxStock: 40,
      unitCost: 22000,
      location: "Port Harcourt - D03",
      lastRestocked: "2023-12-20",
      predictedNeed: 15,
      averageMonthlyUsage: 12
    },
    {
      id: "PART-006",
      name: "Headlight Assembly",
      category: "Electrical",
      supplier: "Philips Automotive",
      currentStock: 18,
      minStock: 10,
      maxStock: 35,
      unitCost: 12500,
      location: "Lagos Warehouse - B12",
      lastRestocked: "2024-01-08",
      predictedNeed: 8,
      averageMonthlyUsage: 9
    },
    {
      id: "PART-007",
      name: "Air Filter",
      category: "Engine",
      supplier: "Mann Filter Nigeria",
      currentStock: 3,
      minStock: 25,
      maxStock: 80,
      unitCost: 3200,
      location: "Abuja Depot - A15",
      lastRestocked: "2023-12-15",
      predictedNeed: 40,
      averageMonthlyUsage: 38
    }
  ];

  const filteredParts = parts.filter(part => {
    const matchesSearch = part.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         part.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || part.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const getStockStatus = (current: number, min: number, predicted: number) => {
    if (current < min) return { status: "Critical", color: "bg-critical/10 text-critical border-critical/20" };
    if (current < predicted) return { status: "Low", color: "bg-warning/10 text-warning border-warning/20" };
    return { status: "Good", color: "bg-success/10 text-success border-success/20" };
  };

  const calculateStockPercentage = (current: number, max: number) => {
    return Math.min((current / max) * 100, 100);
  };

  const calculateDaysUntilReorder = (current: number, usage: number) => {
    if (usage === 0) return 999;
    return Math.floor(current / (usage / 30));
  };

  const criticalParts = parts.filter(p => p.currentStock < p.minStock).length;
  const lowStockParts = parts.filter(p => p.currentStock < p.predictedNeed && p.currentStock >= p.minStock).length;
  const totalValue = parts.reduce((sum, p) => sum + (p.currentStock * p.unitCost), 0);

  const handleOrderPart = (partId: string, partName: string) => {
    toast({
      title: "Order Initiated",
      description: `Placing order for ${partName}...`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header and Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Parts Inventory Management</h2>
          <p className="text-muted-foreground">Track stock levels and predict parts needs</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-critical/20 bg-critical/5">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-critical/10 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-critical" />
              </div>
              <div>
                <p className="text-2xl font-bold text-critical">{criticalParts}</p>
                <p className="text-sm text-muted-foreground">Critical Stock</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-warning/20 bg-warning/5">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-warning/10 rounded-lg">
                <Package className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-warning">{lowStockParts}</p>
                <p className="text-sm text-muted-foreground">Low Stock</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{parts.length}</p>
                <p className="text-sm text-muted-foreground">Total Parts</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-success/10 rounded-lg">
                <TrendingUp className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">₦{(totalValue / 1000000).toFixed(1)}M</p>
                <p className="text-sm text-muted-foreground">Inventory Value</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Predictive Insights */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <CardTitle>AI-Powered Parts Predictions</CardTitle>
          </div>
          <CardDescription>
            Based on maintenance history and usage patterns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-background rounded-lg border border-border">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold">Brake Pads (Front)</p>
                  <p className="text-xs text-muted-foreground mt-1">Predicted shortage in 12 days</p>
                  <p className="text-xs text-warning mt-2">Order 25 units immediately</p>
                </div>
                <Badge variant="outline" className="bg-critical/10 text-critical border-critical/20">
                  Urgent
                </Badge>
              </div>
              <Button size="sm" className="w-full mt-3" onClick={() => handleOrderPart("PART-002", "Brake Pads")}>
                <ShoppingCart className="h-3 w-3 mr-1" />
                Order Now
              </Button>
            </div>

            <div className="p-4 bg-background rounded-lg border border-border">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold">Air Filter</p>
                  <p className="text-xs text-muted-foreground mt-1">High demand expected</p>
                  <p className="text-xs text-warning mt-2">Restock 40 units soon</p>
                </div>
                <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
                  High Priority
                </Badge>
              </div>
              <Button size="sm" className="w-full mt-3" onClick={() => handleOrderPart("PART-007", "Air Filter")}>
                <ShoppingCart className="h-3 w-3 mr-1" />
                Order Now
              </Button>
            </div>

            <div className="p-4 bg-background rounded-lg border border-border">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold">Shock Absorbers</p>
                  <p className="text-xs text-muted-foreground mt-1">Usage increasing 20%</p>
                  <p className="text-xs text-primary mt-2">Consider bulk order</p>
                </div>
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                  Medium
                </Badge>
              </div>
              <Button size="sm" variant="outline" className="w-full mt-3" onClick={() => handleOrderPart("PART-005", "Shock Absorbers")}>
                <ShoppingCart className="h-3 w-3 mr-1" />
                Order Now
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters and Inventory Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div>
              <CardTitle>Parts Inventory</CardTitle>
              <CardDescription>Monitor stock levels and supplier information</CardDescription>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-initial">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search parts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 w-full sm:w-[200px]"
                />
              </div>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Engine">Engine</SelectItem>
                  <SelectItem value="Brake">Brake</SelectItem>
                  <SelectItem value="Electrical">Electrical</SelectItem>
                  <SelectItem value="Transmission">Transmission</SelectItem>
                  <SelectItem value="Suspension">Suspension</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Part Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Current Stock</TableHead>
                  <TableHead>Stock Level</TableHead>
                  <TableHead>Predicted Need</TableHead>
                  <TableHead>Days to Reorder</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredParts.map((part) => {
                  const stockStatus = getStockStatus(part.currentStock, part.minStock, part.predictedNeed);
                  const daysToReorder = calculateDaysUntilReorder(part.currentStock, part.averageMonthlyUsage);
                  
                  return (
                    <TableRow key={part.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{part.name}</p>
                          <p className="text-xs text-muted-foreground">{part.id}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{part.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p>{part.supplier}</p>
                          <p className="text-xs text-muted-foreground">{part.location}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p className="font-bold">{part.currentStock}</p>
                          <p className="text-xs text-muted-foreground">Min: {part.minStock}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1 w-24">
                          <Progress 
                            value={calculateStockPercentage(part.currentStock, part.maxStock)} 
                            className="h-2"
                          />
                          <p className="text-xs text-muted-foreground">
                            {Math.round(calculateStockPercentage(part.currentStock, part.maxStock))}%
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p className="font-medium">{part.predictedNeed} units</p>
                          <p className="text-xs text-muted-foreground">next 30 days</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className={`text-sm font-medium ${
                            daysToReorder < 7 ? 'text-critical' : 
                            daysToReorder < 14 ? 'text-warning' : 
                            'text-success'
                          }`}>
                            {daysToReorder > 90 ? '90+' : daysToReorder} days
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={stockStatus.color}>
                          {stockStatus.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleOrderPart(part.id, part.name)}
                          disabled={stockStatus.status === "Good"}
                        >
                          <ShoppingCart className="h-3 w-3 mr-1" />
                          Order
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PartsInventory;