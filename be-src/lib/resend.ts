import { Resend } from 'resend';

const resend = new Resend(process.env.API_KEY_RESEND);


export { resend }
// resend.emails.send({
//   from: 'onboarding@resend.dev',
//   to: 'nicolas_stebner@hotmail.com',
//   subject: 'Hello World',
//   html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
// });