export interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
}

export const team: TeamMember[] = [
  {
    name: "Aaron Cervantes",
    role: "Founder - Realtor",
    image:
      "https://vibe.filesafe.space/1781750305487395093/attachments/bdcd5cd0-3bb2-4348-b853-264cfdc31428.jpg",
    bio: "Since the age of 19, Aaron has specialized in helping buyers and sellers across Southern California with expert guidance and exceptional results.",
  },
  {
    name: "Christian Wauran",
    role: "Associate realtor",
    image:
      "https://vibe.filesafe.space/1781750305487395093/attachments/05c9c914-ed01-49ac-b0ca-dbd562a2d0a9.png",
    bio: "With years in real estate experience, Christian leads with integrity and an unmatched understanding of the global market.",
  },
  {
    name: "B- Edits",
    role: "Content manager",
    image:
      "https://vibe.filesafe.space/1781750305487395093/attachments/c6ac4915-b374-4994-b43b-7b6c75b5c6e4.png",
    bio: "Brandon creates high-impact real estate content that showcases every home at its absolute best, helping listings attract more attention and qualified buyers.",
  },
];
