import csvParser from 'csv-parser';
import fs from 'fs';

interface Book {
  title: string;
  author: string;
  price: number;
}

export const parseCSV = (file: Express.Multer.File): Promise<Book[]> => {
  return new Promise((resolve, reject) => {
    const books: Book[] = [];
    fs.createReadStream(file.path)
      .pipe(csvParser())
      .on('data', (row) => {
        books.push({
          title: row.title,
          author: row.author,
          price: parseFloat(row.price)
        });
      })
      .on('end', () => {
        resolve(books);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
};
