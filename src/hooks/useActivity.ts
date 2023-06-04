import useSWR from 'swr';

interface Event {
  id: string;
  startTime: string;
  endTime: string;
  sellStartTime: string;
  sellEndTime: string;
}

interface Activity {
  id: string;
  coverImageUrl: string;
  name: string;
  startTime: string;
  endTime: string;
  location: string;
  address: string;
  content: string;
  notice: string;
  seatMapUrl: string;
  importantNotice: string;
  events: Event[];
}

const useActivity = (id?: string) => {
  const { data, ...props } = useSWR<Activity>(id && `activities/${id}`);
  return { activity: data, ...props };
};

export default useActivity;
