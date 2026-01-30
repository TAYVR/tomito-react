import { Link } from "react-router-dom";
import { Film, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Film className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold text-gradient">Tomito</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              شاهد أحدث الأفلام والمسلسلات مترجمة بجودة عالية HD مجاناً
            </p>
            <div className="flex gap-3">
              <a href="#" className="p-2 rounded-full bg-secondary hover:bg-primary transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-secondary hover:bg-primary transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-secondary hover:bg-primary transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-secondary hover:bg-primary transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Movies Links */}
          <div>
            <h4 className="font-bold mb-4">الأفلام</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/category/movie/28" className="hover:text-primary transition-colors">أفلام أكشن</Link></li>
              <li><Link to="/category/movie/35" className="hover:text-primary transition-colors">أفلام كوميديا</Link></li>
              <li><Link to="/category/movie/18" className="hover:text-primary transition-colors">أفلام دراما</Link></li>
              <li><Link to="/category/movie/27" className="hover:text-primary transition-colors">أفلام رعب</Link></li>
              <li><Link to="/category/movie/all" className="hover:text-primary transition-colors">جميع الأفلام</Link></li>
            </ul>
          </div>

          {/* TV Shows Links */}
          <div>
            <h4 className="font-bold mb-4">المسلسلات</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/category/tv/18" className="hover:text-primary transition-colors">مسلسلات دراما</Link></li>
              <li><Link to="/category/tv/10759" className="hover:text-primary transition-colors">مسلسلات أكشن</Link></li>
              <li><Link to="/category/tv/35" className="hover:text-primary transition-colors">مسلسلات كوميديا</Link></li>
              <li><Link to="/category/tv/80" className="hover:text-primary transition-colors">مسلسلات جريمة</Link></li>
              <li><Link to="/category/tv/all" className="hover:text-primary transition-colors">جميع المسلسلات</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">روابط سريعة</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-primary transition-colors">الرئيسية</Link></li>
              <li><Link to="/search" className="hover:text-primary transition-colors">البحث</Link></li>
              <li><a href="#" className="hover:text-primary transition-colors">من نحن</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">اتصل بنا</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">سياسة الخصوصية</a></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>جميع الحقوق محفوظة © {new Date().getFullYear()} Tomito</p>
          <p className="mt-2">هذا الموقع لا يستضيف أي محتوى على سيرفراته</p>
        </div>
      </div>
    </footer>
  );
}
