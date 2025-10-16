#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🏠 Configurando Click&Home...\n');

// Check if .env exists
if (!fs.existsSync('.env')) {
  console.log('📝 Creando archivo .env...');
  fs.copyFileSync('env.example', '.env');
  console.log('✅ Archivo .env creado. Por favor, edita las credenciales de la base de datos.\n');
}

// Install backend dependencies
console.log('📦 Instalando dependencias del backend...');
try {
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Dependencias del backend instaladas.\n');
} catch (error) {
  console.error('❌ Error instalando dependencias del backend:', error.message);
  process.exit(1);
}

// Install frontend dependencies
console.log('📦 Instalando dependencias del frontend...');
try {
  execSync('cd frontend && npm install', { stdio: 'inherit' });
  console.log('✅ Dependencias del frontend instaladas.\n');
} catch (error) {
  console.error('❌ Error instalando dependencias del frontend:', error.message);
  process.exit(1);
}

console.log('🎉 ¡Configuración completada!\n');
console.log('📋 Próximos pasos:');
console.log('1. Configura tu base de datos MySQL');
console.log('2. Edita el archivo .env con tus credenciales');
console.log('3. Ejecuta: node src/scripts/seedDatabase.js');
console.log('4. Ejecuta: npm run dev');
console.log('\n🌐 URLs:');
console.log('- Frontend: http://localhost:5173');
console.log('- Backend: http://localhost:5000');
console.log('\n👥 Usuarios de prueba:');
console.log('- maria@example.com / password123 (Admin)');
console.log('- carlos@example.com / password123 (Usuario)');
console.log('- ana@example.com / password123 (Usuario)');
