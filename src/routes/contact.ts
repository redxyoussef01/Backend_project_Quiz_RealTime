const express = require('express');
import * as nodemailer from 'nodemailer';
import { body, validationResult } from 'express-validator';

const router = express.Router();




// Configure nodemailer with basic SMTP settings
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: "yourais00@gmail.com",
    pass: "orstdjmbgpqahpee"
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Verify transporter configuration
transporter.verify(function(error, success) {
  if (error) {
    console.log('SMTP Configuration Error:', error);
    if (error instanceof Error) {
      console.log('Error details:', {
        message: error.message,
        stack: error.stack
      });
    }
  } else {
    console.log('SMTP Server is ready to take our messages');
  }
});

// Validation middleware
const validateContact = [
  body('name').notEmpty().withMessage('Le nom est requis'),
  body('email').isEmail().withMessage('Email invalide'),
  body('subject').notEmpty().withMessage('Le sujet est requis'),
  body('message').notEmpty().withMessage('Le message est requis')
];

// Contact form endpoint
router.post('/contact', validateContact, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, subject, message } = req.body;

    // Email options
    const mailOptions = {
      from: {
        name: 'VolleyMentor Contact',
        address: "yourais00@gmail.com"
      },
      to: "yourais00@gmail.com",
      replyTo: email,
      subject: `Nouveau message de contact: ${subject}`,
      html: `
        <h2>Nouveau message de contact</h2>
        <p><strong>Nom:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Sujet:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);

    res.status(200).json({ 
      message: 'Message envoyé avec succès',
      messageId: info.messageId 
    });
  } catch (error) {
    console.error('Error sending email:', error);
    if (error instanceof Error) {
      console.error('Error details:', {
        message: error.message,
        stack: error.stack
      });
    }
    
    res.status(500).json({ 
      message: 'Erreur lors de l\'envoi du message',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router; 