import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../../style/styleForgotpass.css";
import ToastComponent from "../../../assets/toasty";
import { ToastContainer } from "react-toastify";
function ResetPass() {
  const { token } = useParams(); // Lấy token từ path parameters
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({});

  const validate = () => {
    let formErrors = {};

    // Validate password
    if (!password) {
      formErrors.password = "Mật khẩu không được để trống";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,18}$/.test(
        password
      )
    ) {
      formErrors.password =
        "Mật khẩu phải chứa ít nhất 1 ký tự hoa, 1 ký tự thường, 1 ký tự số, 1 ký tự đặc biệt và độ dài từ 6 đến 18 ký tự";
    }

    // Validate rePassword
    if (!confirmPassword) {
      formErrors.confirmPassword = "Vui lòng xác nhận mật khẩu";
    } else if (confirmPassword !== password) {
      formErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
    }

    setErrors(formErrors);

    // Return true if no errors
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validate()) {
      try {
        await axios.post(
          "http://localhost:8080/api/v1/customer/reset-password",
          null,
          {
            params: {
              token,
              newPassword: password,
            },
          }
        );

        ToastComponent("success", "Đổi mật khẩu thành công!");
        setTimeout(() => {
          window.location.href = "/carrentsg";
        }, 4000);
      } catch (error) {
        ToastComponent("err", "Đổi mật thất bại!");
      }
      console.log("Form is valid. Submitting...");
    } else {
      console.log("Form contains errors.");
    }
  };
  return (
    <div class="container-fluid p-0">
      <div class="forgot-container">
        <div class="forgot-form">
          <form onSubmit={handleSubmit}>
            <div class="form-item">
              <h5 class="fw-medium fs-3 text-center mt-5">Nhập Mật Khẩu Mới</h5>
              <div class="item-form">
                <div class="mb-0">
                  <input
                    name="newpw"
                    type="password"
                    class="form-control"
                    placeholder="Mật Khẩu Mới"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="form-error ms-2 me-2 {errors.password==null?'d-lg-none':'' }">
                  <span className="error-item1">
                    <p>{errors.password}</p>
                  </span>
                </div>
                <div class="mt-3">
                  <input
                    name="confirmpw"
                    type="password"
                    class="form-control"
                    placeholder="Xác Nhận "
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="form-error ms-2 me-2 {errors.confirmPassword==null?'d-lg-none':'' }">
                  <span className="error-item1">
                    <p>{errors.confirmPassword}</p>
                  </span>
                </div>
                <div class="form-btn-reset mt-4">
                  <button class="btn btn-success mb-4" type="submit">
                    Đổi mật khẩu
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default ResetPass;
