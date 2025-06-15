"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Plus, Trash2, GripVertical, Type, List, Star, Calendar, Mail, Phone, FileText, Eye, Save } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

const fieldTypes = [
  { id: "text", label: "Text Input", icon: Type },
  { id: "textarea", label: "Long Text", icon: FileText },
  { id: "email", label: "Email", icon: Mail },
  { id: "phone", label: "Phone", icon: Phone },
  { id: "select", label: "Dropdown", icon: List },
  { id: "radio", label: "Multiple Choice", icon: List },
  { id: "checkbox", label: "Checkboxes", icon: List },
  { id: "rating", label: "Rating Scale", icon: Star },
  { id: "date", label: "Date Picker", icon: Calendar },
]

interface FormField {
  id: string
  type: string
  label: string
  placeholder?: string
  required: boolean
  options?: string[]
}

export default function CreateFormPage() {
  const [formTitle, setFormTitle] = useState("")
  const [formDescription, setFormDescription] = useState("")
  const [fields, setFields] = useState<FormField[]>([])
  const [previewMode, setPreviewMode] = useState(false)

  const addField = (type: string) => {
    const newField: FormField = {
      id: Date.now().toString(),
      type,
      label: `New ${fieldTypes.find((ft) => ft.id === type)?.label || "Field"}`,
      required: false,
      options: type === "select" || type === "radio" || type === "checkbox" ? ["Option 1", "Option 2"] : undefined,
    }
    setFields([...fields, newField])
  }

  const updateField = (id: string, updates: Partial<FormField>) => {
    setFields(fields.map((field) => (field.id === id ? { ...field, ...updates } : field)))
  }

  const removeField = (id: string) => {
    setFields(fields.filter((field) => field.id !== id))
  }

  const renderFieldPreview = (field: FormField) => {
    switch (field.type) {
      case "text":
      case "email":
      case "phone":
        return <Input placeholder={field.placeholder || field.label} />
      case "textarea":
        return <Textarea placeholder={field.placeholder || field.label} />
      case "select":
        return (
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option, index) => (
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )
      case "radio":
        return (
          <div className="space-y-2">
            {field.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input type="radio" name={field.id} id={`${field.id}-${index}`} />
                <label htmlFor={`${field.id}-${index}`}>{option}</label>
              </div>
            ))}
          </div>
        )
      case "checkbox":
        return (
          <div className="space-y-2">
            {field.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input type="checkbox" id={`${field.id}-${index}`} />
                <label htmlFor={`${field.id}-${index}`}>{option}</label>
              </div>
            ))}
          </div>
        )
      case "rating":
        return (
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="h-6 w-6 text-gray-300 hover:text-yellow-400 cursor-pointer" />
            ))}
          </div>
        )
      case "date":
        return <Input type="date" />
      default:
        return <Input placeholder={field.placeholder || field.label} />
    }
  }

  if (previewMode) {
    return (
      <MainLayout>
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Form Preview</h1>
            <Button onClick={() => setPreviewMode(false)}>Exit Preview</Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{formTitle || "Untitled Form"}</CardTitle>
              {formDescription && <CardDescription>{formDescription}</CardDescription>}
            </CardHeader>
            <CardContent className="space-y-6">
              {fields.map((field) => (
                <div key={field.id} className="space-y-2">
                  <Label>
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </Label>
                  {renderFieldPreview(field)}
                </div>
              ))}
              {fields.length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                  No fields added yet. Go back to add some fields to your form.
                </p>
              )}
              <Button className="w-full">Submit Form</Button>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Create Form</h1>
            <p className="text-muted-foreground">Build your feedback collection form</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setPreviewMode(true)}>
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </Button>
            <Button>
              <Save className="mr-2 h-4 w-4" />
              Save Form
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          {/* Form Builder */}
          <div className="lg:col-span-3 space-y-6">
            {/* Form Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Form Details</CardTitle>
                <CardDescription>Basic information about your form</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Form Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter form title"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe what this form is for"
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Form Fields */}
            <Card>
              <CardHeader>
                <CardTitle>Form Fields</CardTitle>
                <CardDescription>Add and configure your form fields</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {fields.map((field, index) => (
                    <div key={field.id} className="border rounded-lg p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                          <Badge variant="outline">{fieldTypes.find((ft) => ft.id === field.type)?.label}</Badge>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => removeField(field.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label>Field Label</Label>
                          <Input
                            value={field.label}
                            onChange={(e) => updateField(field.id, { label: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Placeholder</Label>
                          <Input
                            value={field.placeholder || ""}
                            onChange={(e) => updateField(field.id, { placeholder: e.target.value })}
                          />
                        </div>
                      </div>

                      {(field.type === "select" || field.type === "radio" || field.type === "checkbox") && (
                        <div className="space-y-2">
                          <Label>Options</Label>
                          <div className="space-y-2">
                            {field.options?.map((option, optionIndex) => (
                              <div key={optionIndex} className="flex gap-2">
                                <Input
                                  value={option}
                                  onChange={(e) => {
                                    const newOptions = [...(field.options || [])]
                                    newOptions[optionIndex] = e.target.value
                                    updateField(field.id, { options: newOptions })
                                  }}
                                />
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    const newOptions = field.options?.filter((_, i) => i !== optionIndex)
                                    updateField(field.id, { options: newOptions })
                                  }}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                const newOptions = [
                                  ...(field.options || []),
                                  `Option ${(field.options?.length || 0) + 1}`,
                                ]
                                updateField(field.id, { options: newOptions })
                              }}
                            >
                              <Plus className="mr-2 h-4 w-4" />
                              Add Option
                            </Button>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={field.required}
                          onCheckedChange={(checked) => updateField(field.id, { required: checked })}
                        />
                        <Label>Required field</Label>
                      </div>
                    </div>
                  ))}

                  {fields.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      No fields added yet. Use the field types panel to add fields to your form.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Field Types Panel */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Field Types</CardTitle>
                <CardDescription>Drag or click to add fields</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  {fieldTypes.map((fieldType) => (
                    <Button
                      key={fieldType.id}
                      variant="outline"
                      className="justify-start h-auto p-3"
                      onClick={() => addField(fieldType.id)}
                    >
                      <fieldType.icon className="mr-2 h-4 w-4" />
                      <div className="text-left">
                        <div className="font-medium">{fieldType.label}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Form Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Allow multiple submissions</Label>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Require authentication</Label>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Send email notifications</Label>
                  <Switch />
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label>Submission limit</Label>
                  <Input type="number" placeholder="No limit" />
                </div>
                <div className="space-y-2">
                  <Label>Close date</Label>
                  <Input type="date" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
