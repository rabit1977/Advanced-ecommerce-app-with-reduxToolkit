import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { FilterX } from 'lucide-react';

interface MobileFilterSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  activeFiltersCount: number;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
  isPending: boolean;
  children: React.ReactNode;
}

export const MobileFilterSheet = ({
  isOpen,
  onOpenChange,
  activeFiltersCount,
  hasActiveFilters,
  onClearFilters,
  isPending,
  children,
}: MobileFilterSheetProps) => {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent
        side='left'
        className='w-[85%] sm:w-[350px] p-0 flex flex-col'
      >
        <SheetHeader className='p-4 border-b dark:border-slate-800'>
          <div className='flex items-center justify-between'>
            <div className='space-y-1'>
              <SheetTitle>Filters</SheetTitle>
              <SheetDescription>Refine your product search</SheetDescription>
            </div>
            {hasActiveFilters && (
              <Badge
                variant='secondary'
                className='font-semibold grid self-end'
              >
                {activeFiltersCount}
              </Badge>
            )}
          </div>
        </SheetHeader>

        <div className='flex-1 overflow-y-auto p-4'>{children}</div>

        <div className='border-t p-4 flex gap-2'>
          <Button
            variant='outline'
            className='flex-1'
            onClick={onClearFilters}
            disabled={!hasActiveFilters || isPending}
          >
            <FilterX className='h-4 w-4 mr-2' />
            Clear
          </Button>
          <Button
            className='flex-1'
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            Apply Filters
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
