import { Isubscr_GET, Isubscr_POST, Isubscr_EDIT } from "../../models";
import { HttpClient } from "../httpClient";

class SubscriptionService extends HttpClient {
    constructor() {
        super('http://localhost:8000/api/subscribes');
    }

    public getSubsrc = (): Promise<Isubscr_GET[]> => {
        return this.get('');
    }

    public deleteSubsrc = (subscrId: string): Promise<void> => {
        return this.delete(`/${subscrId}`);
    }

    public postSubsrc = (subscr: Isubscr_POST): Promise<Isubscr_POST> => {
        return this.post('', subscr);
    }
    public editSubsrc = (subscr: Isubscr_EDIT): Promise<Isubscr_EDIT> => {
        return this.put(`/${subscr._id}`, subscr);
    }
}

export const subscriptionService = new SubscriptionService();