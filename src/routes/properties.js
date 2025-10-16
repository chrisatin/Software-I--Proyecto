const express = require('express');
const { pool } = require('../config/database');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// Get all properties with optional filters
router.get('/', async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 12, 
      minPrice, 
      maxPrice, 
      propertyType, 
      bedrooms, 
      bathrooms,
      location,
      status = 'available'
    } = req.query;

    let query = `
      SELECT p.*, u.name as owner_name 
      FROM properties p 
      LEFT JOIN users u ON p.user_id = u.id 
      WHERE p.status = ?
    `;
    const queryParams = [status];

    // Add filters
    if (minPrice) {
      query += ' AND p.price >= ?';
      queryParams.push(minPrice);
    }
    if (maxPrice) {
      query += ' AND p.price <= ?';
      queryParams.push(maxPrice);
    }
    if (propertyType) {
      query += ' AND p.property_type = ?';
      queryParams.push(propertyType);
    }
    if (bedrooms) {
      query += ' AND p.bedrooms >= ?';
      queryParams.push(bedrooms);
    }
    if (bathrooms) {
      query += ' AND p.bathrooms >= ?';
      queryParams.push(bathrooms);
    }
    if (location) {
      query += ' AND p.location LIKE ?';
      queryParams.push(`%${location}%`);
    }

    // Add pagination
    const offset = (page - 1) * limit;
    query += ' ORDER BY p.created_at DESC LIMIT ? OFFSET ?';
    queryParams.push(parseInt(limit), parseInt(offset));

    const [properties] = await pool.execute(query, queryParams);

    // Get total count for pagination
    let countQuery = 'SELECT COUNT(*) as total FROM properties WHERE status = ?';
    const countParams = [status];

    if (minPrice) {
      countQuery += ' AND price >= ?';
      countParams.push(minPrice);
    }
    if (maxPrice) {
      countQuery += ' AND price <= ?';
      countParams.push(maxPrice);
    }
    if (propertyType) {
      countQuery += ' AND property_type = ?';
      countParams.push(propertyType);
    }
    if (bedrooms) {
      countQuery += ' AND bedrooms >= ?';
      countParams.push(bedrooms);
    }
    if (bathrooms) {
      countQuery += ' AND bathrooms >= ?';
      countParams.push(bathrooms);
    }
    if (location) {
      countQuery += ' AND location LIKE ?';
      countParams.push(`%${location}%`);
    }

    const [countResult] = await pool.execute(countQuery, countParams);
    const total = countResult[0].total;

    res.json({
      properties,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Get properties error:', error);
    res.status(500).json({ message: 'Server error fetching properties' });
  }
});

// Get single property by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const [properties] = await pool.execute(
      `SELECT p.*, u.name as owner_name, u.email as owner_email 
       FROM properties p 
       LEFT JOIN users u ON p.user_id = u.id 
       WHERE p.id = ?`,
      [id]
    );

    if (properties.length === 0) {
      return res.status(404).json({ message: 'Property not found' });
    }

    res.json({ property: properties[0] });
  } catch (error) {
    console.error('Get property error:', error);
    res.status(500).json({ message: 'Server error fetching property' });
  }
});

// Create new property (authenticated users only)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      location,
      bedrooms,
      bathrooms,
      area,
      property_type,
      images,
      model_3d_path,
      features
    } = req.body;

    // Validate required fields
    if (!title || !price || !location) {
      return res.status(400).json({ message: 'Title, price, and location are required' });
    }

    const [result] = await pool.execute(
      `INSERT INTO properties 
       (title, description, price, location, bedrooms, bathrooms, area, property_type, images, model_3d_path, features, user_id) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        description,
        price,
        location,
        bedrooms || 0,
        bathrooms || 0,
        area || 0,
        property_type || 'house',
        JSON.stringify(images || []),
        model_3d_path,
        JSON.stringify(features || []),
        req.user.id
      ]
    );

    res.status(201).json({
      message: 'Property created successfully',
      property: { id: result.insertId, ...req.body }
    });
  } catch (error) {
    console.error('Create property error:', error);
    res.status(500).json({ message: 'Server error creating property' });
  }
});

// Update property (owner or admin only)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Check if property exists and user has permission
    const [properties] = await pool.execute(
      'SELECT user_id FROM properties WHERE id = ?',
      [id]
    );

    if (properties.length === 0) {
      return res.status(404).json({ message: 'Property not found' });
    }

    const property = properties[0];
    if (property.user_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this property' });
    }

    // Build update query dynamically
    const updateFields = [];
    const updateValues = [];

    Object.keys(updateData).forEach(key => {
      if (key !== 'id' && updateData[key] !== undefined) {
        updateFields.push(`${key} = ?`);
        if (key === 'images' || key === 'features') {
          updateValues.push(JSON.stringify(updateData[key]));
        } else {
          updateValues.push(updateData[key]);
        }
      }
    });

    if (updateFields.length === 0) {
      return res.status(400).json({ message: 'No fields to update' });
    }

    updateValues.push(id);

    await pool.execute(
      `UPDATE properties SET ${updateFields.join(', ')} WHERE id = ?`,
      updateValues
    );

    res.json({ message: 'Property updated successfully' });
  } catch (error) {
    console.error('Update property error:', error);
    res.status(500).json({ message: 'Server error updating property' });
  }
});

// Delete property (owner or admin only)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Check if property exists and user has permission
    const [properties] = await pool.execute(
      'SELECT user_id FROM properties WHERE id = ?',
      [id]
    );

    if (properties.length === 0) {
      return res.status(404).json({ message: 'Property not found' });
    }

    const property = properties[0];
    if (property.user_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this property' });
    }

    await pool.execute('DELETE FROM properties WHERE id = ?', [id]);

    res.json({ message: 'Property deleted successfully' });
  } catch (error) {
    console.error('Delete property error:', error);
    res.status(500).json({ message: 'Server error deleting property' });
  }
});

// Get user's properties
router.get('/user/my-properties', authenticateToken, async (req, res) => {
  try {
    const [properties] = await pool.execute(
      'SELECT * FROM properties WHERE user_id = ? ORDER BY created_at DESC',
      [req.user.id]
    );

    res.json({ properties });
  } catch (error) {
    console.error('Get user properties error:', error);
    res.status(500).json({ message: 'Server error fetching user properties' });
  }
});

module.exports = router;
