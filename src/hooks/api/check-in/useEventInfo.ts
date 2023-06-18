import useSWR from 'swr';

export interface EventInfo {
  eventId: string;
  activityName: string;
  coverImgUrl: string;
  startTime: string;
  endTime: string;
  location: string;
  address: string;
}

export const useEventInfo = (authId: string) => {
  const { data, ...props } = useSWR<EventInfo>(authId && [`/check-in/event`, { authId }]);
  return { event: data, ...props };
};
