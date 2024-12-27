// JavaScript source code
const express = require('express');
const router = express.Router();
const Device = require('../models/device.js')

router.get('/devices', async (req, res) => {
    try {
        const devices = await Device.getAllDevices();
        res.render('show-devices', { devices });
    } catch (err) {
        console.error('Error fetching devices: ' + err.message);
        res.status(500).json({ error: 'Failed to fetch devices' });
    }
});



router.get('/devices/new', (req, res) => {
    res.render('add-device');
});

router.post('/devices', async (req, res) => {
    const { device_name, brand, price } = req.body;
    const newDevice = new Device(null, device_name, brand, price);
    try {
        await newDevice.addDevice();
        res.redirect('/devices');
    } catch (err) {
        console.error('Error adding a device: ', err.message);
        res.status(500).json({ error: 'Failed to add a device' });
    }
});


router.get('/devices/edit/:id', async (req, res) => {
    const deviceId = req.params.id;
    try {
        const device = await Device.getDeviceById(deviceId);
        res.render('edit-device', { device });
    } catch (err) {
        console.error('Error fetching the device: ' + err.message);
        res.status(500).json({ error: 'Failed to fetch the device' });
    }
});

router.post('/devices/update/:id', async (req, res) => {
    const deviceId = req.params.id;
    const { device_name, brand, price } = req.body;
    const updatedDevice = new Device(deviceId, device_name, brand, price);

    try {
        await updatedDevice.updateDevice();
        res.redirect('/devices');
    } catch (err) {
        console.error('Error updateing a device: ', err.message);
        res.status(500).json({ error: 'Failed to add a device' });
    }
});

router.get('/devices/delete/:id', async (req, res) => {
    const deviceId = req.params.id;

    try {
        await Device.deleteDevice(deviceId);
        res.redirect('/devices');
    } catch (err) {
        console.error('Error deleting the book: ' + err.message);
        res.statuse(500).json({ error: 'Failed to delete the book' });
    }
});

module.exports = router;

