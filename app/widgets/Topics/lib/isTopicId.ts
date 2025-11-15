import type { TopicId } from '@/widgets/Topics';

import { topics } from '@/widgets/Topics';

export const isTopicId = (value: string): value is TopicId => {
  return topics.some((t) => t.id === value);
};
