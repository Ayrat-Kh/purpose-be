export type Login =
  | {
      type: 'linkedin';
    }
  | {
      type: 'google';
    }
  | {
      type: 'facebook';
    };
