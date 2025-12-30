export type Result =
    | { successful: true }
    | { successful: false; error: string };
