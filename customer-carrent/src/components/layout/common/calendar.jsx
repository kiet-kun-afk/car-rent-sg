import React, { ReactDOM } from "react";
import { useTranslation } from 'react-i18next';

import moment from 'moment';

import './calendar/script'

function Calendar() {
    const { t } = useTranslation();

    return (
        <div>
            {/* <!-- modal calendar --> */}
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title" id="exampleModalLabel">{t("Thời gian")}</h4>
                            <button id="closeModal" type="button" class="btn-close hidden" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div id="calendar"></div>
                        </div>
                        <div class="modal-footer">
                            <div id="startInModal"></div>
                            -
                            <div id="endInModal"></div>
                            <div>
                                {t("Số ngày thuê:")} <span id="daysDifference"></span>
                            </div>
                            <button id="continue" type="button" class="btn btn-primary">{t("Tiếp tục")}</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Calendar;