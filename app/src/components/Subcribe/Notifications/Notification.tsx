import React from 'react'
import ".././notifaction.scss"
import NotifactionItem from './NotificationItem';
import { useQuery } from 'react-query';
import { subscriptionService } from '../../../modules/subscribe/subscrService';

import moment from 'moment';


const Notifation = () => {
    const subscribeQuery = useQuery('subscriptionService.getSubsrc', subscriptionService.getSubsrc);

    return (
        <div className="ticker-wrap">
            <div className="ticker">

                {subscribeQuery?.isSuccess && subscribeQuery.data.map((subscr, idx) => {
                    let subName: string = subscr.product_name
                    let given = moment(subscr.expiration_date, "YYYY-MM-DD");
                    let current = moment().startOf('day');
                    let differenceDate = moment.duration(given.diff(current)).asDays();

                    return differenceDate < 4 ? <NotifactionItem key={idx} subname={subName} dfDate={differenceDate} /> : ""

                }
                )}
            </div>
        </div>
    )
}
export default Notifation