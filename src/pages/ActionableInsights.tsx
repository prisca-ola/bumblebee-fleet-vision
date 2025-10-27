import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Wrench,
  Clock,
  Fuel,
  AlertTriangle,
  Lightbulb,
  DollarSign
} from "lucide-react";

const ActionableInsights = () => {
  const actionableInsights = [
    {
      id: 1,
      title: "Schedule Preventive Maintenance for BUS-001",
      description: "Oil change due in 5 days. Early servicing can prevent ₦120,000 in potential engine repairs.",
      impact: "Cost Savings",
      savings: "₦120,000",
      icon: Wrench,
      color: "success"
    },
    {
      id: 2,
      title: "Reduce Downtime by 35%",
      description: "4 vehicles need semi-major maintenance. Scheduling them during off-peak hours can reduce revenue loss by ₦280,000/month.",
      impact: "Downtime Reduction",
      savings: "₦280,000/mo",
      icon: Clock,
      color: "warning"
    },
    {
      id: 3,
      title: "Improve Fuel Economy by 8%",
      description: "6 vehicles show declining fuel efficiency. Regular maintenance can save ₦450,000 annually in fuel costs.",
      impact: "Performance",
      savings: "₦450,000/yr",
      icon: Fuel,
      color: "primary"
    },
    {
      id: 4,
      title: "Address Critical Issues Immediately",
      description: "2 critical issues if left unresolved could lead to ₦500,000 in emergency repairs and 72 hours of downtime.",
      impact: "Risk Prevention",
      savings: "₦500,000",
      icon: AlertTriangle,
      color: "critical"
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            <CardTitle className="text-xl font-bold">Actionable Insights & Recommendations</CardTitle>
          </div>
          <CardDescription className="mt-2">
            Smart recommendations to reduce costs, minimize downtime, and improve performance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {actionableInsights.map((insight) => {
            const IconComponent = insight.icon;
            return (
              <Card key={insight.id} className="border-border hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${
                      insight.color === 'success' ? 'bg-success/10' :
                      insight.color === 'warning' ? 'bg-warning/10' :
                      insight.color === 'critical' ? 'bg-critical/10' :
                      'bg-primary/10'
                    }`}>
                      <IconComponent className={`h-6 w-6 ${
                        insight.color === 'success' ? 'text-success' :
                        insight.color === 'warning' ? 'text-warning' :
                        insight.color === 'critical' ? 'text-critical' :
                        'text-primary'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h4 className="font-semibold text-base">{insight.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{insight.description}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                            <DollarSign className="h-3 w-3 mr-1" />
                            {insight.savings}
                          </Badge>
                          <div className="text-xs text-muted-foreground mt-1">{insight.impact}</div>
                        </div>
                      </div>
                      <Button size="sm" className="mt-3">
                        Take Action
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};

export default ActionableInsights;
