"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { User, Phone, Mail, Calendar, Upload, FileText, ImageIcon, X, Save, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  type: string;
  file: File;
}

export default function NewPatientPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    emergencyContact: "",
    emergencyPhone: "",
    medicalHistory: "",
    allergies: "",
    currentMedications: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const newFile: UploadedFile = {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(2) + " MB",
        type: file.type.includes("image")
          ? "image"
          : file.type.includes("pdf")
          ? "pdf"
          : "document",
        file: file,
      };
      setUploadedFiles((prev) => [...prev, newFile]);
    });

    // Reset the input so a user can re-upload the same file if needed
    event.target.value = "";
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== fileId));
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case "image":
        return <ImageIcon className="h-4 w-4" />;
      case "pdf":
        return <FileText className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // 1) Basic client-side validation
    if (!formData.firstName || !formData.lastName || !formData.phone) {
      toast.error("Champs requis manquants", {
        description: "Veuillez remplir au minimum le prénom, nom et téléphone.",
      });
      setIsLoading(false);
      return;
    }

    // 2) Build the payload exactly as Django expects
    const payload = {
      // Note: use snake_case keys to match your DRF serializer fields
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      date_of_birth: formData.dateOfBirth,
      gender: formData.gender,
      address: formData.address,
      emergency_contact: formData.emergencyContact,
      emergency_phone: formData.emergencyPhone,
      medical_history: formData.medicalHistory,
      allergies: formData.allergies,
      current_medications: formData.currentMedications,
      // If you want to send file metadata, you could include uploadedFiles here
      // but you will need a separate endpoint to actually upload binary files.
    };

    try {
      // 3) POST to your Django backend
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/api/patients/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
          mode: "cors",
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Django API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log("✅ Django response:", data);
      console.log("▶️ n8n workflow data:", data.n8n_workflow_data);

      toast.success("Patient créé avec succès !", {
        description: "Un WhatsApp d’activation sera envoyé au patient. Vérifiez la console pour les détails du workflow n8n.",
      });

      // 4) Redirect after a brief delay
      setTimeout(() => {
        router.push("/dashboard/patients");
      }, 1000);
    } catch (error) {
      console.error("❌ Error creating patient via Django:", error);
      toast.error("Erreur lors de la création !", {
        description:
          error instanceof Error
            ? error.message
            : "Une erreur inattendue s'est produite.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Nouveau patient</h1>
          <p className="text-slate-600 dark:text-slate-400">
            Créez un nouveau profil patient avec ses documents médicaux
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ──────────────────────────────────────────────── */}
          {/* Left Two‐Thirds: Personal & Medical Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="mr-2 h-5 w-5" />
                  Informations personnelles
                </CardTitle>
                <CardDescription>Renseignez les informations de base du patient</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* First + Last Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Prénom *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      placeholder="Prénom du patient"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nom *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      placeholder="Nom du patient"
                      required
                    />
                  </div>
                </div>

                {/* Email + Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="email@exemple.com"
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone *</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="+221 77 123 45 67"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* DOB + Gender */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date de naissance</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Sexe</Label>
                    <Select onValueChange={(value) => handleInputChange("gender", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez le sexe" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Masculin</SelectItem>
                        <SelectItem value="female">Féminin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Address */}
                <div className="space-y-2">
                  <Label htmlFor="address">Adresse</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    placeholder="Adresse complète du patient"
                  />
                </div>

                {/* Emergency Contact + Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="emergencyContact">Contact d'urgence</Label>
                    <Input
                      id="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                      placeholder="Nom du contact d'urgence"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergencyPhone">Téléphone d'urgence</Label>
                    <Input
                      id="emergencyPhone"
                      type="tel"
                      value={formData.emergencyPhone}
                      onChange={(e) => handleInputChange("emergencyPhone", e.target.value)}
                      placeholder="+221 77 123 45 67"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Medical Information Card */}
            <Card>
              <CardHeader>
                <CardTitle>Informations médicales</CardTitle>
                <CardDescription>Antécédents médicaux et informations de santé</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Medical History */}
                <div className="space-y-2">
                  <Label htmlFor="medicalHistory">Antécédents médicaux</Label>
                  <Textarea
                    id="medicalHistory"
                    value={formData.medicalHistory}
                    onChange={(e) => handleInputChange("medicalHistory", e.target.value)}
                    placeholder="Décrivez les antécédents médicaux du patient..."
                    rows={3}
                  />
                </div>

                {/* Allergies */}
                <div className="space-y-2">
                  <Label htmlFor="allergies">Allergies</Label>
                  <Textarea
                    id="allergies"
                    value={formData.allergies}
                    onChange={(e) => handleInputChange("allergies", e.target.value)}
                    placeholder="Listez les allergies connues du patient..."
                    rows={2}
                  />
                </div>

                {/* Current Medications */}
                <div className="space-y-2">
                  <Label htmlFor="currentMedications">Médicaments actuels</Label>
                  <Textarea
                    id="currentMedications"
                    value={formData.currentMedications}
                    onChange={(e) => handleInputChange("currentMedications", e.target.value)}
                    placeholder="Listez les médicaments actuellement pris par le patient..."
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ──────────────────────────────────────────────── */}
          {/* Right One‐Third: Document Upload + Summary */}
          <div className="space-y-6">
            {/* Document Upload Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Upload className="mr-2 h-5 w-5" />
                  Documents médicaux
                </CardTitle>
                <CardDescription>Téléchargez les documents du patient pour indexation automatique</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <div className="space-y-2">
                    <Label htmlFor="file-upload" className="cursor-pointer">
                      <span className="text-sm font-medium text-blue-600 hover:text-blue-500">
                        Cliquez pour télécharger
                      </span>
                      <span className="text-sm text-gray-500"> ou glissez-déposez</span>
                    </Label>
                    <Input
                      id="file-upload"
                      type="file"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <p className="text-xs text-gray-500">PDF, Images, Documents (max. 10MB par fichier)</p>
                  </div>
                </div>

                {uploadedFiles.length > 0 && (
                  <div className="space-y-2">
                    <Label>Fichiers téléchargés ({uploadedFiles.length})</Label>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {uploadedFiles.map((file) => (
                        <div
                          key={file.id}
                          className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="p-1 bg-blue-100 dark:bg-blue-900/20 rounded">
                              {getFileIcon(file.type)}
                            </div>
                            <div>
                              <p className="text-sm font-medium truncate max-w-[150px]">
                                {file.name}
                              </p>
                              <p className="text-xs text-gray-500">{file.size}</p>
                            </div>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFile(file.id)}
                            className="h-8 w-8"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Summary + Submit Card */}
            <Card>
              <CardHeader>
                <CardTitle>Résumé</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Documents :</span>
                    <Badge variant="outline">{uploadedFiles.length} fichier(s)</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Indexation :</span>
                    <Badge variant="secondary">Automatique</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>WhatsApp :</span>
                    <Badge variant="outline">À configurer</Badge>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200 dark:border-gray-700 mt-4">
                  <h4 className="text-sm font-medium mb-2">Action</h4>
                  <Button type="submit" className="w-full gradient-bg text-slate-900 font-semibold hover:opacity-90" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-slate-900 mr-2"></div>
                        Création en cours…
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Créer le patient
                      </>
                    )}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full mt-2"
                    onClick={() => router.back()}
                    disabled={isLoading}
                  >
                    Annuler
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
