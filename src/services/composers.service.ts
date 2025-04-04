import { normalizeString } from "../utils/normalizeString.util";
import { Track } from "../interfaces/track.interface";

/**
 * List of composer names to exclude from splitting.
 */
const exclusions = ["ac/dc"];

/**
 * Splits a composer string into an array of composers.
 */
const splitComposers = (composerString: string): string[] => {
  const normalizedComposer = normalizeString(composerString);

  if (exclusions.some((excl) => normalizedComposer.includes(excl))) {
    return [composerString.trim()];
  }

  const preprocessed = composerString.replace(/ and /gi, ",").replace(/ - /gi, ",");

  return (
    preprocessed
      // split on ",", "/", "&" and "-"
      .split(/[,/&]/)
      .map((composer) => composer.trim())
      .filter((composer) => composer.length > 0)
  );
};

/**
 * Returns a map of unique composers from the given tracks.
 */
export const getUniqueComposersFromTracks = (tracks: Track[]): Map<string, string> =>
  tracks
    .flatMap((track) =>
      splitComposers(track.Composer).map((composer) => ({ k: normalizeString(composer), v: composer })),
    )
    .reduce((acc, item) => acc.set(item.k, item.v), new Map<string, string>());
