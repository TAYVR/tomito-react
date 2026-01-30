import { Link } from "react-router-dom";
import { Star, Play } from "lucide-react";
import { getImageUrl, Movie, TVShow } from "@/lib/tmdb";
import { cn } from "@/lib/utils";

interface MovieCardProps {
  item: Movie | TVShow;
  type: "movie" | "tv";
  className?: string;
}

export function MovieCard({ item, type, className }: MovieCardProps) {
  const title = "title" in item ? item.title : item.name;
  const releaseDate = "release_date" in item ? item.release_date : item.first_air_date;
  const year = releaseDate ? new Date(releaseDate).getFullYear() : "";
  const rating = item.vote_average?.toFixed(1) || "N/A";
  const link = type === "movie" ? `/watch/${item.id}` : `/watch-tv/${item.id}`;

  return (
    <Link to={link} className={cn("movie-card group block", className)}>
      <div className="relative aspect-[2/3] overflow-hidden rounded-lg bg-muted">
        {/* Poster Image */}
        <img
          src={getImageUrl(item.poster_path, "w500")}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Rating Badge */}
        <div className="absolute top-2 right-2 rating-badge">
          <Star className="w-3 h-3 fill-current" />
          {rating}
        </div>

        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300 shadow-lg">
            <Play className="w-6 h-6 text-primary-foreground fill-current mr-[-2px]" />
          </div>
        </div>

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="text-sm font-bold text-white line-clamp-2 mb-1">{title}</h3>
          <p className="text-xs text-gray-300">{year}</p>
        </div>
      </div>

      {/* Title Below (visible by default on mobile) */}
      <div className="mt-2 lg:hidden">
        <h3 className="text-sm font-medium line-clamp-1">{title}</h3>
        <p className="text-xs text-muted-foreground">{year}</p>
      </div>
    </Link>
  );
}

// Skeleton for loading state
export function MovieCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[2/3] bg-muted rounded-lg" />
      <div className="mt-2 space-y-1">
        <div className="h-4 bg-muted rounded w-3/4" />
        <div className="h-3 bg-muted rounded w-1/2" />
      </div>
    </div>
  );
}
