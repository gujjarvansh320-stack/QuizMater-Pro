const sendEmail = require("../utils/sendEmail");

const sendTestEmail = async (req, res) => {
  try {
    await sendEmail({
      email: process.env.EMAIL_USER, // Sends email to yourself
      subject: "QuizMaster Email Test",
      html: `
        <h2>🎉 Congratulations!</h2>
        <p>Your QuizMaster email configuration is working successfully.</p>
      `,
    });

    res.status(200).json({
      success: true,
      message: "Test email sent successfully.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Email could not be sent.",
      error: error.message,
    });
  }
};

module.exports = { sendTestEmail };