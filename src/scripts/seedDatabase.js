const { pool, initializeDatabase } = require('../config/database');
const { sampleProperties, sampleUsers } = require('../data/sampleData');
const bcrypt = require('bcryptjs');

const seedDatabase = async () => {
  try {
    console.log('🌱 Iniciando seed de la base de datos...');

    // Initialize database tables
    await initializeDatabase();

    // Clear existing data
    await pool.execute('DELETE FROM properties');
    await pool.execute('DELETE FROM users WHERE email != "admin@clickhome.com"');

    // Create sample users
    console.log('👥 Creando usuarios de muestra...');
    for (const user of sampleUsers) {
      const hashedPassword = await bcrypt.hash(user.password, 12);
      await pool.execute(
        'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
        [user.name, user.email, hashedPassword, user.role]
      );
    }

    // Get user IDs for property assignment
    const [users] = await pool.execute('SELECT id FROM users WHERE role = "user" LIMIT 2');
    const userIds = users.map(user => user.id);

    // Create sample properties
    console.log('🏠 Creando propiedades de muestra...');
    for (let i = 0; i < sampleProperties.length; i++) {
      const property = sampleProperties[i];
      const userId = userIds[i % userIds.length]; // Distribute properties among users
      
      await pool.execute(
        `INSERT INTO properties 
         (title, description, price, location, bedrooms, bathrooms, area, property_type, status, images, model_3d_path, features, user_id) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          property.title,
          property.description,
          property.price,
          property.location,
          property.bedrooms,
          property.bathrooms,
          property.area,
          property.property_type,
          property.status,
          JSON.stringify(property.images),
          property.model_3d_path,
          JSON.stringify(property.features),
          userId
        ]
      );
    }

    console.log('✅ Base de datos poblada exitosamente!');
    console.log(`📊 Datos creados:`);
    console.log(`   - ${sampleUsers.length} usuarios`);
    console.log(`   - ${sampleProperties.length} propiedades`);
    
  } catch (error) {
    console.error('❌ Error al poblar la base de datos:', error);
  } finally {
    process.exit(0);
  }
};

// Run if called directly
if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;
