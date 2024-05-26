import { PrismaClient } from '@prisma/client';
import { parseCSV } from '../utils/csvHandler';

const prisma = new PrismaClient();

export const addBooks = async (csvFile: Express.Multer.File, sellerId: number) => {
  const books = await parseCSV(csvFile);
  const createdBooks = await prisma.book.createMany({
    data: books.map(book => ({
      ...book,
      sellerId
    }))
  });
  return createdBooks;
};

export const getBooksBySeller = async (sellerId: number) => {
  return prisma.book.findMany({ where: { sellerId } });
};

export const updateBook = async (id: number, sellerId: number, data: Partial<Book>) => {
  const book = await prisma.book.findUnique({ where: { id } });
  if (!book || book.sellerId !== sellerId) {
    throw new Error('Book not found or access denied');
  }
  return prisma.book.update({ where: { id }, data });
};

export const deleteBook = async (id: number, sellerId: number) => {
  const book = await prisma.book.findUnique({ where: { id } });
  if (!book || book.sellerId !== sellerId) {
    throw new Error('Book not found or access denied');
  }
  return prisma.book.delete({ where: { id } });
};

export const getAllBooks = async () => {
  return prisma.book.findMany();
};

export const getBookById = async (id: number) => {
  return prisma.book.findUnique({ where: { id } });
};
