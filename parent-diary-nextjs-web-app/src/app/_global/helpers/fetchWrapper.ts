
/**
 * Fetch data from the server
 * @param url - The URL to fetch the data from
 * @param options - The options for the fetch request
 * @returns The data from the server
 */
export async function fetchWrapper<T>(
  url: string,
  options: RequestInit
): Promise<{ data: T | null; error: { message: string } | null }> {
  try {
    const response = await fetch(url, options);
    const json = await response.json();
    if (json.error) {
      console.warn(json.message);
    }
    return json as typeof json & { data: T };
  } catch (error) {
    return {
      data: null,
      error: {
        message: "Failed to fetch data, check your internet connection",
      },
    };
  }
}
