import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useHistory } from 'react-router';
import { Isubscr_POST } from '../../models';
import { subscriptionService } from '../../modules/subscribe/subscrService';

const AddSubscribeModal: React.FC = () => {
    const [name, setName] = React.useState('')
    const [expDateCount, setExpDateCount] = React.useState(0);
    const [sublink, setSublink] = React.useState('')
    const [amount, setAmount] = React.useState(0);
    const submitMutation = useMutation(subscriptionService.postSubsrc);
    const queryClient = useQueryClient();
    const history = useHistory();

    const handleClose = () => {
        history.push('/subscriptions');
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData: Isubscr_POST = {
            product_name: name,
            time_interval: expDateCount,
            product_link: sublink,
            price: amount,
            expiration_date: ""
        };

        submitMutation.mutate(formData, {
            onSuccess: () => {
                queryClient.refetchQueries('subscriptionService.getSubsrc');
                handleClose();
            },
        });
    }

    return (
        <Dialog open={true} onClose={handleClose} >
            <DialogTitle>Add new Subscribe</DialogTitle>
            <DialogContent>
                <form action="/" onSubmit={(e) => handleSubmit(e)} method="post" name="login">
                    <div className="form-group my-2">
                        <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} className="form-control my-input" id="name" placeholder="Name" />
                    </div>
                    <div className="form-group">
                        <select className="form-select" value={expDateCount} onChange={(e) => setExpDateCount(Number(e.target.value))} aria-label="Select package">
                            <option value="0">Select package duration</option>
                            <option value="30">30</option>
                            <option value="60">60</option>
                            <option value="90">90</option>
                        </select>
                    </div>
                    <div className="form-group my-2">
                        <input type="url" value={sublink} onChange={(e) => setSublink(e.target.value)} name="sublink" id="sublink" className="form-control my-input" placeholder="Package Link" />
                    </div>
                    <div className="form-group">
                        <input type="number" min="0" value={amount} onChange={(e) => setAmount(Number(e.target.value))} name="amount" id="amount" className="form-control my-input" placeholder="Amount" />
                    </div>
                    <div className="form-group text-center mt-4">
                        <button type="submit" className="btn btn-primary d-block">Add</button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default AddSubscribeModal;