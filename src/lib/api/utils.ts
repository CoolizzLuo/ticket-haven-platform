// import { getServerSession } from 'next-auth';
// import { getSession } from 'next-auth/react';

export const parseData = (response: Response) => {
  const contentType = response.headers.get('Content-Type') ?? '';

  if (contentType.includes('application/json')) {
    return response.json();
  }

  if (contentType.includes('application/octet-stream')) {
    return response.arrayBuffer();
  }

  return response.text();
};

export const processResponse = async <T>(response: Response) => {
  try {
    const data = await parseData(response);

    console.log('Data:', data);
    return data as T;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// export const getSessionToken = async (requireAuth: boolean) => {
//   let token;
//   if (requireAuth) {
//     const isServerSide = typeof window === 'undefined';
//     const session = isServerSide ? await getServerSession() : await getSession();
//     if (!session) {
//       throw new Error('Unauthorized');
//     }
//     token = session.user;
//   }
//   return token;
// };
