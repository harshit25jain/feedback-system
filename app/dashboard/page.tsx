"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BarChart3, MessageSquare, Users, FileText, TrendingUp, Clock, Plus, Eye } from "lucide-react"
import { Progress } from "@/components/ui/progress"

const stats = [
  {
    title: "Total Feedback",
    value: "1,234",
    change: "+12%",
    icon: MessageSquare,
    color: "text-blue-600",
  },
  {
    title: "Active Forms",
    value: "23",
    change: "+3",
    icon: FileText,
    color: "text-green-600",
  },
  {
    title: "Users",
    value: "456",
    change: "+8%",
    icon: Users,
    color: "text-purple-600",
  },
  {
    title: "Response Rate",
    value: "78%",
    change: "+5%",
    icon: TrendingUp,
    color: "text-orange-600",
  },
]

const recentFeedback = [
  {
    id: 1,
    form: "Customer Satisfaction Survey",
    user: "John Smith",
    rating: 4.5,
    status: "new",
    time: "2 minutes ago",
  },
  {
    id: 2,
    form: "Product Feedback",
    user: "Sarah Johnson",
    rating: 3.8,
    status: "in-review",
    time: "15 minutes ago",
  },
  {
    id: 3,
    form: "Website Usability",
    user: "Mike Davis",
    rating: 4.2,
    status: "responded",
    time: "1 hour ago",
  },
  {
    id: 4,
    form: "Support Experience",
    user: "Emily Wilson",
    rating: 4.8,
    status: "new",
    time: "2 hours ago",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "new":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
    case "in-review":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
    case "responded":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
  }
}

export default function DashboardPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's what's happening with your feedback.</p>
          </div>
          <div className="flex gap-2">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Form
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">{stat.change}</span> from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Recent Feedback */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Feedback</CardTitle>
              <CardDescription>Latest submissions from your forms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentFeedback.map((feedback) => (
                  <div key={feedback.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{feedback.form}</h4>
                        <Badge className={getStatusColor(feedback.status)}>{feedback.status.replace("-", " ")}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">by {feedback.user}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center gap-1">
                          <span className="text-sm">Rating:</span>
                          <span className="font-medium">{feedback.rating}/5</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {feedback.time}
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions & Progress */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start">
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Form
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  View Analytics
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Review Feedback
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="mr-2 h-4 w-4" />
                  Manage Users
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Goals</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Feedback Collection</span>
                    <span>234/300</span>
                  </div>
                  <Progress value={78} />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Response Rate</span>
                    <span>78/85%</span>
                  </div>
                  <Progress value={92} />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>User Engagement</span>
                    <span>156/200</span>
                  </div>
                  <Progress value={78} />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
