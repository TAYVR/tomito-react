import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Search, Film, Tv, Menu, X, ChevronDown, Home } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const movieCategories = [
  { id: 28, name: "أكشن", icon: "💥" },
  { id: 35, name: "كوميديا", icon: "😂" },
  { id: 18, name: "دراما", icon: "🎭" },
  { id: 27, name: "رعب", icon: "👻" },
  { id: 10749, name: "رومانسي", icon: "❤️" },
  { id: 878, name: "خيال علمي", icon: "🚀" },
];

const tvCategories = [
  { id: 10759, name: "أكشن ومغامرات", icon: "⚔️" },
  { id: 35, name: "كوميديا", icon: "😂" },
  { id: 18, name: "دراما", icon: "🎭" },
  { id: 10765, name: "خيال علمي", icon: "🛸" },
  { id: 80, name: "جريمة", icon: "🔍" },
  { id: 10751, name: "عائلي", icon: "👨‍👩‍👧‍👦" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsSearchOpen(false);
    }
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "navbar-solid shadow-lg" : "navbar-blur"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Film className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-gradient hidden sm:block">Tomito</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            <Link
              to="/"
              className={cn(
                "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary",
                location.pathname === "/" ? "text-primary" : "text-foreground"
              )}
            >
              <Home className="w-4 h-4" />
              الرئيسية
            </Link>

            {/* Movies Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("movies")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary">
                <Film className="w-4 h-4" />
                الأفلام
                <ChevronDown className={cn("w-4 h-4 transition-transform", activeDropdown === "movies" && "rotate-180")} />
              </button>
              {activeDropdown === "movies" && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-card border border-border rounded-lg shadow-xl animate-fade-in p-4">
                  <div className="grid grid-cols-2 gap-2">
                    {movieCategories.map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/category/movie/${cat.id}`}
                        className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent transition-colors text-sm"
                      >
                        <span>{cat.icon}</span>
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                  <div className="mt-3 pt-3 border-t border-border">
                    <Link
                      to="/category/movie/all"
                      className="block text-center text-sm text-primary hover:underline"
                    >
                      جميع الأفلام
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* TV Shows Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("tv")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary">
                <Tv className="w-4 h-4" />
                المسلسلات
                <ChevronDown className={cn("w-4 h-4 transition-transform", activeDropdown === "tv" && "rotate-180")} />
              </button>
              {activeDropdown === "tv" && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-card border border-border rounded-lg shadow-xl animate-fade-in p-4">
                  <div className="grid grid-cols-2 gap-2">
                    {tvCategories.map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/category/tv/${cat.id}`}
                        className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent transition-colors text-sm"
                      >
                        <span>{cat.icon}</span>
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                  <div className="mt-3 pt-3 border-t border-border">
                    <Link
                      to="/category/tv/all"
                      className="block text-center text-sm text-primary hover:underline"
                    >
                      جميع المسلسلات
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Search & Mobile Menu */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <form onSubmit={handleSearch} className="relative">
              <div
                className={cn(
                  "flex items-center transition-all duration-300 overflow-hidden",
                  isSearchOpen ? "w-64" : "w-10"
                )}
              >
                <Input
                  type="text"
                  placeholder="ابحث عن فيلم أو مسلسل..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={cn(
                    "bg-secondary/50 border-border h-10 pr-10 transition-all",
                    isSearchOpen ? "opacity-100" : "opacity-0 w-0"
                  )}
                />
                <Button
                  type={isSearchOpen && searchQuery ? "submit" : "button"}
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 h-10 w-10"
                  onClick={() => !isSearchOpen && setIsSearchOpen(true)}
                >
                  <Search className="w-5 h-5" />
                </Button>
              </div>
              {isSearchOpen && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute left-0 h-10 w-10"
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchQuery("");
                  }}
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </form>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-card border-t border-border animate-slide-down">
            <div className="py-4 space-y-4">
              <Link
                to="/"
                className="flex items-center gap-3 px-4 py-2 hover:bg-accent rounded-lg transition-colors"
              >
                <Home className="w-5 h-5" />
                الرئيسية
              </Link>

              {/* Mobile Movies */}
              <div className="px-4">
                <button
                  className="flex items-center justify-between w-full py-2 font-medium"
                  onClick={() => setActiveDropdown(activeDropdown === "movies-mobile" ? null : "movies-mobile")}
                >
                  <span className="flex items-center gap-3">
                    <Film className="w-5 h-5" />
                    الأفلام
                  </span>
                  <ChevronDown
                    className={cn("w-4 h-4 transition-transform", activeDropdown === "movies-mobile" && "rotate-180")}
                  />
                </button>
                {activeDropdown === "movies-mobile" && (
                  <div className="mt-2 mr-8 space-y-1">
                    {movieCategories.map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/category/movie/${cat.id}`}
                        className="flex items-center gap-2 py-2 text-sm text-muted-foreground hover:text-foreground"
                      >
                        <span>{cat.icon}</span>
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile TV */}
              <div className="px-4">
                <button
                  className="flex items-center justify-between w-full py-2 font-medium"
                  onClick={() => setActiveDropdown(activeDropdown === "tv-mobile" ? null : "tv-mobile")}
                >
                  <span className="flex items-center gap-3">
                    <Tv className="w-5 h-5" />
                    المسلسلات
                  </span>
                  <ChevronDown
                    className={cn("w-4 h-4 transition-transform", activeDropdown === "tv-mobile" && "rotate-180")}
                  />
                </button>
                {activeDropdown === "tv-mobile" && (
                  <div className="mt-2 mr-8 space-y-1">
                    {tvCategories.map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/category/tv/${cat.id}`}
                        className="flex items-center gap-2 py-2 text-sm text-muted-foreground hover:text-foreground"
                      >
                        <span>{cat.icon}</span>
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
