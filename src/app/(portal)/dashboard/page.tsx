"use client";

import { motion } from "framer-motion";
import {
  Users,
  UserPlus,
  CheckCircle2,
  Clock,
  TrendingUp,
  MapPin,
  Filter
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const stats = [
  { label: "Total Students", value: "1,248", icon: Users, color: "text-blue-500", trend: "+12%" },
  { label: "New Admissions", value: "156", icon: UserPlus, color: "text-green-500", trend: "+5%" },
  { label: "Confirmed", value: "892", icon: CheckCircle2, color: "text-purple-500", trend: "+18%" },
  { label: "Pending", value: "200", icon: Clock, color: "text-orange-500", trend: "-2%" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

export default function DashboardPage() {
  return (
    <div className="space-y-8 h-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-gradient">Latur Branch Overview</h1>
          <p className="text-muted-foreground mt-1 text-sm font-medium uppercase tracking-widest opacity-70">
            Admissions Made Easy • Data Intelligence
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="glass rounded-xl gap-2 hover:bg-white/10">
            <Filter className="h-4 w-4" /> Filter
          </Button>
          <Button className="rounded-xl shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
            Daily Report
          </Button>
        </div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, i) => (
          <motion.div key={i} variants={itemVariants}>
            <Card className="glass-card hover:translate-y-[-4px]">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className={`p-2.5 rounded-2xl bg-white/5 ${stat.color} shadow-inner`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <Badge variant="secondary" className="bg-white/5 text-xs text-green-400 font-bold px-2 py-0.5 rounded-full ring-1 ring-white/10">
                    {stat.trend}
                  </Badge>
                </div>
                <div className="mt-4">
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <h3 className="text-3xl font-bold mt-1 tracking-tight">{stat.value}</h3>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2"
        >
          <Card className="glass min-h-[400px]">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold">Recent Registrations</CardTitle>
                <p className="text-xs text-muted-foreground mt-1">Managed student records across categories</p>
              </div>
              <Button variant="ghost" size="sm" className="hover:bg-white/5 text-primary font-bold">View All</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-6 mt-2">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5 group">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-primary/80 to-chart-2/80 p-[1px]">
                        <div className="h-full w-full rounded-full bg-background flex items-center justify-center font-bold text-xs">
                          SJ
                        </div>
                      </div>
                      <div>
                        <p className="font-bold text-sm">Siddhesh Jadhav</p>
                        <p className="text-xs text-muted-foreground">NEET Score: 642 • Latur Branch</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant="outline" className="border-primary/30 text-primary-foreground bg-primary/20 text-[10px] font-bold">OBC</Badge>
                      <Badge className="bg-green-500/20 text-green-400 border-none text-[10px] font-bold">CONFIRMED</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="glass h-full">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Regional Distribution</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8 pt-4">
              {[
                { state: "Maharashtra", count: 854, score: "85%", color: "bg-blue-500" },
                { state: "Karnataka", count: 231, score: "62%", color: "bg-purple-500" },
                { state: "Kerala", count: 98, score: "45%", color: "bg-green-500" },
                { state: "Uttar Pradesh", count: 65, score: "38%", color: "bg-orange-500" },
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <span className="font-bold">{item.state}</span>
                    </div>
                    <span className="text-muted-foreground text-xs">{item.count} Students</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: item.score }}
                      transition={{ duration: 1, delay: 0.8 }}
                      className={`h-full ${item.color} shadow-[0_0_10px_rgba(var(--primary-rgb),0.3)]`}
                    />
                  </div>
                </div>
              ))}

              <div className="mt-10 p-4 rounded-3xl bg-primary/10 border border-primary/20 animate-float">
                <p className="text-xs font-bold text-primary flex items-center gap-2">
                  <TrendingUp className="h-3 w-3" />
                  Insight for today
                </p>
                <p className="text-[11px] text-muted-foreground mt-2 leading-relaxed">
                  Maharashtra state quota registrations have peaked this week. System performance is optimized for Latur office staff.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
