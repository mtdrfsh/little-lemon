export async function initializeDatabase(db) {
    try {
        const query = 'CREATE TABLE IF NOT EXISTS menu (uuid INTEGER PRIMARY KEY NOT NULL, name TEXT, price INTEGER , description TEXT, image TEXT, category TEXT);';
        await db.execAsync(query);
        console.log('Database initialized');
    } catch (error) {
        console.error('Error initializing database:', error);
    }
}

export async function saveDatatoDatabase(db, data) {
  try {
      // Delete all existing data
      await db.runAsync('DELETE FROM menu;');
    
      // Insert each item
      for (const item of data) {
          await db.runAsync(
              'INSERT INTO menu (uuid, name, price, description, image, category) VALUES (?, ?, ?, ?, ?, ?)', 
              [item.id, item.name, item.price, item.description, item.image, item.category]
          );
      }

      // Fetch data to verify insertion
      const rows = await db.getAllAsync('SELECT * FROM menu;');
      for (const row of rows) {
        console.log(row.uuid, row.name, row.price, row.description, row.image, row.category);
      }
      
    
  } catch (error) {
      console.error('Error saving data:', error);
  }
}
