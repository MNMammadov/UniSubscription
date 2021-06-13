import { Button, Box } from '@material-ui/core';
import React from 'react';
import { useMutation, useQuery } from 'react-query';
import { Isubscr_GET } from '../../models';
import { subscriptionService } from '../../modules/subscribe/subscrService';
import moment from 'moment'
import Header from '../Header';
import Notifation from './Notifications/Notification';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import socialMediIcon from '../../assets/img/Group2.png'
import bussinessIcon from '../../assets/img/Business2.png'
import '../../assets/style/_cards.scss'
import EditSubscribeModal from './EditSubscribeModal';
import { Link, Switch, useHistory } from 'react-router-dom';
import { ProtectedRoute } from '../ProtectedRoute';
import AddSubscribeModal from './AddSubscribeModal';

const Subscribe: React.FC = () => {
    const history = useHistory();
    const subscribeQuery = useQuery('subscriptionService.getSubsrc', subscriptionService.getSubsrc);
    const deleteMutation = useMutation(subscriptionService.deleteSubsrc);

    const checkExpiredDate = (date) => {
        let given = moment(date, "YYYY-MM-DD");
        let current = moment().startOf('day');
        let differenceDate = moment.duration(given.diff(current));
        return differenceDate.asDays()
    }

    const handleAddClick = () => {
        history.push('/subscriptions/add');
    }

    const handleDeleteClick = (subsc: Isubscr_GET) => {
        deleteMutation.mutate(subsc._id, {
            onSuccess: () => {
                subscribeQuery.refetch();
            }
        });
    };

    return (
        <>
            <Header />
            <Notifation />
            <Box padding={4} className="container">
                <Button variant="contained" color="primary" onClick={handleAddClick}>
                    Add new subscribe
            </Button>
                {subscribeQuery.isLoading && 'Loading...'}
                <div className="container">
                    <div className="row mt-5 justify-content-between">
                        {subscribeQuery.isSuccess && subscribeQuery.data.map((subscr, idx) => (
                            <div className="col-lg-4 col-md-6 mt-4" key={subscr._id}>
                                <div className="card product-card " >
                                    <div className="card-img bg-pink">
                                        {idx % 2 === 0 ? (<img src={socialMediIcon} className=" card-img-top" alt="logo" />) : (<img src={bussinessIcon} className=" card-img-top" alt="logo" />)}
                                    </div>
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between">
                                            <div className="pro-type">
                                                Subscribes
                                            </div>
                                            <div className="days-left">
                                                {checkExpiredDate(subscr.expiration_date)} days left
                                            </div>
                                        </div>
                                        <div className="title">
                                            {subscr.product_name}
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <div className="price">
                                                {subscr.price} AZN
                                        </div>
                                            <div className="exp-date">
                                                <b className="text-dark">Expire Date:</b>{moment(subscr.expiration_date, "YYYY-MM-DD").date()}/{moment(subscr.expiration_date, "YYYY MM").month() + 1}/{moment(subscr.expiration_date, "YYYY").year()}
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-between mt-2">
                                            <div className="deleteProduct">
                                                <button onClick={() => handleDeleteClick(subscr)} className="btn btn-danger">Unsubscribe</button>

                                                <Link
                                                    to={`/subscriptions/${subscr._id}/edit`}
                                                    className="btn btn-primary mx-2"
                                                >
                                                    Edit
                                                </Link>
                                            </div>
                                            <div className=" goToTheLink">
                                                <a href={subscr.product_link}>Go to the link<ArrowRightAltIcon /></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {subscribeQuery.isError && 'Error...'}
            </Box>
            <Switch>
                <ProtectedRoute path="/subscriptions/add" exact>
                    <AddSubscribeModal />
                </ProtectedRoute>
                <ProtectedRoute path="/subscriptions/:subscrId/edit" exact>
                    <EditSubscribeModal />
                </ProtectedRoute>
            </Switch>
        </>
    );
}

export default Subscribe;