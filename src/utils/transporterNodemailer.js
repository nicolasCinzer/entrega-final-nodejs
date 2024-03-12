import { nodemailerEmail, nodemailerPw } from '../config/config.js'
import { createTransport } from 'nodemailer'

const transporter = createTransport({
  service: 'gmail',
  auth: {
    user: nodemailerEmail,
    pass: nodemailerPw
  }
})

export const sendTicketMail = ({ to, ticketCode, totalItems, totalCost, attachments }) => {
  const mailOptions = {
    from: nodemailerEmail,
    to,
    subject: `Ticket de Compra Generado - COD:: ${ticketCode}`,
    html: `
      <h2>Compra realizada con exito!</h2>
      <p>Se compraron un total de ${totalItems} productos</p>
      <p>Total: <strong>$${totalCost}</strong></p>
      <p>Gracias por su compra</p>
    `,
    attachments
  }

  return sendMail(mailOptions)
}

export const resetPasswordEmail = ({ to, url }) => {
  const mailOptions = {
    from: nodemailerEmail,
    to,
    subject: `Recuperacion de Contraseña`,
    html: `
      <h2>Recuperacion de Contraseña</h2>
      <p>Se ha solicitado una recuperacion de contraseña desde este email.</p>
      <p><strong>Tiene 1 hora para realizar esta accion. En caso de no realizarlo, solicite otra recuperacion.</strong></p>
      <p>Para completar la solicitud, entre en el siguiente link:</p>
      <p>${url}</p>
    `
  }

  return sendMail(mailOptions)
}

export const deletedAccountEmail = ({ to }) => {
  const mailOptions = {
    from: nodemailerEmail,
    to,
    subject: `Tu cuenta ha sido eliminada por inactividad.`,
    html: `
      <h2>Tu cuenta ha sido eliminada por inactividad!</h2>
      <p>Estimado usuario, su cuenta ha sido eliminada por inactividad. En caso de necesitar recuperar la cuenta, contacte soporte.</p>
      <footer>Soporte +99 1337 420 069</footer>
    `
  }

  return sendMail(mailOptions)
}

export const deletedProductEmail = ({ to, productName }) => {
  const mailOptions = {
    from: nodemailerEmail,
    to,
    subject: `Tu producto '${productName}' ha sido eliminado.`,
    html: `
      <h2>Tu producto ha sido eliminado!</h2>
      <p>Estimado usuario, su producto identificado como '${productName}' con codigo #${productCode} ha sido eliminado. En caso de necesitar recuperar el producto, contacte soporte.</p>
      <footer>Soporte +99 1337 420 069</footer>
    `
  }

  return sendMail(mailOptions)
}

export const sendMail = async mailOptions => {
  const email = await transporter.sendMail(mailOptions)

  return email
}
