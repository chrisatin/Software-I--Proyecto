import { Link } from 'react-router-dom'
import { Search, Home as HomeIcon, MapPin, Users, Star } from 'lucide-react'
import PropertyCard from '../components/PropertyCard'
import { useProperty } from '../contexts/PropertyContext'
import { useEffect } from 'react'

const Home = () => {
  const { properties, fetchProperties } = useProperty()

  useEffect(() => {
    fetchProperties(1, 6) // Fetch 6 featured properties
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Encuentra tu hogar ideal
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              Explora propiedades con recorridos virtuales 3D inmersivos
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/properties"
                className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Explorar Propiedades
              </Link>
              <Link
                to="/register"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
              >
                Registrarse
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              ¿Por qué elegir Click&Home?
            </h2>
            <p className="text-xl text-gray-600">
              Tecnología de vanguardia para la búsqueda inmobiliaria
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Búsqueda Inteligente
              </h3>
              <p className="text-gray-600">
                Filtros avanzados para encontrar exactamente lo que buscas
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <HomeIcon className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Recorridos 3D
              </h3>
              <p className="text-gray-600">
                Explora cada propiedad con tecnología de realidad virtual
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Comunidad Confiable
              </h3>
              <p className="text-gray-600">
                Conecta con propietarios y agentes verificados
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Propiedades Destacadas
            </h2>
            <p className="text-xl text-gray-600">
              Descubre las mejores opciones disponibles
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.slice(0, 6).map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/properties"
              className="btn-primary text-lg px-8 py-3"
            >
              Ver Todas las Propiedades
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-primary-100">Propiedades</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-primary-100">Usuarios Satisfechos</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-primary-100">Ciudades</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4.9</div>
              <div className="text-primary-100 flex items-center justify-center">
                <Star className="w-5 h-5 mr-1" />
                Calificación
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
