/** Tag slug for posts machine-translated from another locale. */
export const AI_TRANSLATED_TAG = 'ai translated';

export function isAiTranslatedTag(tag: string): boolean {
  return tag === AI_TRANSLATED_TAG;
}
