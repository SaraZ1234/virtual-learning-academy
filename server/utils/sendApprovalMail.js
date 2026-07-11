const axios = require("axios");
require("dotenv").config();

const sendApprovalMail = async ({
  full_name,
  email,
  course,
  temporaryPassword,
}) => {

  console.log("==================================================");
  console.log("📩 sendApprovalMail() CALLED");
  console.log({
    full_name,
    email,
    course,
    temporaryPassword,
  });
  console.log("==================================================");


  if (!email || !temporaryPassword) {
    console.log("❌ Missing email or password");
    return;
  }


  try {

    const emailData = {

      sender: {
        name: "Hafsa Institute of International Learning and Research",
        email: process.env.EMAIL_USER,
      },


      to: [
        {
          email,
          name: full_name,
        },
      ],


      subject: "🎉 Your Enrollment Has Been Approved",


      htmlContent: `

        <h2>Account Approved</h2>


        <p><b>Name:</b> ${full_name}</p>

        <p><b>Email:</b> ${email}</p>

        <p><b>Course:</b> ${course}</p>


        <p>
          <b>Temporary Password:</b>
          ${temporaryPassword}
        </p>


        <hr/>


        <p>
          Please login and change your password immediately.
        </p>


        <h3>
          Virtual Learning Academy
        </h3>

      `,
    };


    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      emailData,
      {
        headers:{
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type":"application/json",
        },
      }
    );


    console.log("✅ Approval email sent successfully");
    console.log(response.data);


    return response.data;


  } catch(error){


    console.log("❌ APPROVAL EMAIL ERROR");


    if(error.response){
      console.log(error.response.data);
    }
    else{
      console.log(error.message);
    }


    throw error;
  }

};


module.exports = sendApprovalMail;