export const Routes = {
  HOME: 'homeScreen',
  CHECKLIST: 'checklistScreen',
  LOGIN: "/login"
} as const

export type RouteName = typeof Routes[keyof typeof Routes]
