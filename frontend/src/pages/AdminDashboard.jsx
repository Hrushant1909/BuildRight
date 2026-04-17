import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FolderPlus, List, LogOut, Trash2, LayoutDashboard, Users, FileText, CheckCircle, Clock } from 'lucide-react'
import api from '../api/axios'

const initialForm = {
  title: '',
  description: '',
  location: '',
  date: '',
  image: null,
  pdf: null,
}

// Mock Inquiries
const MOCK_INQUIRIES = [
  { id: 1, name: 'John Doe', email: 'john@example.com', type: 'Residential', budget: '$500k - $1M', status: 'Pending' },
  { id: 2, name: 'Sarah Smith', email: 'sarah@example.com', type: 'Commercial', budget: '$2M+', status: 'Contacted' },
  { id: 3, name: 'Mike Johnson', email: 'mike@example.com', type: 'Renovation', budget: '$100k - $250k', status: 'Pending' },
]

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('dashboard') // Default to dashboard
  const [form, setForm] = useState(initialForm)
  const [imagePreview, setImagePreview] = useState(null)
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')
  const [projects, setProjects] = useState([])
  const [loadingProjects, setLoadingProjects] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [deletingId, setDeletingId] = useState(null)

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    navigate('/login', { replace: true })
  }

  const validateForm = () => {
    const nextErrors = {}
    if (!form.title.trim()) nextErrors.title = 'Title is required'
    if (form.description.trim().length < 10) nextErrors.description = 'Description must be at least 10 characters'
    if (!form.location.trim()) nextErrors.location = 'Location is required'
    if (!form.date.trim()) nextErrors.date = 'Date or year is required'
    if (!form.image) nextErrors.image = 'Image file is required'
    if (!form.pdf) nextErrors.pdf = 'PDF file is required'
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const fetchProjects = async () => {
    setLoadingProjects(true)
    try {
      const { data } = await api.get('/projects')
      setProjects(data)
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to fetch projects')
    } finally {
      setLoadingProjects(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const handleFileChange = (e, field) => {
    const file = e.target.files[0]
    setForm(prev => ({ ...prev, [field]: file }))
    
    // Create preview for image
    if (field === 'image' && file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    } else if (field === 'image') {
      setImagePreview(null)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setMessage('')
    if (!validateForm()) return

    setSubmitting(true)
    try {
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('description', form.description);
      formData.append('location', form.location);
      formData.append('date', form.date);
      formData.append('image', form.image);
      formData.append('pdf', form.pdf);

      await api.post('/projects', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      
      setMessage('Project added successfully')
      setForm(initialForm)
      setImagePreview(null)
      setErrors({})
      
      // Reset file inputs visually
      document.getElementById('image').value = '';
      document.getElementById('pdf').value = '';

      await fetchProjects()
      setActiveTab('manage-projects')
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to add project')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project?')) return
    setDeletingId(id)
    setMessage('')
    try {
      await api.delete(`/projects/${id}`)
      setProjects((prev) => prev.filter((project) => project.id !== id))
      setMessage('Project deleted successfully')
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to delete project')
    } finally {
      setDeletingId(null)
    }
  }

  const renderInput = (name, label, type = 'text') => (
    <div>
      <label className="mb-1 block text-sm font-medium text-slate-700">{label}</label>
      <input
        type={type}
        value={form[name]}
        onChange={(event) => setForm((prev) => ({ ...prev, [name]: event.target.value }))}
        className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-slate-800 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
      />
      {errors[name] ? <p className="mt-1 text-sm text-red-600">{errors[name]}</p> : null}
    </div>
  )

  const getFullImageUrl = (url) => {
    if (!url) return '';
    // If running dev server on 3000, but springboot uploads are on 8080 usually.
    // Based on how API is set up, typically we prepend the backend URL if the URL is relative.
    if (url.startsWith('http')) return url;
    return `http://localhost:8080${url}`;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex-shrink-0 hidden md:flex md:flex-col fixed h-full z-10 transition-all duration-300">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <LayoutDashboard size={24} className="text-indigo-400" />
            Admin Panel
          </h1>
        </div>
        <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left font-medium transition-all ${activeTab === 'dashboard' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <LayoutDashboard size={18} /> Dashboard Overview
          </button>
          <button
            onClick={() => setActiveTab('add-project')}
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left font-medium transition-all ${activeTab === 'add-project' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <FolderPlus size={18} /> Add Project
          </button>
          <button
            onClick={() => setActiveTab('manage-projects')}
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left font-medium transition-all ${activeTab === 'manage-projects' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <List size={18} /> Manage Projects
          </button>
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left font-medium transition-all ${activeTab === 'inquiries' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <Users size={18} /> Inquiries
          </button>
        </nav>
        <div className="p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-slate-400 font-medium transition hover:bg-slate-800 hover:text-white"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 bg-slate-50 min-h-screen">
        <header className="bg-white border-b border-slate-200 px-8 py-5 flex items-center justify-between sticky top-0 z-10 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 capitalize">
            {activeTab.replace('-', ' ')}
          </h2>
          <div className="flex flex-col items-end">
            <span className="text-sm font-medium text-slate-600">Admin User</span>
            <span className="text-xs text-green-500 flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-green-500"></span> Online</span>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto">
          {message ? (
            <div className="mb-6 rounded-xl border border-indigo-100 bg-indigo-50/50 backdrop-blur-sm px-4 py-4 text-sm text-indigo-700 flex items-center gap-2 shadow-sm animate-in fade-in slide-in-from-top-2">
              <CheckCircle size={18} /> {message}
            </div>
          ) : null}

          {/* DASHBOARD OVERVIEW TAB */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 transition-transform hover:-translate-y-1 hover:shadow-md">
                  <div className="p-4 bg-blue-50 text-blue-600 rounded-xl">
                    <FolderPlus size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500">Total Projects</p>
                    <p className="text-3xl font-bold text-slate-900">{projects.length}</p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 transition-transform hover:-translate-y-1 hover:shadow-md">
                  <div className="p-4 bg-indigo-50 text-indigo-600 rounded-xl">
                    <Users size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500">Total Inquiries</p>
                    <p className="text-3xl font-bold text-slate-900">{MOCK_INQUIRIES.length}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Projects */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                  <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      <FolderPlus size={18} className="text-indigo-500" /> Recent Projects
                    </h3>
                    <button onClick={() => setActiveTab('manage-projects')} className="text-sm text-indigo-600 font-medium hover:text-indigo-700">View All</button>
                  </div>
                  <div className="p-0">
                    {loadingProjects ? (
                      <p className="p-6 text-slate-500 text-center">Loading...</p>
                    ) : projects.length === 0 ? (
                      <p className="p-6 text-slate-500 text-center">No projects available.</p>
                    ) : (
                      <ul className="divide-y divide-slate-100">
                        {projects.slice(0, 4).map(project => (
                          <li key={project.id} className="p-4 hover:bg-slate-50 flex items-center gap-4 transition-colors">
                            <img src={getFullImageUrl(project.imageUrl)} alt={project.title} className="w-16 h-16 rounded-lg object-cover border border-slate-200" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-slate-900 truncate">{project.title}</p>
                              <p className="text-xs text-slate-500 truncate flex items-center gap-1 mt-1">
                                <Clock size={12} /> {project.date} - {project.location}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                {/* Recent Inquiries */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                  <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      <Users size={18} className="text-blue-500" /> Recent Inquiries
                    </h3>
                    <button onClick={() => setActiveTab('inquiries')} className="text-sm text-indigo-600 font-medium hover:text-indigo-700">View All</button>
                  </div>
                  <div className="p-0">
                    <ul className="divide-y divide-slate-100">
                      {MOCK_INQUIRIES.slice(0, 4).map(inq => (
                        <li key={inq.id} className="p-5 hover:bg-slate-50 flex items-center justify-between transition-colors">
                          <div>
                            <p className="text-sm font-semibold text-slate-900">{inq.name}</p>
                            <p className="text-xs text-slate-500 mt-1">{inq.type} • {inq.budget}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${inq.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                            {inq.status}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ADD PROJECT TAB */}
          {activeTab === 'add-project' && (
            <div className="animate-in fade-in duration-500 max-w-3xl">
              <section className="rounded-2xl bg-white p-8 shadow-sm border border-slate-100">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {renderInput('title', 'Project Title')}
                  
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">Description</label>
                    <textarea
                      rows={4}
                      value={form.description}
                      onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 placeholder-slate-400"
                      placeholder="Enter detailed project description..."
                    />
                    {errors.description ? <p className="mt-1 text-sm text-red-600">{errors.description}</p> : null}
                  </div>
                  
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {renderInput('location', 'Location')}
                    {renderInput('date', 'Completion Date / Year')}
                  </div>
                  
                  <div className="space-y-6 pt-4 border-t border-slate-100 mt-6">
                    <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Project Media</h3>
                    
                    {/* Image Upload */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">Upload Cover Image</label>
                        <div className="relative border-2 border-dashed border-slate-300 rounded-xl p-4 text-center hover:bg-slate-50 transition-colors cursor-pointer">
                          <input
                            type="file"
                            id="image"
                            accept="image/*"
                            onChange={(e) => handleFileChange(e, 'image')}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                          <div className="flex flex-col items-center justify-center space-y-2 pointer-events-none">
                            <FolderPlus size={24} className="text-slate-400" />
                            <span className="text-sm font-medium text-slate-600">Click or drag image to upload</span>
                            <span className="text-xs text-slate-500">PNG, JPG, WEBP up to 5MB</span>
                          </div>
                        </div>
                        {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
                      </div>
                      
                      {/* Image Preview */}
                      <div className="h-32 w-full rounded-xl border border-slate-200 bg-slate-50 overflow-hidden flex items-center justify-center">
                        {imagePreview ? (
                          <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-xs text-slate-400 font-medium tracking-wide text-center px-4">Image preview will appear here</span>
                        )}
                      </div>
                    </div>

                    {/* PDF Upload */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-700">Upload Project PDF Details (Optional but recommended)</label>
                      <div className="relative border-2 border-dashed border-slate-300 rounded-xl p-4 text-center hover:bg-slate-50 transition-colors cursor-pointer">
                        <input
                          type="file"
                          id="pdf"
                          accept=".pdf"
                          onChange={(e) => handleFileChange(e, 'pdf')}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                         <div className="flex flex-col items-center justify-center space-y-2 pointer-events-none">
                            <FileText size={24} className="text-slate-400" />
                            <span className="text-sm font-medium text-slate-600">
                              {form.pdf ? form.pdf.name : 'Click or drag PDF to upload'}
                            </span>
                            <span className="text-xs text-slate-500">PDF document only</span>
                          </div>
                      </div>
                      {errors.pdf && <p className="mt-1 text-sm text-red-600">{errors.pdf}</p>}
                    </div>

                  </div>

                  <div className="pt-6">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full sm:w-auto rounded-xl bg-indigo-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-700 hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0 disabled:cursor-not-allowed"
                    >
                      {submitting ? 'Uploading Project...' : 'Publish Project'}
                    </button>
                  </div>
                </form>
              </section>
            </div>
          )}

          {/* MANAGE PROJECTS TAB */}
          {activeTab === 'manage-projects' && (
            <div className="animate-in fade-in duration-500">
              {loadingProjects ? (
                <div className="flex justify-center p-12">
                   <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                </div>
              ) : projects.length === 0 ? (
                <div className="rounded-2xl bg-white p-12 text-center shadow-sm border border-slate-100 flex flex-col items-center justify-center">
                  <FolderPlus size={48} className="text-slate-300 mb-4" />
                  <h3 className="text-lg font-bold text-slate-900 mb-2">No projects found</h3>
                  <p className="text-slate-500 mb-6">Get started by creating your first project.</p>
                  <button onClick={() => setActiveTab('add-project')} className="text-indigo-600 font-medium hover:text-indigo-700">Add Project</button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {projects.map((project) => (
                    <article
                      key={project.id}
                      className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm border border-slate-200 transition-all hover:-translate-y-1 hover:shadow-xl"
                    >
                      <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                        <img src={getFullImageUrl(project.imageUrl)} alt={project.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-end p-4 gap-2">
                           <button className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur px-4 py-2 text-sm font-bold text-white transition">
                              Edit Project
                           </button>
                           <button
                             onClick={() => handleDelete(project.id)}
                             disabled={deletingId === project.id}
                             className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-red-600/90 backdrop-blur px-4 py-2 text-sm font-bold text-white transition hover:bg-red-600 disabled:opacity-70 disabled:cursor-not-allowed"
                           >
                             <Trash2 size={16} />
                             {deletingId === project.id ? 'Deleting...' : 'Delete Project'}
                           </button>
                      </div>
                      </div>
                      <div className="p-5 flex-1 flex flex-col">
                        <h3 className="line-clamp-1 text-lg font-bold text-slate-900 mb-1">{project.title}</h3>
                        <p className="text-sm font-medium text-indigo-600 mb-2">{project.location}</p>
                        <p className="text-sm text-slate-500 line-clamp-2 flex-1">{project.description}</p>
                        <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center text-xs text-slate-400 font-medium">
                          <span>{project.date}</span>
                          {project.pdfUrl && <span className="flex items-center gap-1"><FileText size={14}/> PDF Attached</span>}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* INQUIRIES TAB */}
          {activeTab === 'inquiries' && (
            <div className="animate-in fade-in duration-500">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-xs uppercase text-slate-500 font-semibold tracking-wider">
                      <tr>
                        <th className="px-6 py-4 border-b border-slate-200">Name</th>
                        <th className="px-6 py-4 border-b border-slate-200">Email</th>
                        <th className="px-6 py-4 border-b border-slate-200">Project Type</th>
                        <th className="px-6 py-4 border-b border-slate-200">Budget</th>
                        <th className="px-6 py-4 border-b border-slate-200">Status</th>
                        <th className="px-6 py-4 border-b border-slate-200 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {MOCK_INQUIRIES.map((inq) => (
                        <tr key={inq.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-6 py-4 font-medium text-slate-900">{inq.name}</td>
                          <td className="px-6 py-4 text-slate-500">{inq.email}</td>
                          <td className="px-6 py-4 text-slate-700">{inq.type}</td>
                          <td className="px-6 py-4 font-medium text-slate-700">{inq.budget}</td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold leading-5 ${inq.status === 'Pending' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>
                              {inq.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                             <button className="text-indigo-600 font-medium hover:text-indigo-800 text-xs uppercase tracking-wider">Review</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  )
}
