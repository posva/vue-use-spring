export function isTouchEvent(e: Event): e is TouchEvent {
  return e.type === 'touchstart' || e.type === 'touchmove'
}
