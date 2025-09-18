import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  AlertTriangle, 
  Camera, 
  Mic, 
  Plus,
  Clock,
  User,
  Truck,
  CheckCircle,
  XCircle,
  Settings
} from "lucide-react";

interface Issue {
  id: string;
  vehicleId: string;
  reporter: string;
  type: "Engine" | "Brakes" | "Electrical" | "Tires" | "Other";
  severity: "Low" | "Medium" | "High" | "Critical";
  description: string;
  status: "Open" | "In Progress" | "Resolved" | "Closed";
  reportedAt: string;
  assignedTo?: string;
  workshop?: string;
}

const IssueReporting = () => {
  const [showReportForm, setShowReportForm] = useState(false);
  const [newIssue, setNewIssue] = useState({
    vehicleId: "",
    type: "",
    severity: "",
    description: ""
  });

  // Mock issues data
  const issues: Issue[] = [
    {
      id: "ISS-001",
      vehicleId: "BUS-001",
      reporter: "Adebayo Johnson",
      type: "Engine",
      severity: "High",
      description: "Engine making unusual noise, especially during acceleration",
      status: "In Progress",
      reportedAt: "2024-01-10 14:30",
      assignedTo: "Lagos Auto Repair",
      workshop: "Lagos Auto Repair Shop"
    },
    {
      id: "ISS-002",
      vehicleId: "VAN-003",
      reporter: "Kemi Okafor",
      type: "Brakes",
      severity: "Critical",
      description: "Brake pedal feels spongy, concerned about safety",
      status: "Open",
      reportedAt: "2024-01-11 09:15",
    },
    {
      id: "ISS-003",
      vehicleId: "TRK-007",
      reporter: "Emeka Nwankwo",
      type: "Tires",
      severity: "Medium",
      description: "Front left tire shows uneven wear pattern",
      status: "Resolved",
      reportedAt: "2024-01-08 16:45",
      assignedTo: "Ikoyi Tire Center"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical": return "bg-critical/10 text-critical border-critical/20";
      case "High": return "bg-warning/10 text-warning border-warning/20";
      case "Medium": return "bg-primary/10 text-primary border-primary/20";
      case "Low": return "bg-success/10 text-success border-success/20";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open": return "bg-critical/10 text-critical border-critical/20";
      case "In Progress": return "bg-warning/10 text-warning border-warning/20";
      case "Resolved": return "bg-success/10 text-success border-success/20";
      case "Closed": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const handleSubmitIssue = () => {
    // In real app, this would submit to API
    console.log("Submitting issue:", newIssue);
    setShowReportForm(false);
    setNewIssue({ vehicleId: "", type: "", severity: "", description: "" });
  };

  return (
    <div className="space-y-6">
      {/* Report New Issue Button */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Issue Reporting & Management</h3>
          <p className="text-muted-foreground text-sm">Track and manage vehicle issues reported by drivers</p>
        </div>
        <Button 
          onClick={() => setShowReportForm(!showReportForm)}
          className="bg-gradient-primary hover:opacity-90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Report Issue
        </Button>
      </div>

      {/* Report Issue Form */}
      {showReportForm && (
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-primary" />
              Report New Issue
            </CardTitle>
            <CardDescription>
              Report a vehicle issue for immediate attention and tracking
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select onValueChange={(value) => setNewIssue({...newIssue, vehicleId: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Vehicle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BUS-001">BUS-001</SelectItem>
                  <SelectItem value="VAN-003">VAN-003</SelectItem>
                  <SelectItem value="TRK-007">TRK-007</SelectItem>
                </SelectContent>
              </Select>

              <Select onValueChange={(value) => setNewIssue({...newIssue, type: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Issue Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Engine">Engine</SelectItem>
                  <SelectItem value="Brakes">Brakes</SelectItem>
                  <SelectItem value="Electrical">Electrical</SelectItem>
                  <SelectItem value="Tires">Tires</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>

              <Select onValueChange={(value) => setNewIssue({...newIssue, severity: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Critical">Critical</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Textarea
              placeholder="Describe the issue in detail..."
              value={newIssue.description}
              onChange={(e) => setNewIssue({...newIssue, description: e.target.value})}
              className="min-h-[100px]"
            />

            <div className="flex items-center gap-4">
              <Button variant="outline" className="flex items-center gap-2">
                <Camera className="h-4 w-4" />
                Add Photo
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Mic className="h-4 w-4" />
                Voice Note
              </Button>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowReportForm(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmitIssue} disabled={!newIssue.vehicleId || !newIssue.description}>
                Submit Issue
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Issues List */}
      <div className="space-y-4">
        {issues.map((issue) => (
          <Card key={issue.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-warning" />
                      <span className="font-semibold">{issue.id}</span>
                    </div>
                    <Badge className={getSeverityColor(issue.severity)}>
                      {issue.severity}
                    </Badge>
                    <Badge className={getStatusColor(issue.status)}>
                      {issue.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Truck className="h-3 w-3" />
                      {issue.vehicleId}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {issue.reporter}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {issue.reportedAt}
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Settings className="h-3 w-3 mr-1" />
                  Manage
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3">
              <div>
                <span className="font-medium text-sm">{issue.type} Issue:</span>
                <p className="text-sm text-muted-foreground mt-1">{issue.description}</p>
              </div>
              
              {issue.assignedTo && (
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Assigned to:</span>
                    <span className="ml-2 font-medium">{issue.assignedTo}</span>
                  </div>
                  {issue.status === "Resolved" && (
                    <CheckCircle className="h-4 w-4 text-success" />
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {issues.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <AlertTriangle className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>No issues reported yet.</p>
        </div>
      )}
    </div>
  );
};

export default IssueReporting;