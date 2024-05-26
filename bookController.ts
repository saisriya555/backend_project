import { Request, Response } from 'express';
import { addBooks, getBooksBySeller, updateBook, deleteBook, getAllBooks, getBookById } from '../services/bookService';

export const uploadBooks = async (req: Request, res: Response) => {
  const sellerId = req.user.userId;
  try {
    const books = await addBooks(req.file, sellerId);
    res.status(201).json(books);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const viewBooksBySeller = async (req: Request, res: Response) => {
  const sellerId = req.user.userId;
  try {
    const books = await getBooksBySeller(sellerId);
    res.json(books);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const editBook = async (req: Request, res: Response) => {
  const sellerId = req.user.userId;
  const bookId = parseInt(req.params.id);
  try {
    const book = await updateBook(bookId, sellerId, req.body);
    res.json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const removeBook = async (req: Request, res: Response) => {
  const sellerId = req.user.userId;
  const bookId = parseInt(req.params.id);
  try {
    const book = await deleteBook(bookId, sellerId);
    res.json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const listAllBooks = async (req: Request, res: Response) => {
  try {
    const books = await getAllBooks();
    res.json(books);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const viewBook = async (req: Request, res: Response) => {
  const bookId = parseInt(req.params.id);
  try {
    const book = await getBookById(bookId);
    res.json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
