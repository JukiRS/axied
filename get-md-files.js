const fs = require('fs');
const path = require('path');

// Получаем список всех файлов в папке docs
const files = fs.readdirSync('docs');

// Фильтруем только файлы с расширением .md и формируем полный путь
const markdownFiles = files
  .filter(file => file.endsWith('.md'))
  .map(file => path.join('docs', file))
  .join(','); // Объединяем в строку через запятую

console.log(markdownFiles);
