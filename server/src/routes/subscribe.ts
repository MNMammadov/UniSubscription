import { Router } from "express";
import { Isubscr_GET, Isubscr_POST } from "../models";
import { SubscrModel } from "../schema";

export const SubscribeRouter = Router();

SubscribeRouter.get('/', async function (req, res) {
    try {
        const songs = await SubscrModel.find();

        res.json(songs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

SubscribeRouter.get('/:id', async function (req, res) {
    try {
        const song = await SubscrModel.findById(req.params.id);

        if (!song) {
            res.sendStatus(404);
        } else {
            res.json(song);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

SubscribeRouter.post('/', async function (req, res) {
    const reqPayload: Isubscr_POST = req.body;

    const subscribe = new SubscrModel(reqPayload);

    try {
        const insertedSubscribe = await subscribe.save();

        res.status(201).json(insertedSubscribe);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

SubscribeRouter.put('/:_id', async function (req, res) {
    const reqPayload: Isubscr_GET = req.body;

    try {
        const subscribe = await SubscrModel.findById(reqPayload._id);
        if (!subscribe) {
            res.sendStatus(404);
        } else {
            await SubscrModel.findByIdAndUpdate(reqPayload._id, reqPayload);

            res.sendStatus(200);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

SubscribeRouter.delete('/:_id', async function (req, res) {
    try {
        const subscribe = await SubscrModel.findById(req.params._id);

        if (!subscribe) {
            res.sendStatus(404);
        } else {
            await subscribe.remove();

            res.sendStatus(204);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
