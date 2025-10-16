import { Link } from 'react-router-dom'
import { MapPin, Bed, Bath, Square } from 'lucide-react'

const PropertyCard = ({ property }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price)
  }

  const getPropertyTypeLabel = (type) => {
    const types = {
      house: 'Casa',
      apartment: 'Apartamento',
      commercial: 'Comercial',
      land: 'Terreno'
    }
    return types[type] || type
  }

  return (
    <Link to={`/property/${property.id}`} className="group">
      <div className="card hover:shadow-lg transition-shadow duration-300">
        {/* Property Image */}
        <div className="relative h-48 bg-gray-200 overflow-hidden">
          {property.images && property.images.length > 0 ? (
            <img
              src={property.images[0]}
              alt={property.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <div className="text-gray-400 text-center">
                <div className="w-12 h-12 mx-auto mb-2">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                  </svg>
                </div>
                <p className="text-sm">Sin imagen</p>
              </div>
            </div>
          )}
          
          {/* Property Type Badge */}
          <div className="absolute top-3 left-3">
            <span className="bg-primary-600 text-white px-2 py-1 rounded-full text-xs font-medium">
              {getPropertyTypeLabel(property.property_type)}
            </span>
          </div>

          {/* Price Badge */}
          <div className="absolute top-3 right-3">
            <span className="bg-white text-gray-900 px-3 py-1 rounded-full text-sm font-semibold shadow-sm">
              {formatPrice(property.price)}
            </span>
          </div>
        </div>

        {/* Property Details */}
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
            {property.title}
          </h3>
          
          <div className="flex items-center text-gray-600 mb-3">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="text-sm">{property.location}</span>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-4">
              {property.bedrooms > 0 && (
                <div className="flex items-center">
                  <Bed className="w-4 h-4 mr-1" />
                  <span>{property.bedrooms}</span>
                </div>
              )}
              {property.bathrooms > 0 && (
                <div className="flex items-center">
                  <Bath className="w-4 h-4 mr-1" />
                  <span>{property.bathrooms}</span>
                </div>
              )}
              {property.area > 0 && (
                <div className="flex items-center">
                  <Square className="w-4 h-4 mr-1" />
                  <span>{property.area}m²</span>
                </div>
              )}
            </div>
          </div>

          {property.description && (
            <p className="text-gray-600 text-sm mt-2 line-clamp-2">
              {property.description}
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}

export default PropertyCard
