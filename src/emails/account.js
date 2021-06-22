const sgMail = require('@sendgrid/mail')

//const sendgridAPIKey = 'api key'

sgMail.setApiKey(process.env.SENDGRID_API_Key)

// sgMail.send({
//     to: 'poovizhi.aarya@gmail.com',
//     from:'poovizhi.aarya@gmail.com',
//     subject:'This is my first creation',
//     text:'I hope this one actually get to you'
// })

const sendWelcomeEmail = (email,name) =>{
    sgMail.send({
        to:email,
        from:'poovizhi.aarya@gmail.com',
        subject:'Thanks for joining in !...',
        text:`welcome to the app, ${name}.let me know how you get along with this app`
         
    })
}

const cancelingEmail = (email,name) =>{
    sgMail.send({
        to:email,
        from:'poovizhi.aarya@gmail.com',
        subject:'Sorry to see you go',
        text:`Goodbye ${name}.I hope to see you back some time soon`
    })
}

module.exports = {
    sendWelcomeEmail,
    cancelingEmail

}