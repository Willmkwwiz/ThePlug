import { CATEGORIES, type ListingCategory } from '@/lib/constants';
import { inputClassName } from '@/lib/styles';

interface ListingFiltersProps {
  category: ListingCategory | '';
  area: string;
  areas: string[];
  onCategoryChange: (value: ListingCategory | '') => void;
  onAreaChange: (value: string) => void;
}

export default function ListingFilters({
  category,
  area,
  areas,
  onCategoryChange,
  onAreaChange,
}: ListingFiltersProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="space-y-1.5">
        <label htmlFor="filter-category" className="block text-sm font-semibold text-stone-700">
          Category
        </label>
        <select
          id="filter-category"
          value={category}
          onChange={(event) => onCategoryChange(event.target.value as ListingCategory | '')}
          className={inputClassName}
        >
          <option value="">All categories</option>
          {CATEGORIES.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="filter-area" className="block text-sm font-semibold text-stone-700">
          Lilongwe area
        </label>
        <select
          id="filter-area"
          value={area}
          onChange={(event) => onAreaChange(event.target.value)}
          className={inputClassName}
        >
          <option value="">All areas</option>
          {areas.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
