import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import { 
  LayoutDashboard, 
  Image as ImageIcon, 
  Type, 
  Rss, 
  Search, 
  Save, 
  LogOut, 
  Plus, 
  Trash2, 
  Edit3,
  Video,
  Upload,
  ChevronRight,
  Globe
} from 'lucide-react';

const getImageUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('http') || url.startsWith('data:') || url.startsWith('/')) return url;
  if (url.includes('uploads/')) return '/' + url.replace(/^\/+/, '');
  return url;
};

export default function AdminPanel() {
  const { content, loading, saveContent } = useContent();
  const [activeTab, setActiveTab] = useState('general');
  const [localData, setLocalData] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    if (!token) navigate('/admin');
    if (content) setLocalData(JSON.parse(JSON.stringify(content)));
  }, [content, token, navigate]);

  if (loading || !localData) return <div className="min-h-screen bg-dark flex items-center justify-center text-accent font-bold uppercase tracking-widest">Loading Dashboard...</div>;

  const handleSave = async () => {
    setIsSaving(true);
    const success = await saveContent(localData, token);
    if (success) {
      alert('Changes saved successfully!');
    } else {
      alert('Error saving changes. Your session might have expired.');
      navigate('/admin');
    }
    setIsSaving(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin');
  };

  const updateNestedData = (path, value) => {
    const newData = { ...localData };
    const keys = path.split('.');
    let current = newData;
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    setLocalData(newData);
  };

  const handleImageUpload = async (e, path) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('action', 'upload');
    formData.append('token', token);
    formData.append('file', file);

    try {
      const response = await fetch('api/cms.php', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      if (data.success) {
        updateNestedData(path, data.url);
      } else {
        alert('Upload failed');
      }
    } catch (err) {
      alert('Error uploading file');
    }
  };

  const tabs = [
    { id: 'general', name: 'Hero & Footer', icon: LayoutDashboard },
    { id: 'services', name: 'Services', icon: ImageIcon },
    { id: 'blogs', name: 'Blog Management', icon: Rss },
    { id: 'seo', name: 'SEO Settings', icon: Search }
  ];

  return (
    <div className="min-h-screen bg-[#111] text-white flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-72 bg-dark border-r border-white/5 flex flex-col p-6 space-y-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
            <Globe className="text-primary w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold uppercase font-sans-condensed leading-none">IronOak</h2>
            <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Admin Panel</span>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.id ? 'bg-accent text-primary' : 'hover:bg-white/5 text-white/60'
              }`}
            >
              <tab.icon size={18} />
              {tab.name}
            </button>
          ))}
        </nav>

        <div className="pt-6 border-t border-white/5 space-y-3">
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="w-full bg-white text-primary py-3 rounded-xl font-bold uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
          >
            <Save size={14} />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
          <button 
            onClick={handleLogout}
            className="w-full bg-white/5 text-red-400 py-3 rounded-xl font-bold uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 hover:bg-red-400/10 transition-all"
          >
            <LogOut size={14} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto max-h-screen">
        <header className="mb-12 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-bold uppercase font-sans-condensed tracking-tight">
              {tabs.find(t => t.id === activeTab)?.name}
            </h1>
            <p className="text-white/40 text-sm mt-2">Manage and personalize your website content.</p>
          </div>
          <div className="hidden lg:flex items-center gap-2 text-white/20 text-[10px] uppercase tracking-widest font-bold">
            Dashboard <ChevronRight size={10} /> {activeTab}
          </div>
        </header>

        {/* Tab Content */}
        <div className="max-w-4xl space-y-12">
          {activeTab === 'general' && (
            <div className="space-y-10">
              <Section title="Hero Section Text">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input label="Title Prefix" value={localData.hero.title} onChange={(v) => updateNestedData('hero.title', v)} />
                  <Input label="Italic Text" value={localData.hero.italic} onChange={(v) => updateNestedData('hero.italic', v)} />
                  <div className="md:col-span-2">
                    <TextArea label="Hero Description" value={localData.hero.description} onChange={(v) => updateNestedData('hero.description', v)} />
                  </div>
                </div>
              </Section>

              <Section title="Hero Media">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <MediaUpload 
                    label="Background Video" 
                    icon={Video} 
                    value={localData.hero.videoUrl} 
                    onUpload={(e) => handleImageUpload(e, 'hero.videoUrl')} 
                  />
                  <MediaUpload 
                    label="Fallback Image" 
                    icon={ImageIcon} 
                    value={localData.hero.fallbackImage} 
                    onUpload={(e) => handleImageUpload(e, 'hero.fallbackImage')} 
                  />
                </div>
              </Section>

              <Section title="About Section Media">
                <MediaUpload 
                  label="About Video" 
                  icon={Video} 
                  value={localData.about.videoUrl} 
                  onUpload={(e) => handleImageUpload(e, 'about.videoUrl')} 
                />
              </Section>

              <Section title="Footer Content">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input label="Footer Title" value={localData.footer.title} onChange={(v) => updateNestedData('footer.title', v)} />
                  <Input label="Footer Italic" value={localData.footer.italic} onChange={(v) => updateNestedData('footer.italic', v)} />
                  <Input label="Title Suffix" value={localData.footer.titleSuffix} onChange={(v) => updateNestedData('footer.titleSuffix', v)} />
                  <div className="md:col-span-2">
                    <TextArea label="Footer Description" value={localData.footer.description} onChange={(v) => updateNestedData('footer.description', v)} />
                  </div>
                </div>
              </Section>
            </div>
          )}

          {activeTab === 'services' && (
            <div className="space-y-8">
              {localData.services.map((service, index) => (
                <Section key={service.id} title={`Service Card ${index + 1}`}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input label="Tag" value={service.tag} onChange={(v) => {
                      const newServices = [...localData.services];
                      newServices[index].tag = v;
                      setLocalData({ ...localData, services: newServices });
                    }} />
                    <Input label="Title" value={service.title} onChange={(v) => {
                      const newServices = [...localData.services];
                      newServices[index].title = v;
                      setLocalData({ ...localData, services: newServices });
                    }} />
                    <div className="md:col-span-2">
                      <MediaUpload 
                        label="Card Image" 
                        icon={ImageIcon} 
                        value={service.image} 
                        onUpload={(e) => handleImageUpload(e, `services.${index}.image`)} 
                      />
                    </div>
                  </div>
                </Section>
              ))}
            </div>
          )}

          {activeTab === 'blogs' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center bg-accent/10 border border-accent/20 p-6 rounded-[2rem]">
                <div>
                  <h3 className="text-xl font-bold uppercase font-sans-condensed">Manage Blog Carousel</h3>
                  <p className="text-accent/60 text-xs uppercase tracking-widest mt-1">Updates real-time on home page</p>
                </div>
                <button 
                  onClick={() => {
                    const newBlog = { id: Date.now(), title: 'New Post', excerpt: 'Draft excerpt', image: '', date: new Date().toISOString().split('T')[0] };
                    setLocalData({ ...localData, blogs: [newBlog, ...localData.blogs] });
                  }}
                  className="bg-accent text-primary p-4 rounded-2xl flex items-center gap-2 hover:scale-105 transition-all shadow-lg shadow-accent/20"
                >
                  <Plus size={18} />
                  <span className="font-bold uppercase tracking-widest text-[10px]">Add Post</span>
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {localData.blogs.map((blog, index) => (
                  <div key={blog.id} className="glass rounded-[2rem] p-6 flex flex-col md:flex-row gap-6 items-start group relative">
                    <div className="w-full md:w-32 h-32 rounded-2xl bg-white/5 overflow-hidden relative shrink-0">
                      {blog.image ? (
                        <img src={getImageUrl(blog.image)} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white/10"><ImageIcon size={32} /></div>
                      )}
                      <input 
                        type="file" 
                        onChange={(e) => handleImageUpload(e, `blogs.${index}.image`)}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                    </div>
                    <div className="flex-1 space-y-4 w-full">
                      <div className="flex justify-between gap-4">
                        <input 
                          value={blog.title} 
                          onChange={(e) => {
                            const newBlogs = [...localData.blogs];
                            newBlogs[index].title = e.target.value;
                            setLocalData({ ...localData, blogs: newBlogs });
                          }}
                          className="bg-transparent text-xl font-bold font-sans-condensed w-full outline-none focus:text-accent transition-colors"
                        />
                        <button 
                          onClick={() => {
                            const newBlogs = localData.blogs.filter((_, i) => i !== index);
                            setLocalData({ ...localData, blogs: newBlogs });
                          }}
                          className="text-white/20 hover:text-red-400 transition-colors p-2"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <textarea 
                        value={blog.excerpt} 
                        onChange={(e) => {
                          const newBlogs = [...localData.blogs];
                          newBlogs[index].excerpt = e.target.value;
                          setLocalData({ ...localData, blogs: newBlogs });
                        }}
                        className="bg-transparent text-white/60 text-sm w-full outline-none resize-none h-20"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'seo' && (
            <div className="space-y-8">
              <Section title="Search Engine Optimization">
                <div className="space-y-6">
                  <Input 
                    label="Page Title (SEO Title)" 
                    value={localData.seo.title} 
                    onChange={(v) => updateNestedData('seo.title', v)} 
                  />
                  <TextArea 
                    label="Meta Description" 
                    value={localData.seo.description} 
                    onChange={(v) => updateNestedData('seo.description', v)} 
                  />
                  <Input 
                    label="Keywords (Comma separated)" 
                    value={localData.seo.keywords} 
                    onChange={(v) => updateNestedData('seo.keywords', v)} 
                  />
                  <MediaUpload 
                    label="Social Share Image (OG Image)" 
                    icon={ImageIcon} 
                    value={localData.seo.ogImage} 
                    onUpload={(e) => handleImageUpload(e, 'seo.ogImage')} 
                  />
                </div>
              </Section>
              
              <div className="p-6 rounded-[2rem] bg-accent/5 border border-accent/20">
                <h4 className="text-accent font-bold uppercase tracking-widest text-[10px] mb-4">Google Search Preview</h4>
                <div className="bg-white rounded-lg p-6 space-y-1">
                  <div className="text-[14px] text-[#202124] flex items-center gap-1">
                    https://ironoakpower.com <ChevronRight size={10} className="text-[#70757a]" />
                  </div>
                  <div className="text-[20px] text-[#1a0dab] font-medium hover:underline cursor-pointer leading-tight">
                    {localData.seo.title}
                  </div>
                  <div className="text-[14px] text-[#4d5156] leading-snug line-clamp-2">
                    {localData.seo.description}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

// Sub-components
function Section({ title, children }) {
  return (
    <div className="space-y-6">
      <h3 className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] flex items-center gap-3">
        <span className="w-8 h-px bg-accent/20" /> {title}
      </h3>
      <div className="glass rounded-[2rem] p-8 md:p-10 border-white/5">
        {children}
      </div>
    </div>
  );
}

function Input({ label, value, onChange }) {
  return (
    <div className="space-y-2">
      <label className="text-white/40 text-[10px] uppercase tracking-widest font-bold ml-1">{label}</label>
      <input 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white outline-none focus:border-accent/40 focus:bg-white/10 transition-all text-sm"
      />
    </div>
  );
}

function TextArea({ label, value, onChange }) {
  return (
    <div className="space-y-2">
      <label className="text-white/40 text-[10px] uppercase tracking-widest font-bold ml-1">{label}</label>
      <textarea 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white outline-none focus:border-accent/40 focus:bg-white/10 transition-all text-sm min-h-[120px]"
      />
    </div>
  );
}

function MediaUpload({ label, icon: Icon, value, onUpload }) {
  return (
    <div className="space-y-2">
      <label className="text-white/40 text-[10px] uppercase tracking-widest font-bold ml-1">{label}</label>
      <div className="relative group">
        <div className="w-full bg-white/5 border border-dashed border-white/20 rounded-2xl p-6 flex flex-col items-center justify-center text-center transition-all group-hover:border-accent/50 group-hover:bg-accent/5">
          {value ? (
            <div className="w-full space-y-4">
              <div className="text-[10px] text-white/60 truncate max-w-full font-mono bg-black/30 p-2 rounded-lg">{value}</div>
              <button className="text-accent text-[10px] font-bold uppercase tracking-widest hover:text-white transition-colors">Change File</button>
            </div>
          ) : (
            <>
              <Icon className="text-white/20 mb-3" size={32} />
              <p className="text-white/40 text-[10px] uppercase tracking-widest">Click or drag to upload</p>
            </>
          )}
        </div>
        <input 
          type="file" 
          onChange={onUpload}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
      </div>
    </div>
  );
}
