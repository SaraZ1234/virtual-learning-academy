const axios = require("axios");
require("dotenv").config();

const sendMail = async (formData) => {
  try {

    console.log("========== BREVO ENROLLMENT MAIL ==========");
    console.log("SENDER:", process.env.EMAIL_USER);
    console.log(
      "BREVO KEY:",
      process.env.BREVO_API_KEY ? "AVAILABLE" : "MISSING"
    );
    console.log("===========================================");


    // ===========================================
    // EMAIL TO ADMIN
    // ===========================================

    const adminMail = {

      sender: {
        name: "Hafsa Institute of International Learning and Research",
        email: process.env.EMAIL_USER,
      },


      to: [
        {
          email: process.env.EMAIL_RECEIVER,
          name: "Admin",
        },
      ],


      replyTo: {
        email: formData.email,
        name: formData.full_name,
      },


      subject: "New Course Enrollment Received",


      htmlContent: `

        <h2>New Enrollment Details</h2>


        <p><strong>Name:</strong> ${formData.full_name}</p>

        <p><strong>Email:</strong> ${formData.email}</p>

        <p><strong>Phone:</strong> ${formData.phone}</p>

        <p><strong>Course:</strong> ${formData.course}</p>

        <p><strong>Education:</strong> ${formData.education}</p>

        <p><strong>Message:</strong> ${formData.message}</p>

      `,
    };


    await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      adminMail,
      {
        headers:{
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type":"application/json",
        },
      }
    );


    console.log("✅ Admin enrollment email sent");


    // ===========================================
    // EMAIL TO STUDENT
    // ===========================================


    const studentMail = {

      sender:{
        name:"Virtual Learning Academy",
        email:process.env.EMAIL_USER,
      },


      to:[
        {
          email:formData.email,
          name:formData.full_name,
        },
      ],


      subject:"Enrollment Request Received",


      htmlContent:`


        <h2>Thank You for Your Enrollment!</h2>


        <p>
          Dear <strong>${formData.full_name}</strong>,
        </p>


        <p>
          We have successfully received your enrollment request for
          <strong>${formData.course}</strong>.
        </p>


        <p>
          Our admissions team will review your application within
          <strong>24 hours</strong>.
        </p>


        <p>
          Once your enrollment is approved, you will receive another
          email containing your login credentials so you can access
          your student dashboard.
        </p>


        <br>


        <p>
          Thank you for choosing Virtual Learning Academy.
        </p>


        <br>


        <p>Regards,</p>


        <h3>
          Hafsa Institute of International Learning and Research
        </h3>


      `,
    };



    await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      studentMail,
      {
        headers:{
          "api-key":process.env.BREVO_API_KEY,
          "Content-Type":"application/json",
        },
      }
    );



    console.log("✅ Student confirmation email sent");



  } catch(error){


    console.log("========== BREVO ENROLLMENT ERROR ==========");


    if(error.response){
      console.log("Status:", error.response.status);
      console.log("Response:", error.response.data);
    }
    else{
      console.log(error.message);
    }


    console.log("============================================");

    throw error;

  }
};


module.exports = sendMail;