import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Bell, Users, FileText, Shield, Save } from "lucide-react";

export default function SettingsSection() {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    emergencyAlerts: true,
    maintenanceReminders: true,
    reportFrequency: "weekly",
    autoAssignTechnicians: false,
    requireApproval: true,
  });

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your fleet management preferences have been updated.",
    });
  };

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Notifications Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Preferences
          </CardTitle>
          <CardDescription>
            Configure how you receive alerts and updates
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-notifications">Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive updates via email for all fleet activities
              </p>
            </div>
            <Switch
              id="email-notifications"
              checked={settings.emailNotifications}
              onCheckedChange={(checked) => updateSetting('emailNotifications', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="sms-notifications">SMS Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Get text message alerts for critical issues
              </p>
            </div>
            <Switch
              id="sms-notifications"
              checked={settings.smsNotifications}
              onCheckedChange={(checked) => updateSetting('smsNotifications', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="emergency-alerts">Emergency Alerts</Label>
              <p className="text-sm text-muted-foreground">
                Immediate notifications for vehicle breakdowns
              </p>
            </div>
            <Switch
              id="emergency-alerts"
              checked={settings.emergencyAlerts}
              onCheckedChange={(checked) => updateSetting('emergencyAlerts', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="maintenance-reminders">Maintenance Reminders</Label>
              <p className="text-sm text-muted-foreground">
                Scheduled maintenance and service notifications
              </p>
            </div>
            <Switch
              id="maintenance-reminders"
              checked={settings.maintenanceReminders}
              onCheckedChange={(checked) => updateSetting('maintenanceReminders', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Report Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Report Configuration
          </CardTitle>
          <CardDescription>
            Set how often you receive fleet performance reports
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="report-frequency">Report Frequency</Label>
            <Select value={settings.reportFrequency} onValueChange={(value) => updateSetting('reportFrequency', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Role Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Roles & Permissions
          </CardTitle>
          <CardDescription>
            Manage user roles and access permissions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">Fleet Manager</h4>
                <p className="text-sm text-muted-foreground">Full access to all fleet operations</p>
              </div>
              <Badge variant="secondary">Admin</Badge>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">Supervisor</h4>
                <p className="text-sm text-muted-foreground">Can assign drivers and view reports</p>
              </div>
              <Badge variant="outline">Limited</Badge>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">Technician</h4>
                <p className="text-sm text-muted-foreground">Can update maintenance records</p>
              </div>
              <Badge variant="outline">Maintenance Only</Badge>
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="auto-assign">Auto-assign Technicians</Label>
              <p className="text-sm text-muted-foreground">
                Automatically assign available technicians to new issues
              </p>
            </div>
            <Switch
              id="auto-assign"
              checked={settings.autoAssignTechnicians}
              onCheckedChange={(checked) => updateSetting('autoAssignTechnicians', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="require-approval">Require Approval</Label>
              <p className="text-sm text-muted-foreground">
                Manager approval required for vehicle assignments
              </p>
            </div>
            <Switch
              id="require-approval"
              checked={settings.requireApproval}
              onCheckedChange={(checked) => updateSetting('requireApproval', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="flex items-center gap-2">
          <Save className="h-4 w-4" />
          Save Settings
        </Button>
      </div>
    </div>
  );
}