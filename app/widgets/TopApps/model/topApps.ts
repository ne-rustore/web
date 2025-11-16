import type { TopicId } from '@/widgets/Topics';

export interface App {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly rating: number;
  readonly badge?: string;
  readonly image: string;
  readonly categories: readonly TopicId[];
}
