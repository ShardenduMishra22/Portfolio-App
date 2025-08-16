'use client'

import Link from 'next/link'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Project } from '@/data/types.data'
import { HeroParallax } from '../ui/hero-parallax'
import { useState, useMemo, useEffect } from 'react'
import { Star, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { ProjectFocusCards } from '../ui/focus-cards-projects'

export interface ProjectsSectionProps {
  projects: Project[]
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const [windowWidth, setWindowWidth] = useState(0)

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    handleResize()

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const heroParallaxProjects = useMemo(() => {
    return projects.slice(0, 15).map((project) => ({
      inline: project.inline,
      project_name: project.project_name,
      small_description: project.small_description,
      skills: project.skills,
      project_live_link: project.project_live_link,
      project_repository: project.project_repository,
    }))
  }, [projects])

  const getProjectsPerPage = () => {
    if (windowWidth < 640) return 1 // Mobile: 1 project
    if (windowWidth < 1024) return 2 // Tablet: 2 projects
    return 4 // Desktop: 4 projects
  }

  const projectsPerPage = getProjectsPerPage()
  const totalPages = Math.ceil(projects.length / projectsPerPage)

  const { currentPageProjects, startIndex, endIndex } = useMemo(() => {
    const startIndex = currentPage * projectsPerPage
    const endIndex = Math.min(startIndex + projectsPerPage, projects.length)
    const currentPageProjects = projects.slice(startIndex, endIndex)

    return { currentPageProjects, startIndex, endIndex }
  }, [projects, currentPage, projectsPerPage])

  // Reset to first page when screen size changes
  useEffect(() => {
    setCurrentPage(0)
  }, [projectsPerPage])

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1)
    }
  }

  // Smart pagination for mobile
  const getVisiblePageNumbers = () => {
    if (windowWidth < 640) {
      // Mobile: Show current and adjacent pages only
      const pages = []
      if (currentPage > 0) pages.push(currentPage - 1)
      pages.push(currentPage)
      if (currentPage < totalPages - 1) pages.push(currentPage + 1)
      return pages
    }

    // Desktop: Show all pages if reasonable, otherwise use ellipsis
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i)
    }

    const delta = 1
    const range = []
    const rangeWithDots = []

    for (
      let i = Math.max(1, currentPage - delta);
      i <= Math.min(totalPages - 2, currentPage + delta);
      i++
    ) {
      range.push(i)
    }

    if (currentPage - delta > 1) {
      rangeWithDots.push(0, '...')
    } else {
      rangeWithDots.push(0)
    }

    rangeWithDots.push(...range)

    if (currentPage + delta < totalPages - 2) {
      rangeWithDots.push('...', totalPages - 1)
    } else {
      if (totalPages > 1) rangeWithDots.push(totalPages - 1)
    }

    return rangeWithDots
  }

  return (
    <>
      {/* Hero Parallax Section with Full Project Cards */}
      <section className="relative">
        <HeroParallax projects={heroParallaxProjects} />
      </section>

      {/* Detailed Projects Section */}
      <section className="py-8 sm:py-12 lg:py-16 relative overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="flex justify-center mb-4 sm:mb-6">
              <Badge
                variant="outline"
                className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium border-primary/30 bg-primary/5 hover:bg-primary/10 transition-colors shadow-lg backdrop-blur-sm"
              >
                <Star className="mr-1.5 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                All Projects
              </Badge>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-5xl xl:text-6xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-foreground via-primary to-secondary bg-clip-text text-transparent">
                Complete
              </span>{' '}
              <span className="text-foreground">Portfolio</span>
            </h2>

            <div className="mt-3 sm:mt-4 mx-auto w-16 sm:w-24 h-0.5 sm:h-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-full shadow-lg"></div>

            <p className="mt-4 sm:mt-8 text-sm sm:text-lg leading-6 sm:leading-8 text-foreground max-w-xl sm:max-w-2xl mx-auto font-medium px-4 sm:px-0">
              Browse through all projects with detailed information and interactive features
            </p>
          </div>

          {/* Responsive projects grid with Focus Cards */}
          <div className="mx-auto mt-8 sm:mt-16 lg:mt-20 max-w-7xl">
            <ProjectFocusCards
              projects={currentPageProjects}
              startIndex={startIndex}
              windowWidth={windowWidth}
            />

            {/* Rest of your pagination code remains the same */}
            {totalPages > 1 && (
              <div className="mt-8 sm:mt-16 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
                {/* Navigation buttons */}
                <div className="flex items-center gap-2 sm:gap-4 order-2 sm:order-none">
                  <Button
                    onClick={prevPage}
                    variant="outline"
                    size={windowWidth < 640 ? 'sm' : 'lg'}
                    className="group bg-card hover:bg-primary/5 border-primary/20 hover:border-primary/30 transition-all duration-300 touch-manipulation"
                    disabled={currentPage === 0}
                  >
                    <ChevronLeft className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:-translate-x-1" />
                    <span className="text-xs sm:text-sm">
                      {windowWidth < 640 ? 'Prev' : 'Previous'}
                    </span>
                  </Button>

                  <Button
                    onClick={nextPage}
                    variant="outline"
                    size={windowWidth < 640 ? 'sm' : 'lg'}
                    className="group bg-card hover:bg-primary/5 border-primary/20 hover:border-primary/30 transition-all duration-300 touch-manipulation"
                    disabled={currentPage === totalPages - 1}
                  >
                    <span className="text-xs sm:text-sm">Next</span>
                    <ChevronRight className="ml-1 sm:ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>

                {/* Page numbers */}
                <div className="flex items-center gap-1 sm:gap-2 lg:gap-3 order-1 sm:order-none">
                  {getVisiblePageNumbers().map((pageNum, index) => {
                    if (pageNum === '...') {
                      return (
                        <span
                          key={`dots-${index}`}
                          className="px-2 py-1 text-xs sm:text-sm text-foreground/50"
                        >
                          ...
                        </span>
                      )
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum as number)}
                        className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full font-semibold transition-all duration-300 text-xs sm:text-sm touch-manipulation ${
                          currentPage === pageNum
                            ? 'bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-lg scale-105'
                            : 'bg-card hover:bg-primary/5 border border-primary/20 hover:border-primary/30 text-foreground/70 hover:text-primary hover:scale-105'
                        }`}
                        aria-label={`Go to page ${(pageNum as number) + 1}`}
                        aria-current={currentPage === pageNum ? 'page' : undefined}
                      >
                        {(pageNum as number) + 1}
                      </button>
                    )
                  })}
                </div>

                {/* Mobile page indicator */}
                <div className="text-xs text-foreground/70 sm:hidden order-3">
                  Page {currentPage + 1} of {totalPages}
                </div>
              </div>
            )}

            {/* Summary info */}
            <div className="mt-8 sm:mt-12 text-center">
              <p className="text-foreground/60 text-xs sm:text-sm">
                Showing {currentPageProjects.length} of {projects.length} projects
              </p>
            </div>

            {/* More projects CTA - responsive */}
            {projects.length > projectsPerPage && (
              <div className="mt-12 sm:mt-20 text-center px-4 sm:px-0">
                <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-6 p-4 sm:p-6 bg-gradient-to-r from-card via-card/90 to-card rounded-xl sm:rounded-2xl border border-border/50 backdrop-blur-sm shadow-lg max-w-sm sm:max-w-none mx-auto">
                  <div className="text-center sm:text-left">
                    <h3 className="text-base sm:text-lg font-semibold text-foreground">
                      More Projects
                    </h3>
                    <p className="text-xs sm:text-sm text-foreground/70 mt-1">
                      Explore {projects.length - projectsPerPage} additional projects
                    </p>
                  </div>
                  <Link href="/projects">
                    <Button
                      variant="outline"
                      size={windowWidth < 640 ? 'sm' : 'lg'}
                      className="group bg-gradient-to-r from-primary/10 to-secondary/10 hover:from-primary/20 hover:to-secondary/20 border-primary/30 hover:border-primary/50 transition-all duration-300 touch-manipulation"
                    >
                      <span className="text-xs sm:text-sm">View All</span>
                      <ArrowRight className="ml-1.5 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
