export type Department = "sales" | "service" | "parts";
export type AnomalyStatus = "new" | "investigating" | "resolved" | "false_positive";

export interface Anomaly {
  id: string;
  time: string;
  department: Department;
  title: string;
  description: string;
  expected: number;
  actual: number;
  deviation: number;
  impact: "medium" | "high" | "critical";
  value: string;
  status: AnomalyStatus;
  actions: string[];
}

export const anomalies: Anomaly[] = [
  { id:"GH-2047", time:"2 min ago", department:"service", title:"Service appointments down 23%", description:"Appointments are below the weekday forecast across three high-value maintenance categories.", expected:45, actual:35, deviation:-23, impact:"high", value:"$38.4K at risk", status:"new", actions:["Review declined-work follow-up list","Open two Saturday service blocks","Notify service manager"] },
  { id:"GH-2046", time:"8 min ago", department:"parts", title:"Brake pad backorders up 147%", description:"Front brake pad inventory crossed its reorder threshold while demand accelerated.", expected:12, actual:30, deviation:147, impact:"critical", value:"11 ROs affected", status:"new", actions:["Expedite warehouse transfer","Contact alternate supplier","Prioritize booked repair orders"] },
  { id:"GH-2045", time:"17 min ago", department:"sales", title:"Test-drive no-shows reached 31%", description:"No-show rate is more than double the 15% operating threshold.", expected:15, actual:31, deviation:107, impact:"medium", value:"$92K opportunity", status:"investigating", actions:["Trigger 24-hour confirmations","Review advisor follow-up cadence","Test SMS reminder template"] },
  { id:"GH-2044", time:"34 min ago", department:"sales", title:"Taycan gross margin spiked 23%", description:"Average Taycan gross moved well above its 90-day baseline.", expected:15400, actual:18950, deviation:23, impact:"high", value:"+$24.8K gross", status:"new", actions:["Review deal mix","Identify repeatable F&I products","Share with sales team"] },
  { id:"GH-2043", time:"1 hr ago", department:"service", title:"Bay utilization below target", description:"Afternoon utilization is 82% against the 88% operating target.", expected:88, actual:82, deviation:-7, impact:"medium", value:"$18.4K at risk", status:"investigating", actions:["Rebalance technician dispatch","Review appointment spacing","Open waitlist capacity"] },
  { id:"GH-2042", time:"2 hrs ago", department:"parts", title:"Obsolescence risk increased", description:"143 units have moved beyond the 180-day aging threshold.", expected:96, actual:143, deviation:49, impact:"medium", value:"$31.2K inventory", status:"new", actions:["Create aging campaign","Bundle common service parts","Return eligible stock"] },
  { id:"GH-2041", time:"Yesterday", department:"sales", title:"Advisor variance detected", description:"Sarah L. is 15.7% below the team average gross per unit.", expected:16850, actual:14200, deviation:-16, impact:"medium", value:"$15.9K variance", status:"new", actions:["Review product penetration","Schedule coaching","Compare deal mix"] },
];

export const activity = [238,252,247,276,289,310,296,335,349,342,371,392,386,408,431,419,447,469,461,486,512,498,536,559,548,581,604,591,628,672];

export const roleMetrics: Record<string, Array<[string,string,string]>> = {
  "Dealer Principal": [["Connected exports","12","+3 this week"],["Open anomalies","7","−2 today"],["Revenue impact","$284K","identified"],["Report time","2m 34s","↓47%"]],
  "General Manager": [["Operating score","91.4","+4.8 pts"],["Open anomalies","7","−2 today"],["Bay utilization","82%","target 88%"],["Inventory turns","4.2","+0.3"]],
  "Sales Manager": [["Units sold","28","+3 MoM"],["Avg gross","$16.85K","+$1.2K"],["Close rate","27.4%","+2.1 pts"],["No-show rate","31%","needs action"]],
  "Service Manager": [["Repair orders","847","+6.2%"],["Bay utilization","82%","target 88%"],["Technician efficiency","86.2%","+4.2%"],["CSI","4.7","−0.1"]],
  "Parts Manager": [["Fill rate","94%","+1.8 pts"],["Inventory turns","4.2","+0.3"],["Backorders","30","+147%"],["Aging exposure","$31.2K","143 units"]],
  "Advisor": [["Personal gross","$99.4K","+8.7%"],["Units sold","7","+1"],["Product penetration","71%","+5 pts"],["Follow-ups due","12","today"]],
};

export const providers = [
  { name:"CROSS3", detail:"Sales · Service · Parts", status:"Connected", last:"Synced 2 min ago" },
  { name:"Porsche PIWIS", detail:"Diagnostics · Workshop", status:"Connected", last:"Synced 6 min ago" },
  { name:"CDK Global", detail:"DMS connector", status:"Disconnected", last:"Not configured" },
  { name:"Reynolds & Reynolds", detail:"DMS connector", status:"Error", last:"Credential expired" },
];
