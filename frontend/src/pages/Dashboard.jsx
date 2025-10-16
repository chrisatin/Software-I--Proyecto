import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useProperty } from '../contexts/PropertyContext'
import PropertyCard from '../components/PropertyCard'
import PropertyForm from '../components/PropertyForm'
import { Plus, Edit, Trash2, Eye } from 'lucide-react'
import toast from 'react-hot-toast'

const Dashboard = () => {
  const { user } = useAuth()
  const { properties, fetchProperties, deleteProperty } = useProperty()
  const [showForm, setShowForm] = useState(false)
  const [editingProperty, setEditingProperty] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadUserProperties()
  }, [])

  const loadUserProperties = async () => {
    setLoading(true)
    try {
      await fetchProperties(1, 50) // Load user's properties
    } catch (error) {
      console.error('Error loading properties:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteProperty = async (propertyId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta propiedad?')) {
      try {
        const result = await deleteProperty(propertyId)
        if (result.success) {
          toast.success('Propiedad eliminada exitosamente')
          loadUserProperties()
        } else {
          toast.error(result.message)
        }
      } catch (error) {
        toast.error('Error al eliminar la propiedad')
      }
    }
  }

  const handleEditProperty = (property) => {
    setEditingProperty(property)
    setShowForm(true)
  }

  const handleFormClose = () => {
    setShowForm(false)
    setEditingProperty(null)
  }

  const handleFormSuccess = () => {
    setShowForm(false)
    setEditingProperty(null)
    loadUserProperties()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Mi Dashboard
          </h1>
          <p className="text-gray-600">
            Gestiona tus propiedades y perfil
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Propiedades</p>
                <p className="text-2xl font-bold text-gray-900">{properties.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Disponibles</p>
                <p className="text-2xl font-bold text-gray-900">
                  {properties.filter(p => p.status === 'available').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Vistas</p>
                <p className="text-2xl font-bold text-gray-900">0</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Mis Propiedades</h2>
          <button
            onClick={() => setShowForm(true)}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Nueva Propiedad</span>
          </button>
        </div>

        {/* Properties Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : properties.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <div key={property.id} className="card">
                <div className="relative">
                  {property.images && property.images.length > 0 ? (
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                      <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                      </svg>
                    </div>
                  )}
                  
                  {/* Status Badge */}
                  <div className="absolute top-3 left-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      property.status === 'available' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {property.status === 'available' ? 'Disponible' : property.status}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="absolute top-3 right-3 flex space-x-2">
                    <button
                      onClick={() => handleEditProperty(property)}
                      className="bg-white/90 backdrop-blur-sm rounded-lg p-2 hover:bg-white transition-colors"
                      title="Editar"
                    >
                      <Edit className="w-4 h-4 text-gray-700" />
                    </button>
                    <button
                      onClick={() => handleDeleteProperty(property.id)}
                      className="bg-white/90 backdrop-blur-sm rounded-lg p-2 hover:bg-white transition-colors"
                      title="Eliminar"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {property.title}
                  </h3>
                  
                  <div className="flex items-center text-gray-600 mb-3">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    <span className="text-sm">{property.location}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary-600">
                      {new Intl.NumberFormat('es-CO', {
                        style: 'currency',
                        currency: 'COP',
                        minimumFractionDigits: 0
                      }).format(property.price)}
                    </span>
                    <a
                      href={`/property/${property.id}`}
                      className="text-gray-600 hover:text-primary-600 transition-colors"
                      title="Ver detalles"
                    >
                      <Eye className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-4 text-gray-400">
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No tienes propiedades aún
            </h3>
            <p className="text-gray-600 mb-6">
              Comienza agregando tu primera propiedad
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="btn-primary"
            >
              Agregar Primera Propiedad
            </button>
          </div>
        )}

        {/* Property Form Modal */}
        {showForm && (
          <PropertyForm
            property={editingProperty}
            onClose={handleFormClose}
            onSuccess={handleFormSuccess}
          />
        )}
      </div>
    </div>
  )
}

export default Dashboard
