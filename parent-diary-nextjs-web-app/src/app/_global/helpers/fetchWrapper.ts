export async function fetchWrapper<T>(url: string, options: RequestInit) {
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
