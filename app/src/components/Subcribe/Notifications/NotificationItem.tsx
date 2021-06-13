import React from 'react'
interface IProps {
    subname: string;
    dfDate: Number;
}
const NotifactionItem: React.FC<IProps> = ({ subname, dfDate }) => {
    return (
        <div className="ticker__item">{subname} adlı subscribe {dfDate}  günü qalıb...</div>
    )
}

export default NotifactionItem;