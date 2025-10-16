import { useState, useEffect } from 'react'
import { useProperty } from '../contexts/PropertyContext'
import PropertyCard from '../components/PropertyCard'
import PropertyFilters from '../components/PropertyFilters'
import { Search, Filter } from 'lucide-react'

const Properties = () => {
  const { properties, loading, fetchProperties, filters, updateFilters } = useProperty()
  const [currentPage, setCurrentPage] = useState(1)
  const [showFilters, setShowFilters] = useState(false)
  const [pagination, setPagination] = useState({})

  useEffect(() => {
    loadProperties()
  }, [currentPage, filters])

  const loadProperties = async () => {
    const result = await fetchProperties(currentPage, 12, filters)
    if (result.pagination) {
      setPagination(result.pagination)
    }
  }

  const handleFilterChange = (newFilters) => {
    updateFilters(newFilters)
    setCurrentPage(1)
  }

  const handleSearch = (searchTerm) => {
    handleFilterChange({ location: searchTerm })
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Propiedades Disponibles
          </h1>
          <p className="text-gray-600">
            Encuentra tu hogar ideal con nuestra tecnología de recorridos 3D
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar por ubicación..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-5 h-5" />
              <span>Filtros</span>
            </button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <PropertyFilters
                filters={filters}
                onFilterChange={handleFilterChange}
              />
            </div>
          )}
        </div>

        {/* Properties Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : properties.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2 mt-12">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Anterior
                </button>

                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                  .filter(page => {
                    const start = Math.max(1, currentPage - 2)
                    const end = Math.min(pagination.totalPages, currentPage + 2)
                    return page >= start && page <= end
                  })
                  .map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-3 py-2 border rounded-lg ${
                        page === currentPage
                          ? 'bg-primary-600 text-white border-primary-600'
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === pagination.totalPages}
                  className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Siguiente
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-4 text-gray-400">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No se encontraron propiedades
            </h3>
            <p className="text-gray-600">
              Intenta ajustar los filtros de búsqueda
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Properties
