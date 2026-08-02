import { init, id } from '@instantdb/react';

// Demo InstantDB App ID (replace with your dashboard ID from instantdb.com)
export const APP_ID = '468b6f4f-b0e3-48d1-b0de-4f72d47fdacc';

export const db = init({ appId: APP_ID });
export { id };