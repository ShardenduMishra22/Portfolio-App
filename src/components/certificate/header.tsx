import { Award } from 'lucide-react'

interface CertificationHeaderProps {
  totalCertifications: number
  totalPages: number
  currentPage: number
}

export default function CertificationHeader({
  totalCertifications,
  totalPages,
  currentPage,
}: CertificationHeaderProps) {
  return (
    <div className="text-center mb-8 space-y-4">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
        <Award className="w-4 h-4 text-primary" />
        <span className="text-sm font-medium text-primary">Professional Credentials</span>
      </div>

      <h1 className="text-4xl md:text-5xl font-heading font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent leading-tight">
        Certifications
      </h1>

      <p className="text-base text-foreground max-w-3xl mx-auto leading-relaxed">
        Verified certifications and achievements across platforms and professional domains
      </p>

      {/* Stats Bar */}
      <div className="flex justify-center gap-6 pt-2">
        <div className="text-center">
          <div className="text-xl font-bold text-primary">{totalCertifications}</div>
          <div className="text-xs text-foreground">Total Certifications</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-secondary">{totalPages}</div>
          <div className="text-xs text-foreground">Pages</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-accent">{currentPage}</div>
          <div className="text-xs text-foreground">Current Page</div>
        </div>
      </div>
    </div>
  )
}
