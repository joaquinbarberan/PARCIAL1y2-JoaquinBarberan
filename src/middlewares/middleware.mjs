/**
 * Middleware propio (Consigna 3 - 10pts)
 * Registra en la consola la ruta accedida y el momento exacto.
 */
export const miMiddlewareLogger = (req, res, next) => {
    const tiempoReferencia = new Date().toISOString();
    console.log(`[${tiempoReferencia}] Se recibió una petición ${req.method} en la ruta: ${req.url}`);
    
    // Es fundamental llamar a next() para que la ejecución continúe hacia el endpoint
    next();
};