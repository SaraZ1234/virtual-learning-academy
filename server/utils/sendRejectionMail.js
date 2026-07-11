const axios = require("axios");
require("dotenv").config();


const sendRejectionMail = async ({
  full_name,
  email,
  course,
}) => {


  try {


    const emailData = {


      sender:{
        name:"Hafsa Institute of International Learning and Research",
        email:process.env.EMAIL_USER,
      },


      to:[
        {
          email,
          name:full_name,
        },
      ],


      subject:"Application Status Update",


      htmlContent:`

        <h2>Application Status</h2>


        <p>
          Dear <strong>${full_name}</strong>,
        </p>


        <p>
          Thank you for applying for the
          <strong>${course}</strong> program at
          <strong>
          Hafsa Institute of International Learning and Research
          </strong>.
        </p>


        <p>
          After reviewing your application, we regret to inform you that
          it has <strong>not been approved</strong> at this time.
        </p>


        <p>
          This decision does not prevent you from applying again in the future.
          We encourage you to submit another application whenever you are ready.
        </p>


        <br>


        <p>
          If you have any questions, please feel free to contact us.
        </p>


        <br>


        <p>Regards,</p>


        <h3>
        Hafsa Institute of International Learning and Research
        </h3>

      `,

    };



    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      emailData,
      {
        headers:{
          "api-key":process.env.BREVO_API_KEY,
          "Content-Type":"application/json",
        },
      }
    );



    console.log("✅ Rejection email sent successfully");

    return response.data;



  } catch(error){


    console.log("❌ REJECTION EMAIL ERROR");


    if(error.response){
      console.log(error.response.data);
    }
    else{
      console.log(error.message);
    }


    throw error;

  }

};



module.exports = sendRejectionMail;