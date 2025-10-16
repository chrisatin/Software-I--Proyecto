import { useState } from 'react'
import { useProperty } from '../contexts/PropertyContext'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { X, Upload, Plus, Trash2 } from 'lucide-react'

const PropertyForm = ({ property, onClose, onSuccess }) => {
  const { createProperty, updateProperty } = useProperty()
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState(property?.images || [])
  const [features, setFeatures] = useState(property?.features || [])
  const [newFeature, setNewFeature] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: property || {}
  })

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const propertyData = {
        ...data,
        images,
        features,
        price: parseFloat(data.price),
        bedrooms: parseInt(data.bedrooms) || 0,
        bathrooms: parseInt(data.bathrooms) || 0,
        area: parseFloat(data.area) || 0
      }

      let result
      if (property) {
        result = await updateProperty(property.id, propertyData)
      } else {
        result = await createProperty(propertyData)
      }

      if (result.success) {
        toast.success(property ? 'Propiedad actualizada' : 'Propiedad creada exitosamente')
        onSuccess()
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error('Error al guardar la propiedad')
    } finally {
      setLoading(false)
    }
  }

  const handleImageAdd = (url) => {
    if (url.trim()) {
      setImages([...images, url.trim()])
    }
  }

  const handleImageRemove = (index) => {
    setImages(images.filter((_, i) => i !== index))
  }

  const handleFeatureAdd = () => {
    if (newFeature.trim()) {
      setFeatures([...features, newFeature.trim()])
      setNewFeature('')
    }
  }

  const handleFeatureRemove = (index) => {
    setFeatures(features.filter((_, i) => i !== index))
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {property ? 'Editar Propiedad' : 'Nueva Propiedad'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título *
              </label>
              <input
                {...register('title', { required: 'El título es requerido' })}
                className="input-field"
                placeholder="Ej: Casa moderna en el centro"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Precio *
              </label>
              <input
                {...register('price', { required: 'El precio es requerido' })}
                type="number"
                className="input-field"
                placeholder="Ej: 250000000"
              />
              {errors.price && (
                <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ubicación *
            </label>
            <input
              {...register('location', { required: 'La ubicación es requerida' })}
              className="input-field"
              placeholder="Ej: Bogotá, Colombia"
            />
            {errors.location && (
              <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción
            </label>
            <textarea
              {...register('description')}
              rows={3}
              className="input-field"
              placeholder="Describe la propiedad..."
            />
          </div>

          {/* Property Details */}
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo
              </label>
              <select
                {...register('property_type')}
                className="input-field"
              >
                <option value="house">Casa</option>
                <option value="apartment">Apartamento</option>
                <option value="commercial">Comercial</option>
                <option value="land">Terreno</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dormitorios
              </label>
              <input
                {...register('bedrooms')}
                type="number"
                min="0"
                className="input-field"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Baños
              </label>
              <input
                {...register('bathrooms')}
                type="number"
                min="0"
                className="input-field"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Área (m²)
              </label>
              <input
                {...register('area')}
                type="number"
                min="0"
                className="input-field"
                placeholder="0"
              />
            </div>
          </div>

          {/* Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Imágenes
            </label>
            <div className="space-y-3">
              {images.map((image, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <img
                    src={image}
                    alt={`Imagen ${index + 1}`}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <span className="flex-1 text-sm text-gray-600 truncate">
                    {image}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleImageRemove(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              
              <div className="flex space-x-2">
                <input
                  type="url"
                  placeholder="URL de imagen"
                  className="flex-1 input-field"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      handleImageAdd(e.target.value)
                      e.target.value = ''
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={(e) => {
                    const input = e.target.previousElementSibling
                    handleImageAdd(input.value)
                    input.value = ''
                  }}
                  className="btn-secondary flex items-center space-x-1"
                >
                  <Plus className="w-4 h-4" />
                  <span>Agregar</span>
                </button>
              </div>
            </div>
          </div>

          {/* Features */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Características
            </label>
            <div className="space-y-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span className="flex-1 text-sm text-gray-600">{feature}</span>
                  <button
                    type="button"
                    onClick={() => handleFeatureRemove(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Nueva característica"
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  className="flex-1 input-field"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      handleFeatureAdd()
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={handleFeatureAdd}
                  className="btn-secondary flex items-center space-x-1"
                >
                  <Plus className="w-4 h-4" />
                  <span>Agregar</span>
                </button>
              </div>
            </div>
          </div>

          {/* 3D Model */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Modelo 3D (URL)
            </label>
            <input
              {...register('model_3d_path')}
              type="url"
              className="input-field"
              placeholder="URL del modelo .glb"
            />
            <p className="mt-1 text-sm text-gray-500">
              Opcional: URL del archivo .glb para el recorrido virtual
            </p>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Guardando...
                </div>
              ) : (
                property ? 'Actualizar' : 'Crear Propiedad'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PropertyForm
