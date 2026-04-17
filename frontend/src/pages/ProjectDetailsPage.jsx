import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import api from '../api/axios'

export default function ProjectDetailsPage() {
  const { id } = useParams()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadProject = async () => {
      try {
        const { data } = await api.get(`/projects/${id}`)
        setProject(data)
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load project details')
      } finally {
        setLoading(false)
      }
    }

    loadProject()
  }, [id])

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <Link to="/projects" className="mb-6 inline-block text-sm font-medium text-indigo-600 hover:text-indigo-700">
          ← Back to Projects
        </Link>

        {loading ? <p className="text-slate-600">Loading project details...</p> : null}
        {error ? <p className="rounded-xl bg-red-50 px-4 py-3 text-red-600">{error}</p> : null}

        {project ? (
          <article className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-100">
            <img src={project.imageUrl} alt={project.title} className="h-72 w-full object-cover sm:h-96" />
            <div className="space-y-4 p-6 sm:p-8">
              <h1 className="text-3xl font-bold text-slate-900">{project.title}</h1>
              <div className="flex flex-wrap gap-3 text-sm">
                <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">{project.location}</span>
                <span className="rounded-full bg-indigo-100 px-3 py-1 text-indigo-700">{project.date}</span>
              </div>
              <p className="whitespace-pre-line leading-7 text-slate-700">{project.description}</p>
              <a
                href={project.pdfUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-xl bg-indigo-600 px-5 py-2.5 font-semibold text-white shadow transition hover:bg-indigo-700"
              >
                View / Download PDF
              </a>
            </div>
          </article>
        ) : null}
      </div>
    </div>
  )
}
