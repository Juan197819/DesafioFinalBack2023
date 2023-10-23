/**Esta funcion usa la fecha y hora que calcula new Date() que es en base al Tiempo Universal Coordinado (UTC-0) y la convierte a la hora local de la PC donde se ejecuta el codigo retornandola en formato AAAA-MM-DD HH-MM-SS. Por ejemplo, si new Date por defecto retorna 2022-01-01 00:00 hs en base al UTC-0  en Argentina devolveria 2021-12-31 21:00 ya que esta pertenece a UTC-3 lo que significa que tiene 3 horas menos segun su uso horario. Adicionalmente se puede agregar un parametro opcional en formato numero para calcular una fecha y hora distinta en base a la actual.
 * 
 * @param {number} [dif] - Opcional- Cantidad de minutos que quiero restar (si  el param es positivo) o agregar (si el param es negativo) a la hora actual de mi uso horario. Si viene vacio la funcion devolvera la hora exacta actual.
 * @returns {object} - Retorna hora en formato AAAA-MM-DD HH-MM-SS. Ejemplo: 2023-10-17T17:19:26.023+00:00
 */
export function getHourLocal(dif=0) {
    
    return new Date((Date.now() - (new Date().getTimezoneOffset() * 60000))-(1000*60*dif)) 
}