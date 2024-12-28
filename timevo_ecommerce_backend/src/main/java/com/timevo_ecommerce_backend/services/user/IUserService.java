package com.timevo_ecommerce_backend.services.user;

import com.timevo_ecommerce_backend.dtos.UserDTO;
import com.timevo_ecommerce_backend.dtos.UserActionPasswordDTO;
import com.timevo_ecommerce_backend.dtos.UserUpdateDTO;
import com.timevo_ecommerce_backend.entities.User;
import com.timevo_ecommerce_backend.exceptions.DataNotFoundException;
import com.timevo_ecommerce_backend.responses.cloudinary.CloudinaryResponse;
import com.timevo_ecommerce_backend.responses.user.UserResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

public interface IUserService {
    UserResponse insertUser (UserDTO userDTO) throws Exception;

    String login (String email, String password) throws Exception;

    boolean emailUnique (String email);

    int activeAccount (String email, String activeCode) throws DataNotFoundException;

    User getUserDetailsFromToken (String token) throws Exception;

    Page<UserResponse> getUsers (String keyword, Pageable pageable);

    UserResponse updateUser (Long userId, UserUpdateDTO userDTO) throws Exception;

    UserResponse updateAvatarUser (Long userId, String avatarUrl, String avatarName) throws Exception;

    User getUserDetailsFromRefreshToken (String refreshToken) throws  Exception;

    void resetPassword (Long userId, String newPassword) throws DataNotFoundException;

    User blockOrEnable (Long userId) throws DataNotFoundException;

    CloudinaryResponse uploadImage(MultipartFile file) throws Exception;

     int generateOTP (String email) throws DataNotFoundException;

     boolean checkOTP (String email, String OTP) throws DataNotFoundException;

     boolean forgotPassword (UserActionPasswordDTO userForgotPasswordDTO) throws DataNotFoundException;

     boolean changePassword (UserActionPasswordDTO userActionPasswordDTO) throws Exception;
}
