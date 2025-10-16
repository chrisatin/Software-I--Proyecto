import { createContext, useContext, useState } from 'react'
import axios from 'axios'

const PropertyContext = createContext()

export const useProperty = () => {
  const context = useContext(PropertyContext)
  if (!context) {
    throw new Error('useProperty must be used within a PropertyProvider')
  }
  return context
}

export const PropertyProvider = ({ children }) => {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    propertyType: '',
    bedrooms: '',
    bathrooms: '',
    location: ''
  })

  const fetchProperties = async (page = 1, limit = 12, customFilters = {}) => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...filters,
        ...customFilters
      })

      const response = await axios.get(`/api/properties?${params}`)
      setProperties(response.data.properties)
      return response.data
    } catch (error) {
      console.error('Error fetching properties:', error)
      return { properties: [], pagination: {} }
    } finally {
      setLoading(false)
    }
  }

  const fetchProperty = async (id) => {
    try {
      const response = await axios.get(`/api/properties/${id}`)
      return response.data.property
    } catch (error) {
      console.error('Error fetching property:', error)
      return null
    }
  }

  const createProperty = async (propertyData) => {
    try {
      const response = await axios.post('/api/properties', propertyData)
      return { success: true, property: response.data.property }
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Error al crear propiedad' 
      }
    }
  }

  const updateProperty = async (id, propertyData) => {
    try {
      await axios.put(`/api/properties/${id}`, propertyData)
      return { success: true }
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Error al actualizar propiedad' 
      }
    }
  }

  const deleteProperty = async (id) => {
    try {
      await axios.delete(`/api/properties/${id}`)
      return { success: true }
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Error al eliminar propiedad' 
      }
    }
  }

  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  const clearFilters = () => {
    setFilters({
      minPrice: '',
      maxPrice: '',
      propertyType: '',
      bedrooms: '',
      bathrooms: '',
      location: ''
    })
  }

  const value = {
    properties,
    loading,
    filters,
    fetchProperties,
    fetchProperty,
    createProperty,
    updateProperty,
    deleteProperty,
    updateFilters,
    clearFilters
  }

  return (
    <PropertyContext.Provider value={value}>
      {children}
    </PropertyContext.Provider>
  )
}
