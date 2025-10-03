'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAppDispatch } from '@/lib/hooks/useAppDispatch';
import { deleteUserFromAdmin } from '@/lib/store/thunks/authThunks';
import { User } from '@/lib/types';
import { MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import { useState, useTransition } from 'react';

import { toast } from 'sonner';

interface UsersDataTableProps {
  users: User[];
}

export const UsersDataTable = ({ users }: UsersDataTableProps) => {
  const [isPending, startTransition] = useTransition();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const dispatch = useAppDispatch();

  const handleDeleteClick = (user: User) => {
    setUserToDelete(user);
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    if (!userToDelete) return;

    startTransition(() => {
      dispatch(deleteUserFromAdmin(userToDelete.id));
      toast.success(`User "${userToDelete.name}" deleted.`);
      setShowDeleteDialog(false);
      setUserToDelete(null);
    });
  };

  return (
    <>
      <div className='rounded-lg divide-y border bg-white dark:bg-slate-900 dark:border-slate-800 overflow-hidden shadow-sm '>
        <Table>
          <TableHeader className='bg-slate-50 dark:bg-slate-800'>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>
                <span className='sr-only'>Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className='font-medium'>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role || 'customer'}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup='true' size='icon' variant='ghost'>
                        <MoreHorizontal className='h-4 w-4' />
                        <span className='sr-only'>Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/users/${user.id}`}>
                          View Details
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/users/${user.id}/edit`}>Edit</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className='text-red-500'
                        onSelect={() => handleDeleteClick(user)}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              user
              <span className='font-semibold text-red-300'> {userToDelete?.name.toUpperCase()}</span>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              disabled={isPending}
            >
              {isPending ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
