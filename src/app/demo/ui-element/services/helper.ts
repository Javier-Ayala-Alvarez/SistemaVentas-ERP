let baseUrl: string = 'http://localhost:8081'; // Valor por defecto
let imagenes: string = 'assets/images/imagenesAplicativo/'; // Valor por defecto

export async function loadConfig(): Promise<void> {
  try {
    const response = await fetch('/assets/config.json');
    if (response.ok) {
      const config = await response.json();
      baseUrl = config.baseUrl || baseUrl; // Si existe baseUrl en config.json, lo usa. Si no, mantiene localhost.
      imagenes = config.imagenes || imagenes; // Si existe imagenes en config.json, lo usa. Si no, mantiene la ruta predeterminada.
    }
  } catch (error) {
    console.error("Error loading config.json, using default values", error);
  }
}

export { baseUrl, imagenes };
