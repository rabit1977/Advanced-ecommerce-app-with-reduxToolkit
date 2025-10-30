import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CategoryFilterProps } from '@/lib/types/filter';
import { cn } from '@/lib/utils';
import { useMemo } from 'react';

/**
 * Format category label for display
 */
const formatCategoryLabel = (category: string): string => {
  if (category === 'all') return 'All Categories';

  // Capitalize first letter of each word
  return category
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * CategoryFilter - Filterable category list with active count badge
 *
 * Features:
 * - Shows active filter count (excludes "all" category)
 * - Disabled state during pending operations
 * - Accessible button group with ARIA labels
 * - Visual feedback for active category
 */
export const CategoryFilter = ({
  categories,
  currentCategory,
  onCategoryChange,
  isPending,
  showFilterCount = true,
}: CategoryFilterProps) => {
  // Calculate active filter count (only when a specific category is selected)
  const activeFilterCount = useMemo(() => {
    console.log(
      'Current category:',
      JSON.stringify(currentCategory),
      'Type:',
      typeof currentCategory,
      'Length:',
      currentCategory?.length
    );

    // Don't count if "all" is selected or empty string
    if (
      currentCategory === 'all' ||
      currentCategory === '' ||
      currentCategory === null ||
      currentCategory === undefined
    ) {
      return 0;
    }

    return 1;
  }, [currentCategory]);

  // Should show the filter count badge (only when there are active filters)
  const shouldShowBadge = showFilterCount && activeFilterCount > 0;

  return (
    <AccordionItem value='category'>
      <AccordionTrigger
        className={cn(
          'text-lg font-medium hover:no-underline',
          isPending && 'opacity-50 cursor-not-allowed'
        )}
        disabled={isPending}
      >
        <div className='flex items-center gap-2'>
          <span>Category</span>
          {shouldShowBadge && (
            <Badge
              variant='default'
              className='h-5 px-1.5 text-xs'
              aria-label={`${activeFilterCount} filter applied`}
            >
              {activeFilterCount}
            </Badge>
          )}
        </div>
      </AccordionTrigger>

      <AccordionContent>
        <div
          className='grid grid-cols-1 gap-1.5 pt-2'
          role='group'
          aria-label='Category filters'
        >
          {categories.map((category) => {
            const isActive = currentCategory === category;
            const label = formatCategoryLabel(category);

            return (
              <Button
                key={category}
                variant={isActive ? 'default' : 'ghost'}
                onClick={() => onCategoryChange(category)}
                className={cn(
                  'justify-start font-normal transition-all',
                  isActive && 'font-medium shadow-sm',
                  isPending && 'cursor-not-allowed'
                )}
                aria-pressed={isActive}
                aria-label={`Filter by ${label}`}
                disabled={isPending}
              >
                {label}
              </Button>
            );
          })}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};
