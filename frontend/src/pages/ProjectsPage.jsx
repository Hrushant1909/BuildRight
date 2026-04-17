import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axios'

export default function ProjectsPage() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const { data } = await api.get('/projects')
        setProjects(data)
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load projects')
      } finally {
        setLoading(false)
      }
    }

    loadProjects()
  }, [])

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-slate-900">Our Projects</h1>
          <p className="mt-2 text-slate-600">Browse our completed project showcase.</p>
        </div>

        {loading ? <p className="text-slate-600">Loading projects...</p> : null}
        {error ? <p className="rounded-xl bg-red-50 px-4 py-3 text-red-600">{error}</p> : null}

        {!loading && !error ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Link
                key={project.id}
                to={`/projects/${project.id}`}
                className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="h-52 w-full object-cover transition duration-300 group-hover:scale-105"
                />
                <div className="space-y-2 p-5">
                  <h2 className="text-xl font-semibold text-slate-900">{project.title}</h2>
                  <p className="text-sm text-slate-600">{project.location}</p>
                  <p className="text-sm font-medium text-indigo-600">{project.date}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}
