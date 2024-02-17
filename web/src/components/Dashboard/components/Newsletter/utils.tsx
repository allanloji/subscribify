const backgrounds = [
  {
    primary: "#e1f0da",
    secondary: "#d4e7c5",
  },
  {
    primary: "#f6fedb",
    secondary: "#e6d3a3",
  },
  {
    primary: "#f9e3e3",
    secondary: "#f0c3c3",
  },
  {
    primary: "#e3e3f9",
    secondary: "#c3c3f0",
  },
  {
    primary: "#e3f9f9",
    secondary: "#c3f0f0",
  },
  {
    primary: "#f9e3f9",
    secondary: "#f0c3f0",
  },
  {
    primary: "#f9f3e3",
    secondary: "#f0d3c3",
  },
  {
    primary: "#f3f9e3",
    secondary: "#d3f0c3",
  },
  {
    primary: "#f3e3f9",
    secondary: "#d3c3f0",
  },
  {
    primary: "#e3f9e3",
    secondary: "#c3f0c3",
  },
  {
    primary: "#f9f3f3",
    secondary: "#f0d3d3",
  },
  {
    primary: "#98c1d9",
    secondary: "#6e9ebf",
  },
];

export const getBackground = (id: string) => {
  const sanitizedUuid = id.replace(/-/g, "");

  const uuidNumber = parseInt(sanitizedUuid.substring(0, 8), 16);

  const index = (uuidNumber * 10) % backgrounds.length;
  console.log(id, uuidNumber, index);

  return backgrounds[index];
};
