import React, { useState, useEffect } from 'react';
import './AdminOffers.css';
import AdminHeader from './AdminHeader.js';
import Footer from '../Footer';

const BASE_URL = 'https://kalakshetra3-6.onrender.com';
const BADGE_OPTIONS = ['HOT', 'NEW', 'FESTIVE', 'SALE', 'EXCLUSIVE', 'LIMITED'];
const EMPTY_FORM = { title: '', description: '', image: '', badge: 'NEW', active: true };
const BADGE_COLORS = {
  HOT: '#ff4d2e', NEW: '#2c6e49', FESTIVE: '#c8891a',
  SALE: '#1a4a8a', EXCLUSIVE: '#5c2d8a', LIMITED: '#1c1c1c',
};

export default function AdminOffers() {
  const [offers, setOffers] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [toast, setToast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => { fetchOffers(); }, []);

  const fetchOffers = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/offers`);
      if (!res.ok) throw new Error(`${res.status} - ${res.statusText}`);
      const data = await res.json();
      setOffers(data.offers || []);
    } catch (err) {
      showToast(`Failed to load offers: ${err.message}`, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleImageFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
      setForm((f) => ({ ...f, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleImageUrl = (e) => {
    setImageFile(null);
    setForm((f) => ({ ...f, image: e.target.value }));
    setPreviewImage(e.target.value);
  };

  const openAdd = () => {
    setForm(EMPTY_FORM);
    setPreviewImage(null);
    setImageFile(null);
    setEditingId(null);
    setShowForm(true);
  };

  const openEdit = (offer) => {
    setForm({ title: offer.title, description: offer.description, image: offer.image, badge: offer.badge, active: offer.active });
    setPreviewImage(offer.image);
    setImageFile(null);
    setEditingId(offer._id);
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.title || !form.description) {
      showToast('Title and description are required.', 'error');
      return;
    }
    if (!form.image && !imageFile) {
      showToast('Please provide an image URL or upload an image.', 'error');
      return;
    }
    try {
      setIsSaving(true);
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('description', form.description);
      formData.append('badge', form.badge);
      formData.append('active', form.active.toString());

      if (imageFile) {
        formData.append('image', imageFile);
      } else if (form.image && !form.image.startsWith('data:')) {
        formData.append('imageUrl', form.image);
      }
      // if form.image is already base64 (existing saved image), don't send — backend keeps it

      const url = editingId
        ? `${BASE_URL}/offers/update/${editingId}`
        : `${BASE_URL}/offers/add`;
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, { method, body: formData });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || `${res.status}`);
      }
      const data = await res.json();

      if (editingId) {
        setOffers((prev) => prev.map((o) => (o._id === editingId ? data.offer : o)));
        showToast('Offer updated successfully!');
      } else {
        setOffers((prev) => [data.offer, ...prev]);
        showToast('Offer added successfully!');
      }
      cancelForm();
    } catch (err) {
      showToast(`Failed to save: ${err.message}`, 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this offer?')) return;
    try {
      const res = await fetch(`${BASE_URL}/offers/delete/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error(`${res.status}`);
      setOffers((prev) => prev.filter((o) => o._id !== id));
      showToast('Offer deleted.', 'error');
    } catch (err) {
      showToast(`Failed to delete: ${err.message}`, 'error');
    }
  };

  const toggleActive = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/offers/toggle/${id}`, { method: 'PATCH' });
      if (!res.ok) throw new Error(`${res.status}`);
      const data = await res.json();
      setOffers((prev) => prev.map((o) => (o._id === id ? data.offer : o)));
    } catch (err) {
      showToast(`Failed to toggle: ${err.message}`, 'error');
    }
  };

  const cancelForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
    setPreviewImage(null);
    setImageFile(null);
  };

  return (
    <div className="ao-page">
      <AdminHeader />

      {toast && <div className={`ao-toast ao-toast--${toast.type}`}>{toast.msg}</div>}

      <main className="ao-main">
        <div className="ao-page-header">
          <div>
            <p className="ao-page-eyebrow">Content Management</p>
            <h1 className="ao-page-title">Offers & Ads</h1>
            <p className="ao-page-sub">
              {offers.length} offers · {offers.filter((o) => o.active).length} active
            </p>
          </div>
          <button className="ao-add-btn" onClick={openAdd}><span>＋</span> Add Offer</button>
        </div>

        {showForm && (
          <div className="ao-form-panel">
            <div className="ao-form-panel-header">
              <h2>{editingId ? '✏️ Edit Offer' : '✨ New Offer'}</h2>
              <button className="ao-form-close" onClick={cancelForm}>×</button>
            </div>

            <div className="ao-form-body">
              <div className="ao-form-fields">
                <div className="ao-field">
                  <label>Offer Title *</label>
                  <input type="text" placeholder="e.g. 70% Off Clearance Sale"
                    value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
                </div>
                <div className="ao-field">
                  <label>Description *</label>
                  <textarea rows={3} placeholder="Describe the offer..."
                    value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
                </div>
                <div className="ao-field-row">
                  <div className="ao-field">
                    <label>Badge</label>
                    <select value={form.badge} onChange={(e) => setForm((f) => ({ ...f, badge: e.target.value }))}>
                      {BADGE_OPTIONS.map((b) => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                  <div className="ao-field ao-field--toggle">
                    <label>Status</label>
                    <button className={`ao-toggle ${form.active ? 'ao-toggle--on' : ''}`}
                      onClick={() => setForm((f) => ({ ...f, active: !f.active }))}>
                      <span className="ao-toggle-thumb" />
                      <span className="ao-toggle-label">{form.active ? 'Active' : 'Inactive'}</span>
                    </button>
                  </div>
                </div>
                <div className="ao-field">
                  <label>Image URL</label>
                  <input type="text" placeholder="https://..."
                    value={form.image && !form.image.startsWith('data:') ? form.image : ''}
                    onChange={handleImageUrl} />
                </div>
                <div className="ao-field">
                  <label>— or upload image —</label>
                  <input type="file" accept="image/*" onChange={handleImageFile} />
                </div>
              </div>

              <div className="ao-form-preview">
                <p className="ao-preview-label">Live Preview</p>
                <div className="ao-preview-card">
                  <div className="ao-preview-img">
                    {previewImage
                      ? <img src={previewImage} alt="preview" />
                      : <div className="ao-preview-placeholder">No image</div>}
                    {form.badge && (
                      <span className="ao-badge" style={{ background: BADGE_COLORS[form.badge] || '#333' }}>
                        {form.badge}
                      </span>
                    )}
                    {!form.active && <div className="ao-preview-inactive">INACTIVE</div>}
                  </div>
                  <div className="ao-preview-body">
                    <h3>{form.title || 'Offer Title'}</h3>
                    <p>{form.description || 'Description will appear here...'}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="ao-form-footer">
              <button className="ao-btn ao-btn--ghost" onClick={cancelForm}>Cancel</button>
              <button className="ao-btn ao-btn--primary" onClick={handleSave} disabled={isSaving}>
                {isSaving ? 'Saving...' : editingId ? 'Save Changes' : 'Add Offer'}
              </button>
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="ao-loading">Loading offers...</div>
        ) : (
          <div className="ao-grid">
            {offers.length === 0 && (
              <div className="ao-empty">
                <span>🏷️</span>
                <p>No offers yet. Click "Add Offer" to create one.</p>
              </div>
            )}
            {offers.map((offer) => (
              <div key={offer._id} className={`ao-card ${!offer.active ? 'ao-card--inactive' : ''}`}>
                <div className="ao-card-img">
                  {offer.image
                    ? <img src={offer.image} alt={offer.title} />
                    : <div className="ao-card-img-placeholder">No Image</div>}
                  {offer.badge && (
                    <span className="ao-badge" style={{ background: BADGE_COLORS[offer.badge] || '#333' }}>
                      {offer.badge}
                    </span>
                  )}
                  {!offer.active && <div className="ao-card-dimmer">INACTIVE</div>}
                </div>
                <div className="ao-card-body">
                  <h3 className="ao-card-title">{offer.title}</h3>
                  <p className="ao-card-desc">{offer.description}</p>
                </div>
                <div className="ao-card-footer">
                  <button
                    className={`ao-status-pill ${offer.active ? 'ao-status-pill--on' : 'ao-status-pill--off'}`}
                    onClick={() => toggleActive(offer._id)}>
                    {offer.active ? '● Active' : '○ Inactive'}
                  </button>
                  <div className="ao-card-actions">
                    <button className="ao-action-btn ao-action-btn--edit" onClick={() => openEdit(offer)}>Edit</button>
                    <button className="ao-action-btn ao-action-btn--delete" onClick={() => handleDelete(offer._id)}>Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}