import {createTransport} from 'nodemailer'
import config from './configEnv.js';
import logger from './configWinston.js';

const transport = createTransport({
    service:'gmail',
    port: 587,
    auth:{
        user: config.EMAIL_TO_SEND,
        pass: config.PASS_NODEMAILER
    }
})

async function sendEmail(subject, bodyMail, receiver) {
    try {
        const info = await transport.sendMail({
            from: config.EMAIL_TO_SEND,
            to: receiver, 
            subject,
            html: bodyMail
            }       
        )
        logger.info(JSON.stringify(info))
    } catch (error) {
        logger.error('Error sending email: ' +(error.stack));
    }
}
export const purchaseData = (purchaseData) => {
    return `
    <h1>Hola ${purchaseData.nombre.toLocaleUpperCase()} ${purchaseData.apellido.toLocaleUpperCase()}</h1>
    <h2>Tu compra fue aprobada!!</h2>
    <h2>Detalle de la compra:</h2>
         <table style='padding: 8px 20px; border-collapse:collapse; text-align: center; border: 2px solid rgb(68, 64, 64);'>
        <thead>
            <tr>
                <th style="padding: 8px 20px; border:2px solid rgb(68, 64, 64); border-collapse: collapse;text-align:center;">Producto</th>
                <th style="padding: 8px 20px; border:2px solid rgb(68, 64, 64); border-collapse: collapse;text-align:center;">Precio</th>
                <th style="padding: 8px 20px; border:2px solid rgb(68, 64, 64); border-collapse: collapse;text-align:center;">Cantidad</th>
            </tr>
        </thead>
        <tbody>
        ${purchaseData.articleBuyed.map(p => {
            return `      
            <tr>
                <td style="padding: 8px 20px; border:2px solid rgb(68, 64, 64); border-collapse: collapse;text-align:center;">${p.product}</td>
                <td style="padding: 8px 20px; border:2px solid rgb(68, 64, 64); border-collapse: collapse;text-align:center;">$${p.price.toFixed(2)}</td>
                <td style="padding: 8px 20px; border:2px solid rgb(68, 64, 64); border-collapse: collapse;text-align:center;">${p.quantity}</td>
            </tr>
        `
        }).join("")}
        </tbody>    
        </table>
    <h3>N° de Comprobante: ${purchaseData.code}</h3>
    <h3>Monto Total: $${purchaseData.amount.toFixed(2) }</h3>
    <h3>Fecha y hora de transaccion: ${purchaseData.purchase_datetime}</h3>
    <h3>Email de contacto: ${purchaseData.purchaser}</h3>
    `
}
export default sendEmail
