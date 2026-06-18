/**
 * Middleware propio de registro (logger).
 * Registra en la consola la ruta accedida y el momento exacto de cada petición.
 */
export const miMiddlewareLogger = (peticion, respuesta, siguiente) => {
    const tiempoReferencia = new Date().toISOString();
    console.log(`[${tiempoReferencia}] Se recibió una petición ${peticion.method} en la ruta: ${peticion.url}`);

    // Es fundamental llamar a siguiente() para que la ejecución continúe hacia el endpoint.
    siguiente();
};
