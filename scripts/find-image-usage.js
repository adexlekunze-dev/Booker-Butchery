const fs = require('fs');
const path = require('path');

const images = [
  'https://images.unsplash.com/photo-1606744824163-985d376605aa?w=800',
  'https://images.pexels.com/photos/60616/fried-chicken-chicken-fried-crunchy-60616.jpeg?w=800',
  'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=800',
  'https://images.unsplash.com/photo-1585238341710-886a75e1ede4?w=800'
];

const productsPath = path.join(__dirname, '../src/data/products.json');
const data = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

const productsWithImages = data.filter(p => 
  p.images && p.images.some(img => images.includes(img))
);

console.log(`Found ${productsWithImages.length} products using these images:\n`);

productsWithImages.forEach(p => {
  const matching = p.images.filter(img => images.includes(img));
  console.log(`- ${p.sku}: ${p.name}`);
  console.log(`  Category: ${p.category} / ${p.subcategory}`);
  console.log(`  Matching images: ${matching.length}`);
  console.log('');
});

