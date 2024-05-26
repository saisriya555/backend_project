import { Router } from 'express';
import multer from 'multer';
import { uploadBooks, viewBooksBySeller, editBook, removeBook, listAllBooks, viewBook } from '../controllers/bookController';
import { authenticateJWT, authorizeRoles } from '../middlewares/authMiddleware';

const router = Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', authenticateJWT, authorizeRoles('SELLER'), upload.single('file'), uploadBooks);
router.get('/seller', authenticateJWT, authorizeRoles('SELLER'), viewBooksBySeller);
router.put('/:id', authenticateJWT, authorizeRoles('SELLER'), editBook);
router.delete('/:id', authenticateJWT, authorizeRoles('SELLER'), removeBook);
router.get('/', listAllBooks);
router.get('/:id', viewBook);

export default router;
