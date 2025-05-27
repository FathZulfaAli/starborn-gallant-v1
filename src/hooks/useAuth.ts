import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export function useAuth() {
  return useMutation({
    mutationFn: async (address: string) => {
      if (!address) throw new Error('Wallet not connected');
      try {
        const response = await axios.post(
          process.env.GET_REWARD_API || 'https://sb-server.vercel.app/api/auth',
          {
            wallet: address,
          },
        );

        if (response.data.action === 'login') {
          return response.data.userData;
        } else return response.data.message;
      } catch (error: any) {
        console.error('Error in userRegister:', error);
        return 'Failed to register user';
      }
    },
  });
}
