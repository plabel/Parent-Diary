export async function fetchWrapper<T>(url: string, options: RequestInit) {
  const response = await fetch(url, options);
  const json = await response.json();
  if (json.error) {
    console.warn(json.message);
  }
  return json.data as T;
}
