export const UserEvents = {
  USER_ONBOARDED: 'user.onboarded',
} as const;

export class OnboardedUserEvent {
  constructor(private readonly userId: string) {}
}
