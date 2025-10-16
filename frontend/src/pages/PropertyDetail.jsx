import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useProperty } from '../contexts/PropertyContext'
import VirtualTour from '../components/VirtualTour'
import { 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Car, 
  Wifi, 
  Shield, 
  TreePine,
  Phone,
  Mail,
  ArrowLeft,
  Play,
  Image as ImageIcon
} from 'lucide-react'

const PropertyDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { fetchProperty } = useProperty()
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showVirtualTour, setShowVirtualTour] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)

  useEffect(() => {
    loadProperty()
  }, [id])

  const loadProperty = async () => {
    try {
      const propertyData = await fetchProperty(id)
      if (propertyData) {
        setProperty(propertyData)
      } else {
        navigate('/properties')
      }
    } catch (error) {
      console.error('Error loading property:', error)
      navigate('/properties')
    } finally {
      setLoading(false)
    }
  }

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Propiedad no encontrada</h2>
          <button
            onClick={() => navigate('/properties')}
            className="btn-primary"
          >
            Volver a Propiedades
          </button>
        </div>
      </div>
    )
  }

  const images = property.images || []
  const features = property.features || []

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Virtual Tour Modal */}
      {showVirtualTour && (
        <VirtualTour
          modelUrl={property.model_3d_path}
          propertyTitle={property.title}
          onClose={() => setShowVirtualTour(false)}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/properties')}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Volver a Propiedades</span>
        </button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
              {images.length > 0 ? (
                <div className="relative">
                  <div className="aspect-w-16 aspect-h-9">
                    <img
                      src={images[selectedImage]}
                      alt={property.title}
                      className="w-full h-96 object-cover"
                    />
                  </div>
                  
                  {/* Image Navigation */}
                  {images.length > 1 && (
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex space-x-2 overflow-x-auto">
                        {images.map((image, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedImage(index)}
                            className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${
                              selectedImage === index ? 'border-primary-600' : 'border-white'
                            }`}
                          >
                            <img
                              src={image}
                              alt={`${property.title} ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Virtual Tour Button */}
                  {property.model_3d_path && (
                    <div className="absolute top-4 right-4">
                      <button
                        onClick={() => setShowVirtualTour(true)}
                        className="bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-primary-700 transition-colors shadow-lg"
                      >
                        <Play className="w-4 h-4" />
                        <span>Recorrido 3D</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-96 bg-gray-100 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <ImageIcon className="w-16 h-16 mx-auto mb-4" />
                    <p>No hay imágenes disponibles</p>
                  </div>
                </div>
              )}
            </div>

            {/* Property Details */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span>{property.location}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary-600 mb-2">
                    {formatPrice(property.price)}
                  </div>
                  <span className="inline-block bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium">
                    {getPropertyTypeLabel(property.property_type)}
                  </span>
                </div>
              </div>

              {property.description && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Descripción</h3>
                  <p className="text-gray-600 leading-relaxed">{property.description}</p>
                </div>
              )}

              {/* Property Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {property.bedrooms > 0 && (
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Bed className="w-6 h-6 text-primary-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{property.bedrooms}</div>
                    <div className="text-sm text-gray-600">Dormitorios</div>
                  </div>
                )}
                {property.bathrooms > 0 && (
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Bath className="w-6 h-6 text-primary-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{property.bathrooms}</div>
                    <div className="text-sm text-gray-600">Baños</div>
                  </div>
                )}
                {property.area > 0 && (
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Square className="w-6 h-6 text-primary-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{property.area}</div>
                    <div className="text-sm text-gray-600">m²</div>
                  </div>
                )}
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">
                    {property.status === 'available' ? 'Disponible' : property.status}
                  </div>
                  <div className="text-sm text-gray-600">Estado</div>
                </div>
              </div>

              {/* Features */}
              {features.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Características</h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2 text-gray-600">
                        <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Contact Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contactar</h3>
              
              {property.owner_name && (
                <div className="mb-4">
                  <p className="text-sm text-gray-600">Propietario</p>
                  <p className="font-medium text-gray-900">{property.owner_name}</p>
                </div>
              )}

              <div className="space-y-3">
                <button className="w-full flex items-center justify-center space-x-2 bg-primary-600 text-white py-3 px-4 rounded-lg hover:bg-primary-700 transition-colors">
                  <Phone className="w-4 h-4" />
                  <span>Llamar</span>
                </button>
                
                <button className="w-full flex items-center justify-center space-x-2 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                  <Mail className="w-4 h-4" />
                  <span>Enviar Email</span>
                </button>
              </div>
            </div>

            {/* Property Info */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Información</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tipo:</span>
                  <span className="font-medium">{getPropertyTypeLabel(property.property_type)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Precio:</span>
                  <span className="font-medium">{formatPrice(property.price)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ubicación:</span>
                  <span className="font-medium text-right">{property.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Publicado:</span>
                  <span className="font-medium">
                    {new Date(property.created_at).toLocaleDateString('es-CO')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyDetail
