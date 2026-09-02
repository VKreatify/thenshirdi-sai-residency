const fs = require('fs');
const src = 'C:/Users/Persnol/Documents/thenshirdi1/sai residency blueprint.jpeg';
const dest = 'C:/Users/Persnol/Documents/thenshirdi1/public/images/sai_residency_blueprint.jpeg';
fs.copyFileSync(src, dest);
console.log('Copied successfully!');
