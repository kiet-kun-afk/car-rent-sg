import React from 'react';

const PaymentMethodAccordion = ({ id, headerId, targetId, iconClass, title, children }) => (
    <div className="accordion-item border-0">
        <h2 className="accordion-header" id={headerId}>
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#${targetId}`} aria-expanded="false" aria-controls={targetId}>
                <i className={`fas ${iconClass} me-4`}></i> {title}
            </button>
        </h2>
        <div id={targetId} className="accordion-collapse collapse" aria-labelledby={headerId} data-bs-parent="#paymentMethodsAccordion">
            <div className="accordion-body">
                {children}
            </div>
        </div>
    </div>
);

export default PaymentMethodAccordion;
