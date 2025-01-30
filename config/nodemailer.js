import nodemailer from 'nodemailer'

export function createTransport(host,port,user,pass){
    // Looking to send emails in production? Check out our Email API/SMTP product!
    return nodemailer.createTransport({
        host,
        port,
        auth: {
        user ,
        pass
        }
    });
}
