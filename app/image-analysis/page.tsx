"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Upload, X, Loader2 } from "lucide-react"

type AnalysisResult = {
  filename: string
  size: string
  dimensions: string
  format: string
  dominantColor: string
  message: string
}

export default function ImageAnalysisPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [loading, setLoading] = useState(false)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setResult(null)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleClear = () => {
    setSelectedFile(null)
    setPreview(null)
    setResult(null)
  }

  const handleAnalyze = async () => {
    if (!selectedFile) return

    setLoading(true)
    const formData = new FormData()
    formData.append("image", selectedFile)

    try {
      const res = await fetch("/api/image-analysis", {
        method: "POST",
        body: formData,
      })

      const data = await res.json()
      if (res.ok) {
        setResult(data)
      }
    } catch (error) {
      console.error("Analysis failed:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="border-b border-border bg-muted/30 px-4 py-8">
          <div className="container max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">Image Analysis</h1>
            <p className="text-muted-foreground">Upload images for medical analysis</p>
          </div>
        </div>

        <div className="px-4 py-8">
          <div className="container max-w-4xl mx-auto">
            {!preview ? (
              <div className="border-2 border-dashed border-border rounded-xl p-12 text-center">
                <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Upload an image</h3>
                <p className="text-sm text-muted-foreground mb-4">Supports JPG, PNG, or GIF (max 10MB)</p>
                <label htmlFor="file-upload">
                  <Button asChild>
                    <span className="cursor-pointer">Choose File</span>
                  </Button>
                  <input id="file-upload" type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
                </label>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="border border-border rounded-xl p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-semibold">Selected Image</h3>
                    <Button variant="ghost" size="sm" onClick={handleClear}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                    <img src={preview || "/placeholder.svg"} alt="Preview" className="w-full h-full object-contain" />
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{selectedFile?.name}</p>
                </div>

                {!result && (
                  <Button onClick={handleAnalyze} disabled={loading} className="w-full">
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      "Analyze Image"
                    )}
                  </Button>
                )}

                {result && (
                  <div className="border border-border rounded-xl p-6 space-y-4">
                    <h3 className="font-semibold text-lg">Analysis Results</h3>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <span className="text-sm text-muted-foreground">File Size</span>
                        <p className="font-medium">{result.size}</p>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">Dimensions</span>
                        <p className="font-medium">{result.dimensions}</p>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">Format</span>
                        <p className="font-medium uppercase">{result.format}</p>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">Dominant Color</span>
                        <div className="flex items-center gap-2 mt-1">
                          <div
                            className="w-6 h-6 rounded border border-border"
                            style={{ backgroundColor: result.dominantColor }}
                          />
                          <p className="font-medium">{result.dominantColor}</p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border">
                      <p className="text-sm leading-relaxed">{result.message}</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
