import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useHistory, useParams } from 'react-router';
import { Isubscr_EDIT } from '../../models';
import { subscriptionService } from '../../modules/subscribe/subscrService';


const EditSubscribeModal: React.FC = () => {
    const [name, setName] = React.useState('')
    const [expireDate, setExpireDate] = React.useState("");
    const [sublink, setSublink] = React.useState('')
    const [amount, setAmount] = React.useState(0);
    const { subscrId } = useParams<{ subscrId: string }>();
    const subscribeQuery = useQuery('subscriptionService.getSubsrc', subscriptionService.getSubsrc);
    const subscribeData = subscribeQuery.isSuccess && subscribeQuery.data.find(element => element._id === subscrId);

    React.useEffect(
        () => {
            if (subscribeData) {
                setName(subscribeData.product_name);
                setExpireDate(subscribeData.expiration_date);
                setSublink(subscribeData.product_link);
                setAmount(Number(subscribeData.price));
            }
        },
        [subscribeData]
    )

    const submitMutation = useMutation(subscriptionService.editSubsrc);
    const queryClient = useQueryClient();
    const history = useHistory();


    const handleClose = () => {
        history.push('/subscriptions');
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const SubformData: Isubscr_EDIT = {
            _id: subscrId,
            product_name: name,
            expiration_date: expireDate.toString(),
            product_link: sublink,
            price: amount,
        };

        submitMutation.mutate(SubformData, {
            onSuccess: () => {
                queryClient.refetchQueries('subscriptionService.getSubsrc');
                handleClose();
            },
        });
    }

    return (
        <Dialog open={true} onClose={handleClose} >
            <DialogTitle>Edit  Subscribe</DialogTitle>
            <DialogContent>
                <form action="/" onSubmit={(e) => handleSubmit(e)} method="put" name="login">
                    <div className="form-group my-2">
                        <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} className="form-control my-input" id="name" placeholder="Name" />
                    </div>
                    <div className="form-group">
                        <input type="date" value={expireDate} onChange={(e) => setExpireDate(e.target.value)} />
                    </div>
                    <div className="form-group my-2">
                        <input type="url" value={sublink} onChange={(e) => setSublink(e.target.value)} name="sublink" id="sublink" className="form-control my-input" placeholder="Package Link" />
                    </div>
                    <div className="form-group">
                        <input type="number" min="0" value={amount} onChange={(e) => setAmount(Number(e.target.value))} name="amount" id="amount" className="form-control my-input" placeholder="Amount" />
                    </div>
                    <div className="form-group text-center mt-4">
                        <button type="submit" className="btn btn-primary d-block">Save Change</button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default EditSubscribeModal;