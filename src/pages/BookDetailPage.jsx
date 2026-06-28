import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import bookService from '../services/bookService';
import categoryService from '../services/categoryService';
import memberService from '../services/memberService';
import borrowRecordService from '../services/borrowRecordService';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Sidebar from '../components/common/Sidebar';

export default function BookDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [requesting, setRequesting] = useState(false);
  const { user, isMember } = useAuth();

  useEffect(() => {
    Promise.all([bookService.getBookById(id), categoryService.getAllCategories()])
      .then(([b, c]) => { setBook(b); setCategories(c); })
      .finally(() => setLoading(false));
  }, [id]);

  const handleBorrowRequest = async () => {
    if (!user) {
      toast.warning('Vui lòng đăng nhập để mượn sách!');
      navigate('/login');
      return;
    }

    const confirm = window.confirm(`Bạn có muốn gửi yêu cầu đăng ký mượn cuốn sách này không?`);
    if (!confirm) return;

    setRequesting(true);
    try {
      const member = await memberService.getMemberByUserId(user.uId);
      if (!member) {
        toast.error('Không tìm thấy thông tin độc giả liên kết với tài khoản này!');
        return;
      }

      await borrowRecordService.createBorrowRecord({
        bookId: id,
        memberId: member.id,
        dueDate: null,
        status: 'pending'
      });
      toast.success('Đăng ký mượn thành công! Vui lòng chờ thủ thư duyệt.');
      navigate('/my-borrow-records');
    } catch (e) {
      toast.error(e.message || 'Có lỗi xảy ra!');
    } finally {
      setRequesting(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!book) return <p className="alert alert-danger">Không tìm thấy sách!</p>;

  const category = categories.find(c => String(c.id) === String(book.categoryId));
  const isAvailable = book.availableCopies > 0;

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 p-4">
        <div className="card shadow-sm p-4">
          <div className="row">
            <div className="col-md-3 mb-3 mb-md-0">
              <img src={
                book.coverImage 
                  ? (book.coverImage.startsWith('http') || book.coverImage.startsWith('/') ? book.coverImage : `/${book.coverImage}`) 
                  : 'https://via.placeholder.com/200x280?text=No+Image'
              }
                alt={book.title} className="img-fluid rounded shadow-sm" 
                style={{ maxHeight: '300px', objectFit: 'contain', backgroundColor: '#f8f9fa', width: '100%' }} />
            </div>
            <div className="col-md-9">
              <h2>{book.title}</h2>
              <p><strong>Tác giả:</strong> {book.author}</p>
              <p><strong>Thể loại:</strong> {category?.name || '—'}</p>
              <p>
                <strong>Tình trạng: </strong>
                <span className={isAvailable ? 'text-success fw-bold' : 'text-danger fw-bold'}>
                  {book.availableCopies}/{book.totalCopies}
                </span>
              </p>
              
              <div className="d-flex gap-2 mt-4">
                <button className="btn btn-secondary" onClick={() => navigate('/books')}>← Quay lại</button>
                {isMember() && (
                  <button 
                    className="btn btn-primary px-4 fw-semibold" 
                    onClick={handleBorrowRequest}
                    disabled={requesting || !isAvailable}
                  >
                    {requesting ? 'Đang gửi yêu cầu...' : 'Đăng ký mượn sách'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
