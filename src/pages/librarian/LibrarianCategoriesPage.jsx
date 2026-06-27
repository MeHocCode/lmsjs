import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import categoryService from '../../services/categoryService';
import DataTable from '../../components/common/DataTable';
import Sidebar from '../../components/common/Sidebar';
import CategoryForm from '../../components/category/CategoryForm';
import LoadingSpinner from '../../components/common/LoadingSpinner';

export default function LibrarianCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await categoryService.getAllCategories();
      setCategories(data);
    } catch {
      toast.error('Không thể tải danh sách thể loại!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSave = async (data) => {
    try {
      if (selected) {
        await categoryService.updateCategory(selected.id, data);
      } else {
        await categoryService.createCategory(data);
      }
      toast.success(selected ? 'Cập nhật thể loại thành công!' : 'Thêm thể loại mới thành công!');
      setSelected(null);
      fetchCategories();
    } catch {
      toast.error('Có lỗi xảy ra khi lưu thể loại!');
    }
  };

  const handleDelete = async (id) => {
    try {
      await categoryService.deleteCategory(id);
      toast.success('Xóa thể loại thành công!');
      fetchCategories();
    } catch {
      toast.error('Không thể xóa thể loại!');
    }
  };

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Tên thể loại' }
  ];

  if (loading) return <LoadingSpinner />;

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 p-4">
        <div className="row">
          <div className="col-md-8">
            <h2 className="mb-3">Quản lý thể loại</h2>
            <DataTable data={categories} columns={columns} onEdit={setSelected} onDelete={handleDelete} />
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm p-3 sticky-top" style={{ top: '20px' }}>
              <h5>{selected ? 'Sửa thể loại' : 'Thêm thể loại'}</h5>
              <CategoryForm 
                category={selected} 
                onSave={handleSave} 
                onCancel={() => setSelected(null)} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
