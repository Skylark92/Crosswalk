async function fetchWithTimeout(resource, options = {}) {
  const { timeout = 5000, ...rest } = options;
  const controller = new AbortController();
  const { signal } = controller;

  // const timeoutId = setTimeout(() => controller.abort(), timeout);

  return fetch(resource, { ...rest, signal })
    .catch(error => {
      if (error.name === "AbortError") {
        console.error("타임 아웃!\n\n", error);
      } else {
        throw error;
      }
    });
}

export { fetchWithTimeout };