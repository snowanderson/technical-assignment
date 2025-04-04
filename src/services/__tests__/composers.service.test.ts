import { getUniqueComposersFromTracks } from "../composers.service";
import { Track } from "../../interfaces/track.interface";

describe("composers.service", () => {
  describe("getUniqueComposersFromTracks", () => {
    it("devrait extraire les compositeurs uniques des pistes", () => {
      const tracks: Track[] = [
        {
          TrackId: 1,
          Name: "Track 1",
          AlbumId: 1,
          MediaTypeId: 1,
          GenreId: 1,
          Composer: "Mozart",
          Milliseconds: 100000,
          Bytes: 1000,
          UnitPrice: 0.99,
        },
        {
          TrackId: 2,
          Name: "Track 2",
          AlbumId: 1,
          MediaTypeId: 1,
          GenreId: 1,
          Composer: "Bach",
          Milliseconds: 120000,
          Bytes: 1200,
          UnitPrice: 0.99,
        },
        {
          TrackId: 3,
          Name: "Track 3",
          AlbumId: 2,
          MediaTypeId: 1,
          GenreId: 1,
          Composer: "Mozart",
          Milliseconds: 90000,
          Bytes: 900,
          UnitPrice: 0.99,
        },
      ];

      const composers = getUniqueComposersFromTracks(tracks);

      expect(composers.size).toBe(2);
      expect(composers.get("mozart")).toBe("Mozart");
      expect(composers.get("bach")).toBe("Bach");
    });

    it("devrait diviser les compositeurs multiples séparés par des virgules", () => {
      const tracks: Track[] = [
        {
          TrackId: 1,
          Name: "Track 1",
          AlbumId: 1,
          MediaTypeId: 1,
          GenreId: 1,
          Composer: "Mozart, Beethoven",
          Milliseconds: 100000,
          Bytes: 1000,
          UnitPrice: 0.99,
        },
      ];

      const composers = getUniqueComposersFromTracks(tracks);

      expect(composers.size).toBe(2);
      expect(composers.get("mozart")).toBe("Mozart");
      expect(composers.get("beethoven")).toBe("Beethoven");
    });

    it('devrait gérer les cas avec "and" en les convertissant en virgules', () => {
      const tracks: Track[] = [
        {
          TrackId: 1,
          Name: "Track 1",
          AlbumId: 1,
          MediaTypeId: 1,
          GenreId: 1,
          Composer: "Mozart and Beethoven",
          Milliseconds: 100000,
          Bytes: 1000,
          UnitPrice: 0.99,
        },
      ];

      const composers = getUniqueComposersFromTracks(tracks);

      expect(composers.size).toBe(2);
      expect(composers.get("mozart")).toBe("Mozart");
      expect(composers.get("beethoven")).toBe("Beethoven");
    });

    it("ne devrait pas diviser les compositeurs dans la liste d'exclusions", () => {
      const tracks: Track[] = [
        {
          TrackId: 1,
          Name: "Track 1",
          AlbumId: 1,
          MediaTypeId: 1,
          GenreId: 1,
          Composer: "AC/DC",
          Milliseconds: 100000,
          Bytes: 1000,
          UnitPrice: 0.99,
        },
      ];

      const composers = getUniqueComposersFromTracks(tracks);

      expect(composers.size).toBe(1);
      expect(composers.get("ac/dc")).toBe("AC/DC");
    });
  });
});
