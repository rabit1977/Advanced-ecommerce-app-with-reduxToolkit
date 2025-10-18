import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CategoryFilterProps } from '@/lib/types/filter';
import { cn } from '@/lib/utils';

export const CategoryFilter = ({
  categories,
  currentCategory,
  onCategoryChange,
  isPending,
  showFilterCount,
}: CategoryFilterProps) => {
  return (
    <AccordionItem value='category'>
      <AccordionTrigger
        className={cn(
          'text-lg font-medium hover:no-underline',
          isPending && 'opacity-50'
        )}
      >
        <div className='flex items-center gap-2'>
          <span>Category</span>
          {currentCategory !== 'all' && showFilterCount && (
            <Badge variant='default' className='h-5 px-1.5 text-xs'>
              1
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
            const label = category === 'all' ? 'All Categories' : category;

            return (
              <Button
                key={category}
                variant={isActive ? 'default' : 'ghost'}
                onClick={() => onCategoryChange(category)}
                className={cn(
                  'justify-start font-normal transition-all',
                  isActive && 'font-medium shadow-sm'
                )}
                aria-pressed={isActive}
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