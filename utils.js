export function getUrlParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    story: params.get('story') || 'hotel_room',
    tone: params.get('tone') || 'steamy'
  };
}