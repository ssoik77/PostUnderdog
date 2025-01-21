import React, { useState } from 'react';

const VacationApproval = () => {
    const [approvals, setApprovals] = useState([]);

    const handleApprove = (id) => {
        setApprovals(approvals.map(approval => 
            approval.id === id ? { ...approval, status: 'Approved' } : approval
        ));
    };

    const handleReject = (id) => {
        setApprovals(approvals.map(approval => 
            approval.id === id ? { ...approval, status: 'Rejected' } : approval
        ));
    };

    return (
        <div>
            <h1>Vacation Approval</h1>
            <ul>
                {approvals.map(approval => (
                    <li key={approval.id}>
                        {approval.name} - {approval.status}
                        <button onClick={() => handleApprove(approval.id)}>Approve</button>
                        <button onClick={() => handleReject(approval.id)}>Reject</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default VacationApproval;