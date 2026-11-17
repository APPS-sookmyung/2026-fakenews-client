const defaults = { reactions: true, comments: true, simulation: true, visibility: '전체 공개' }

export function loadPreferences() {
  try { const value = JSON.parse(localStorage.getItem('fakenews-preferences')); return { ...defaults, ...value } } catch { return { ...defaults } }
}
