const nodeMailer = require("../config/nodemailer");

// this is another way of exporting a method
exports.newComment = (comment) => {
  console.log("Inside new comment mailer");

  nodeMailer.transporter.sendMail(
    {
      from: "harsh250600@codeial.com",
      to: comment.user.email,
      subject: "New comment published",
      html: "<h1>Yup, Your comment is now published</h1>",
    },
    (err, info) => {
      if (err) {
        console.log("Error in sending mail", err);
        return;
      }

      console.log("Message Sent", info);
      return;
    }
  );
};
