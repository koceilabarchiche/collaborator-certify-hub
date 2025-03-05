
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";

interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearch?: (value: string) => void;
  className?: string;
  placeholder?: string;
}

export function SearchBar({
  onSearch,
  className,
  placeholder = "Rechercher...",
  ...props
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const searchTimeout = useRef<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (value: string) => {
    setQuery(value);
    
    if (searchTimeout.current) {
      window.clearTimeout(searchTimeout.current);
    }
    
    searchTimeout.current = window.setTimeout(() => {
      if (onSearch) {
        onSearch(value);
      }
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (searchTimeout.current) {
        window.clearTimeout(searchTimeout.current);
      }
    };
  }, []);

  return (
    <div 
      className={cn(
        "relative transition-all duration-200 ease-in-out group",
        isFocused ? "ring-2 ring-primary/20 rounded-full" : "",
        className
      )}
    >
      <Search 
        className={cn(
          "absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-colors duration-200",
          isFocused ? "text-primary" : "text-muted-foreground"
        )} 
      />
      <Input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={cn(
          "pl-10 h-10 bg-background border border-input rounded-full transition-all",
          "focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-primary/50",
          isFocused ? "shadow-sm" : ""
        )}
        {...props}
      />
      {query && (
        <button
          type="button"
          className="absolute right-3.5 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
          onClick={() => {
            setQuery("");
            if (onSearch) onSearch("");
            inputRef.current?.focus();
          }}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
