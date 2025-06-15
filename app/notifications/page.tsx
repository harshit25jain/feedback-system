"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Bell, Mail, MessageSquare, Users, Settings, Check, X, Clock } from "lucide-react"
import { Separator } from "@/components/ui/separator"

const notifications = [
  {
    id: 1,
    type: "feedback",
    title: "New feedback received",
    message: "Customer satisfaction survey completed by John Smith",
    time: "2 minutes ago",
    read: false,
    priority: "high",
  },
  {
    id: 2,
    type: "form",
    title: "Form published successfully",
    message: "Product feedback form is now live and accepting responses",
    time: "1 hour ago",
    read: false,
    priority: "medium",
  },
  {
    id: 3,
    type: "user",
    title: "New user registered",
    message: "Sarah Johnson has joined your organization",
    time: "3 hours ago",
    read: true,
    priority: "low",
  },
  {
    id: 4,
    type: "system",
    title: "Weekly report ready",
    message: "Your weekly analytics report is available for download",
    time: "1 day ago",
    read: true,
    priority: "medium",
  },
  {
    id: 5,
    type: "feedback",
    title: "Feedback requires attention",
    message: "Low rating (2/5) received on support experience form",
    time: "2 days ago",
    read: true,
    priority: "high",
  },
]

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "feedback":
      return MessageSquare
    case "form":
      return Bell
    case "user":
      return Users
    case "system":
      return Settings
    default:
      return Bell
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
    case "medium":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
    case "low":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
  }
}

export default function NotificationsPage() {
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    feedbackAlerts: true,
    formUpdates: true,
    userActivity: false,
    weeklyReports: true,
    instantAlerts: true,
  })

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Notifications</h1>
            <p className="text-muted-foreground">
              Manage your notifications and preferences
              {unreadCount > 0 && (
                <Badge className="ml-2" variant="destructive">
                  {unreadCount} unread
                </Badge>
              )}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Check className="mr-2 h-4 w-4" />
              Mark All Read
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Notifications List */}
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Notifications</CardTitle>
                <CardDescription>Stay updated with the latest activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notifications.map((notification) => {
                    const IconComponent = getNotificationIcon(notification.type)
                    return (
                      <div
                        key={notification.id}
                        className={`flex items-start gap-4 p-4 rounded-lg border ${
                          !notification.read ? "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800" : ""
                        }`}
                      >
                        <div
                          className={`p-2 rounded-full ${
                            !notification.read ? "bg-blue-100 dark:bg-blue-900" : "bg-gray-100 dark:bg-gray-800"
                          }`}
                        >
                          <IconComponent className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium">{notification.title}</h4>
                            <Badge className={getPriorityColor(notification.priority)}>{notification.priority}</Badge>
                            {!notification.read && <div className="w-2 h-2 bg-blue-600 rounded-full" />}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {notification.time}
                          </div>
                        </div>
                        <div className="flex gap-1">
                          {!notification.read && (
                            <Button variant="ghost" size="sm">
                              <Check className="h-4 w-4" />
                            </Button>
                          )}
                          <Button variant="ghost" size="sm">
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Notification Settings */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Configure how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Delivery Methods</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <Label>Email Notifications</Label>
                      </div>
                      <Switch
                        checked={notificationSettings.emailNotifications}
                        onCheckedChange={(checked) =>
                          setNotificationSettings((prev) => ({ ...prev, emailNotifications: checked }))
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Bell className="h-4 w-4 text-muted-foreground" />
                        <Label>Push Notifications</Label>
                      </div>
                      <Switch
                        checked={notificationSettings.pushNotifications}
                        onCheckedChange={(checked) =>
                          setNotificationSettings((prev) => ({ ...prev, pushNotifications: checked }))
                        }
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium">Notification Types</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Feedback Alerts</Label>
                      <Switch
                        checked={notificationSettings.feedbackAlerts}
                        onCheckedChange={(checked) =>
                          setNotificationSettings((prev) => ({ ...prev, feedbackAlerts: checked }))
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Form Updates</Label>
                      <Switch
                        checked={notificationSettings.formUpdates}
                        onCheckedChange={(checked) =>
                          setNotificationSettings((prev) => ({ ...prev, formUpdates: checked }))
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>User Activity</Label>
                      <Switch
                        checked={notificationSettings.userActivity}
                        onCheckedChange={(checked) =>
                          setNotificationSettings((prev) => ({ ...prev, userActivity: checked }))
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Weekly Reports</Label>
                      <Switch
                        checked={notificationSettings.weeklyReports}
                        onCheckedChange={(checked) =>
                          setNotificationSettings((prev) => ({ ...prev, weeklyReports: checked }))
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Instant Alerts</Label>
                      <Switch
                        checked={notificationSettings.instantAlerts}
                        onCheckedChange={(checked) =>
                          setNotificationSettings((prev) => ({ ...prev, instantAlerts: checked }))
                        }
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <Button className="w-full">Save Settings</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Unread notifications</span>
                  <Badge variant="destructive">{unreadCount}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">This week</span>
                  <Badge variant="outline">12</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">This month</span>
                  <Badge variant="outline">47</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
