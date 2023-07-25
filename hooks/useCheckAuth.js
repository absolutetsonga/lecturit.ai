import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export const useCheckAuth = () => {
    const { status } = useSession();
    const router = useRouter();

    if (status === 'unauthenticated') {
        router.push('/pages/login');
    }
};
