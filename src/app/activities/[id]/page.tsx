'use client';

import { useParams } from 'next/navigation';

const Activitie = () => {
  const params = useParams();
  const { id } = params;
  return <div>detail page: {id}</div>;
};

export default Activitie;
