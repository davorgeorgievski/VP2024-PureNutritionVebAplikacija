const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    const newUser = new User({ name, email, password });
    await newUser.save();

    // Конфигурација за испраќање е-пошта
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'purenutrition@gmail.com',
            pass: '1234'
        }
    });

    const mailOptions = {
        from: 'georgievski.davor@uklo.edu.mk',
        to: email,
        subject: 'Добредојдовте!',
        text: 'Вие успешно се регистриравте на нашата платформа.'
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    res.redirect('/login');
});

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/supplements', (req, res) => {
    res.render('list');
});



module.exports = router;


const User = require('../models/user');
const bcrypt = require('bcrypt');

// Регистрација на корисник
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.redirect('/login');
});

// Најава на корисник
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
        // Успешна најава, можете да поставите сесија или токен
        res.redirect('/');
    } else {
        res.redirect('/login');
    }
});

module.exports = router;
