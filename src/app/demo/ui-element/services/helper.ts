let baseUrl: string = 'http://localhost:8081'; // Valor por defecto

export async function loadBaseUrl(): Promise<string> {
  try {
    const response = await fetch('/assets/config.json');
    if (response.ok) {
      const config = await response.json();
      baseUrl = config.baseUrl || baseUrl; // Si existe baseUrl en config.json, lo usa. Si no, mantiene localhost.
    }
  } catch (error) {
    console.error("Error loading config.json, using default baseUrl", error);
  }
  return baseUrl;
}

export default baseUrl;
