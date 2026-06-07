export const social = [
  { url: "mailto:nghiadu03@gmail.com", name: "mail" },
  { url: "https://github.com/NghiaDinh03", name: "github" },
] as const satisfies { url: string; name: "mail" | "github" | "instagram" | "linkedin" | "x" }[];
