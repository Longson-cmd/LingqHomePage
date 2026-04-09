export const useMediaUrl = () => {
  const toProxyMediaUrl = (input) => {
    if (!input || typeof input !== "string") return input;

    try {
      if (input.startsWith("/media/")) {
        return `/api${input}`;
      }

      if (input.startsWith("http://") || input.startsWith("https://")) {
        const url = new URL(input);
        if (url.pathname.startsWith("/media/")) {
          return `/api${url.pathname}${url.search}`;
        }
      }
    } catch {
      return input;
    }

    return input;
  };

  return { toProxyMediaUrl };
};
