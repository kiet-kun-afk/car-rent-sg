import React from 'react';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ToastComponent(props, comment) {
    const sNotify = () =>
        toast.success(comment, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
        });
    const wNotify = () =>
        toast.warn(comment, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
        });
    const errNotify = () =>
        toast.error(comment, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
        });;
    const iNotify = () =>
        toast.info(comment, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
        });;

    if (props === 'success') {
        return sNotify();
    }
    if (props === 'warning') {
        return wNotify();
    }
    if (props === 'err') {
        return errNotify();
    }
    if (props === 'info') {
        return iNotify();
    }
}

export default ToastComponent;