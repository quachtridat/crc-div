type Matcher<T, MatchingShape> = T extends MatchingShape ? T : never;

type ExactMatcher<T, MatchingShape> = T extends MatchingShape ? Exclude<keyof T, keyof MatchingShape> extends never ? T : never : never;

export type {Matcher, ExactMatcher};