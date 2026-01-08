export type QuestionType =
  | "single-choice"
  | "multi-choice"
  | "text"
  | "slider"
  | "artist-chips";

export type QuestionOption = {
  id: string;
  label: string;
  description?: string;
  genres?: string[]; // For artist options - which genres they belong to
};

export type Question = {
  id: string;
  type: QuestionType;
  title: string;
  description?: string;
  options?: QuestionOption[];
  placeholder?: string;
  min?: number;
  max?: number;
  limit?: number;
  step?: number;
  dependsOn?: string; // ID of question this depends on for filtering
};

export const QUESTIONNAIRE_QUESTIONS: Question[] = [
  // TODO: useful question for future?
  //   {
  //     id: "project-type",
  //     type: "single-choice",
  //     title: "What type of project are you working on?",
  //     description: "This helps us understand your creative context",
  //     options: [
  //       { id: "short-film", label: "Short Film", description: "2-30 minutes" },
  //       { id: "feature", label: "Feature Film", description: "60+ minutes" },
  //       {
  //         id: "commercial",
  //         label: "Commercial/Ad",
  //         description: "15-90 seconds",
  //       },
  //       { id: "social", label: "Social Media", description: "Quick cuts" },
  //       { id: "documentary", label: "Documentary", description: "Real stories" },
  //       {
  //         id: "music-video",
  //         label: "Music Video",
  //         description: "Visual storytelling",
  //       },
  //     ],
  //   },
  {
    id: "mood",
    type: "multi-choice",
    title: "What's the vibe of your video?",
    description: "Select up to 3 that apply",
    options: [
      { id: "uplifting", label: "Uplifting" },
      { id: "dramatic", label: "Dramatic" },
      { id: "energetic", label: "Energetic" },
      { id: "calm", label: "Calm" },
      { id: "suspenseful", label: "Suspenseful" },
      { id: "romantic", label: "Romantic" },
      { id: "playful", label: "Playful" },
      { id: "melancholic", label: "Melancholic" },
      { id: "inspiring", label: "Inspiring" },
      { id: "whimsical", label: "Whimsical" },
    ],
    limit: 3,
  },
  {
    id: "pacing",
    type: "single-choice",
    title: "How would you describe your edit's pacing?",
    options: [
      {
        id: "slow",
        label: "Slow & Contemplative",
        description: "Lingering shots",
      },
      {
        id: "medium",
        label: "Steady & Balanced",
        description: "Natural rhythm",
      },
      { id: "fast", label: "Fast & Dynamic", description: "Quick cuts" },
      { id: "varied", label: "Varied", description: "Mix of tempos" },
    ],
  },
  {
    id: "genre-preference",
    type: "multi-choice",
    title: "What music genres interest you?",
    description: "Select up to 2",
    options: [
      { id: "pop", label: "Pop" },
      { id: "rock", label: "Rock" },
      { id: "hiphop", label: "Hip-Hop" },
      { id: "r&b", label: "R&B" },
      { id: "indie", label: "Indie/Folk" },
      { id: "house", label: "House" },
      { id: "jazz", label: "Jazz" },
      { id: "classical", label: "Classical" },
      { id: "experimental", label: "Experimental" },
      { id: "country", label: "Country" },
      { id: "folk", label: "Folk" },
      { id: "ambient", label: "Ambient" },
    ],
    limit: 2,
  },
  {
    id: "artist-inspiration",
    type: "artist-chips",
    title: "Any artists inspire you?",
    description: "Select artists whose style resonates with your vision",
    dependsOn: "genre-preference",
    options: [
      // Pop
      { id: "taylor-swift", label: "Taylor Swift", genres: ["pop"] },
      { id: "the-weeknd", label: "The Weeknd", genres: ["pop", "r&b"] },
      { id: "dua-lipa", label: "Dua Lipa", genres: ["pop", "house"] },
      {
        id: "billie-eilish",
        label: "Billie Eilish",
        genres: ["pop", "experimental"],
      },

      // Rock
      {
        id: "arctic-monkeys",
        label: "Arctic Monkeys",
        genres: ["rock", "indie"],
      },
      { id: "foo-fighters", label: "Foo Fighters", genres: ["rock"] },
      {
        id: "tame-impala",
        label: "Tame Impala",
        genres: ["rock", "indie", "experimental"],
      },

      // Hip-Hop
      { id: "kendrick-lamar", label: "Kendrick Lamar", genres: ["hiphop"] },
      {
        id: "tyler-the-creator",
        label: "Tyler, The Creator",
        genres: ["hiphop", "experimental"],
      },
      {
        id: "frank-ocean",
        label: "Frank Ocean",
        genres: ["hiphop", "r&b", "experimental"],
      },

      // R&B
      { id: "sza", label: "SZA", genres: ["r&b"] },
      { id: "daniel-caesar", label: "Daniel Caesar", genres: ["r&b"] },
      { id: "jhene-aiko", label: "Jhené Aiko", genres: ["r&b"] },

      // Indie/Folk
      {
        id: "bon-iver",
        label: "Bon Iver",
        genres: ["indie", "folk", "experimental"],
      },
      {
        id: "phoebe-bridgers",
        label: "Phoebe Bridgers",
        genres: ["indie", "folk"],
      },
      {
        id: "sufjan-stevens",
        label: "Sufjan Stevens",
        genres: ["indie", "folk"],
      },
      { id: "fleet-foxes", label: "Fleet Foxes", genres: ["indie", "folk"] },

      // House
      { id: "disclosure", label: "Disclosure", genres: ["house"] },
      { id: "kaytranada", label: "KAYTRANADA", genres: ["house", "hiphop"] },
      {
        id: "fred-again",
        label: "Fred again..",
        genres: ["house", "experimental"],
      },

      // Jazz
      {
        id: "robert-glasper",
        label: "Robert Glasper",
        genres: ["jazz", "hiphop"],
      },
      { id: "kamasi-washington", label: "Kamasi Washington", genres: ["jazz"] },
      {
        id: "esperanza-spalding",
        label: "Esperanza Spalding",
        genres: ["jazz"],
      },

      // Classical
      {
        id: "max-richter",
        label: "Max Richter",
        genres: ["classical", "ambient"],
      },
      {
        id: "olafur-arnalds",
        label: "Ólafur Arnalds",
        genres: ["classical", "ambient"],
      },
      {
        id: "ludovico-einaudi",
        label: "Ludovico Einaudi",
        genres: ["classical"],
      },

      // Experimental
      { id: "bjork", label: "Björk", genres: ["experimental"] },
      { id: "arca", label: "Arca", genres: ["experimental"] },
      { id: "fka-twigs", label: "FKA twigs", genres: ["experimental", "r&b"] },

      // Country
      {
        id: "kacey-musgraves",
        label: "Kacey Musgraves",
        genres: ["country", "pop"],
      },
      {
        id: "chris-stapleton",
        label: "Chris Stapleton",
        genres: ["country", "rock"],
      },

      // Ambient
      {
        id: "brian-eno",
        label: "Brian Eno",
        genres: ["ambient", "experimental"],
      },
      { id: "jon-hopkins", label: "Jon Hopkins", genres: ["ambient", "house"] },
      {
        id: "nils-frahm",
        label: "Nils Frahm",
        genres: ["ambient", "classical"],
      },
    ],
    limit: 5,
  },
  //   {
  //     id: "additional-notes",
  //     type: "text",
  //     title: "Any additional context?",
  //     description: "Tell us more about your vision (optional)",
  //     placeholder:
  //       "e.g., 'Looking for something that feels like a Wes Anderson film...'",
  //   },
];
