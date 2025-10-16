import { useState } from 'react'
import { X } from 'lucide-react'

const PropertyFilters = ({ filters, onFilterChange }) => {
  const [localFilters, setLocalFilters] = useState(filters)

  const handleFilterChange = (key, value) => {
    const newFilters = { ...localFilters, [key]: value }
    setLocalFilters(newFilters)
    onFilterChange(newFilters)
  }

  const clearFilters = () => {
    const clearedFilters = {
      minPrice: '',
      maxPrice: '',
      propertyType: '',
      bedrooms: '',
      bathrooms: '',
      location: ''
    }
    setLocalFilters(clearedFilters)
    onFilterChange(clearedFilters)
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Property Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tipo de Propiedad
        </label>
        <select
          value={localFilters.propertyType}
          onChange={(e) => handleFilterChange('propertyType', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="">Todos los tipos</option>
          <option value="house">Casa</option>
          <option value="apartment">Apartamento</option>
          <option value="commercial">Comercial</option>
          <option value="land">Terreno</option>
        </select>
      </div>

      {/* Min Price */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Precio Mínimo
        </label>
        <input
          type="number"
          placeholder="Ej: 100000000"
          value={localFilters.minPrice}
          onChange={(e) => handleFilterChange('minPrice', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      {/* Max Price */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Precio Máximo
        </label>
        <input
          type="number"
          placeholder="Ej: 500000000"
          value={localFilters.maxPrice}
          onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      {/* Bedrooms */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Dormitorios
        </label>
        <select
          value={localFilters.bedrooms}
          onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="">Cualquier cantidad</option>
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
          <option value="5">5+</option>
        </select>
      </div>

      {/* Bathrooms */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Baños
        </label>
        <select
          value={localFilters.bathrooms}
          onChange={(e) => handleFilterChange('bathrooms', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="">Cualquier cantidad</option>
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
        </select>
      </div>

      {/* Clear Filters */}
      <div className="flex items-end">
        <button
          onClick={clearFilters}
          className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <X className="w-4 h-4" />
          <span>Limpiar Filtros</span>
        </button>
      </div>
    </div>
  )
}

export default PropertyFilters
