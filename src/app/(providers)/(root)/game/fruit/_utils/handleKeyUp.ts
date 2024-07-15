interface HandleKeyUpParams {
  event: KeyboardEvent;
  intervalRef: React.MutableRefObject<NodeJS.Timeout | null>;
}

export const handleKeyUp = ({ event, intervalRef }: HandleKeyUpParams) => {
  if (event.code === 'KeyA' || event.code === 'ArrowLeft' || event.code === 'KeyD' || event.code === 'ArrowRight') {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }
};
