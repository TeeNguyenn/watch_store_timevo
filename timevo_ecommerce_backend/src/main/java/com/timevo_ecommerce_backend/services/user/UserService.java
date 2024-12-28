package com.timevo_ecommerce_backend.services.user;

import com.timevo_ecommerce_backend.components.JwtTokenUtil;
import com.timevo_ecommerce_backend.dtos.UserDTO;
import com.timevo_ecommerce_backend.dtos.UserActionPasswordDTO;
import com.timevo_ecommerce_backend.dtos.UserUpdateDTO;
import com.timevo_ecommerce_backend.entities.Role;
import com.timevo_ecommerce_backend.entities.Token;
import com.timevo_ecommerce_backend.entities.User;
import com.timevo_ecommerce_backend.exceptions.DataNotFoundException;
import com.timevo_ecommerce_backend.exceptions.PermissionDenyException;
import com.timevo_ecommerce_backend.repositories.RoleRepository;
import com.timevo_ecommerce_backend.repositories.TokenRepository;
import com.timevo_ecommerce_backend.repositories.UserRepository;
import com.timevo_ecommerce_backend.responses.cloudinary.CloudinaryResponse;
import com.timevo_ecommerce_backend.responses.user.UserResponse;
import com.timevo_ecommerce_backend.services.email.IEmailService;
import com.timevo_ecommerce_backend.services.file_upload.IFileUploadService;
import com.timevo_ecommerce_backend.utils.FileUploadUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.security.SecureRandom;
import java.util.*;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService {
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;
    private final IEmailService emailService;
    private final JwtTokenUtil jwtTokenUtil;
    private final AuthenticationManager authenticationManager;
    private final TokenRepository tokenRepository;
    private final IFileUploadService fileUploadService;


    @Override
    @Transactional
    public UserResponse insertUser(UserDTO userDTO) throws Exception {
        // Check if email exists or not ?
        if (userRepository.existsByEmail(userDTO.getEmail())) {
            throw new DataIntegrityViolationException("Email already exists");
        }
        List<Role> roles = userDTO.getRoleIds().stream()
                .map(roleId -> {
                    try {
                        Role role = roleRepository.findById(roleId)
                                .orElseThrow(() -> new DataNotFoundException("Cannot find Role with ID = " + roleId));
                        if (role.getName().equalsIgnoreCase("ADMIN")) {
                            throw new PermissionDenyException("You can not register a admin account");
                        }
                        return role;
                    } catch (DataNotFoundException | PermissionDenyException e) {
                        throw new RuntimeException(e);
                    }
                })
                .toList();

        User newUser = modelMapper.map(userDTO, User.class);

        String password = userDTO.getPassword();
        String encodedPassword = passwordEncoder.encode(password);
        newUser.setPassword(encodedPassword);

        newUser.setRoles(roles);
        newUser.setActiveCode(UUID.randomUUID().toString());
        newUser.setActive(false);

        userRepository.save(newUser);

        sendEmailActive(newUser.getEmail(), newUser.getActiveCode());
        return modelMapper.map(newUser, UserResponse.class);
    }

    @Override
    public String login(String email, String password) throws Exception {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isEmpty()) {
            throw new DataNotFoundException("Invalid email or password");
        }
        User existingUser = optionalUser.get();
        // check password
        if (!passwordEncoder.matches(password, existingUser.getPassword())) {
            throw new BadCredentialsException("Wrong email or password");
        }
        // authenticate with Java Spring security
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                email, password,
                existingUser.getAuthorities()
        );
        authenticationManager.authenticate(authenticationToken);
        return jwtTokenUtil.generateToken(existingUser);
    }

    @Override
    public boolean emailUnique(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public int activeAccount(String email, String activeCode) throws DataNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new DataNotFoundException("Cannot find User with Email = " + email));

        if (user.isActive()) {
            return 1;
        }

        if (activeCode.equals(user.getActiveCode())) {
            user.setActive(true);
            userRepository.save(user);
            return 2;
        }
        return 0;
    }

    @Override
    public User getUserDetailsFromToken(String token) throws Exception {
        if (jwtTokenUtil.isTokenExpired(token)) {
            throw new Exception("Token is expired");
        }
        String email = jwtTokenUtil.extractEmail(token);
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent()) {
            return user.get();
        } else {
            throw new Exception("User not found");
        }
    }

    @Override
    public Page<UserResponse> getUsers(String keyword, Pageable pageable) {
        return userRepository.findAll(keyword, pageable)
                .map(user -> {
                    return modelMapper.map(user, UserResponse.class);
                });
    }

    @Override
    public UserResponse updateUser(Long userId, UserUpdateDTO userDTO) throws Exception {
        User exisitingUser = userRepository.findById(userId)
                .orElseThrow(() -> new DataNotFoundException("Cannot find User with ID = " + userId));
        if (userDTO.getFirstName() != null) {
            exisitingUser.setFirstName(userDTO.getFirstName());
        }
        if (userDTO.getLastName() != null) {
            exisitingUser.setLastName(userDTO.getLastName());
        }
        if (userDTO.getAddress() != null) {
            exisitingUser.setAddress(userDTO.getAddress());
        }
        if (userDTO.getPhoneNumber() != null) {
            exisitingUser.setPhoneNumber(userDTO.getPhoneNumber());
        }
        userRepository.save(exisitingUser);
        return modelMapper.map(exisitingUser, UserResponse.class);
    }

    @Override
    public UserResponse updateAvatarUser(Long userId, String avatarUrl, String avatarName) throws Exception {
        User exisitingUser = userRepository.findById(userId)
                .orElseThrow(() -> new DataNotFoundException("Cannot find User with ID = " + userId));

        if (exisitingUser.getAvatar() != null) {
            String publicIdAvatar = exisitingUser.getAvatarName();
            fileUploadService.removeFile(publicIdAvatar);
        }
        exisitingUser.setAvatar(avatarUrl);
        exisitingUser.setAvatarName(avatarName);
        userRepository.save(exisitingUser);
        return modelMapper.map(exisitingUser, UserResponse.class);
    }

    @Override
    public User getUserDetailsFromRefreshToken(String refreshToken) throws Exception {
        Token existingToken = tokenRepository.findByRefreshToken(refreshToken);
        return getUserDetailsFromToken(existingToken.getToken());
    }

    @Override
    @Transactional
    public void resetPassword(Long userId, String newPassword) throws DataNotFoundException {
        User existingUser = userRepository.findById(userId)
                .orElseThrow(() -> new DataNotFoundException("Cannot find User with ID = " + userId));
        String encodedPassword = passwordEncoder.encode(newPassword);
        existingUser.setPassword(encodedPassword);
        userRepository.save(existingUser);
        // Reset password - > clear token
        List<Token> tokens = tokenRepository.findByUser(existingUser);
        for (Token token : tokens) {
            tokenRepository.delete(token);
        }
        sendEmailResetPassword(existingUser.getEmail(), newPassword);
    }

    @Override
    @Transactional
    public int generateOTP(String email) throws DataNotFoundException {
        User existingUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new DataNotFoundException("Cannot find User with Email = " + email));
        if (existingUser.getOtp() != null) {
            existingUser.setOtp(null);
            userRepository.save(existingUser);
            return 1;
        }
        else {
            SecureRandom random = new SecureRandom();
            int otp = 100000 + random.nextInt(900000);
            existingUser.setOtp(String.valueOf(otp));
            sendEmailForgotPassword(existingUser.getEmail(), String.valueOf(otp));
            userRepository.save(existingUser);
            return 2;
        }
    }

    @Override
    @Transactional
    public boolean changePassword (UserActionPasswordDTO userActionPasswordDTO) throws Exception {
        User user = userRepository.findByEmail(userActionPasswordDTO.getEmail())
                .orElseThrow(() -> new DataNotFoundException("Cannot find User with Email = " + userActionPasswordDTO.getEmail()));
        if (passwordEncoder.matches(userActionPasswordDTO.getOldPassword(), user.getPassword())) {
            if (userActionPasswordDTO.getPassword().equals(userActionPasswordDTO.getRetypePassword())) {
                String encodedNewPassword = passwordEncoder.encode(userActionPasswordDTO.getPassword());
                user.setPassword(encodedNewPassword);
                userRepository.save(user);
                List<Token> tokens = tokenRepository.findByUser(user);
                for (Token tokenItem : tokens) {
                    tokenRepository.delete(tokenItem);
                }
                sendEmailPasswordChanged(user.getEmail());
                return true;
            }
            else {
                return false;
            }
        }
        return false;
    }

    @Override
    @Transactional
    public boolean checkOTP (String email, String OTP) throws DataNotFoundException {
        User existingUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new DataNotFoundException("Cannot find User with Email = " + email));
        if (existingUser.getOtp().equals(OTP)) {
            existingUser.setOtp(null);
            return true;
        }
        return false;
    }

    @Override
    @Transactional
    public boolean forgotPassword(UserActionPasswordDTO userForgotPasswordDTO) throws DataNotFoundException {
        User existingUser = userRepository.findByEmail(userForgotPasswordDTO.getEmail())
                .orElseThrow(() -> new DataNotFoundException("Cannot find User with Email = " + userForgotPasswordDTO.getEmail()));
        if (userForgotPasswordDTO.getPassword().equals(userForgotPasswordDTO.getRetypePassword())) {
            String encodedPassword = passwordEncoder.encode(userForgotPasswordDTO.getPassword());
            existingUser.setPassword(encodedPassword);
            userRepository.save(existingUser);
            List<Token> tokens = tokenRepository.findByUser(existingUser);
            for (Token token : tokens) {
                tokenRepository.delete(token);
            }
            return true;
        }
        return false;
    }



    @Override
    @Transactional
    public User blockOrEnable(Long userId) throws DataNotFoundException {
        User existingUser = userRepository.findById(userId)
                .orElseThrow(() -> new DataNotFoundException("Cannot find User with ID = " + userId));
        existingUser.setActive(!existingUser.isActive());
        return userRepository.save(existingUser);
    }

    private void sendEmailPasswordChanged(String email) {
        String subject = "Your Password Has Been Successfully Changed";
        String text = "<!DOCTYPE html>" +
                "<html>" +
                "<body style=\"font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;\">" +
                "<div style=\"max-width: 600px; margin: 20px auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);\">" +
                "<div style=\"text-align: center; padding-bottom: 20px; border-bottom: 1px solid #dddddd;\">" +
                "<h1 style=\"color: #333333;\">Timevo Website</h1>" +
                "</div>" +
                "<div style=\"margin-top: 20px;\">" +
                "<p style=\"font-size: 16px; line-height: 1.6; color: #666666;\">Hello,</p>" +
                "<p style=\"font-size: 16px; line-height: 1.6; color: #666666;\">This is a confirmation that your password has been successfully changed.</p>" +
                "<p style=\"font-size: 16px; line-height: 1.6; color: #666666;\">If you did not make this change, please contact our support team immediately to secure your account.</p>" +
                "</div>" +
                "<div style=\"margin-top: 30px; padding-top: 20px; border-top: 1px solid #dddddd; text-align: center; font-size: 14px; color: #aaaaaa;\">" +
                "<p>&copy; 2024 Timevo. All rights reserved.</p>" +
                "</div>" +
                "</div>" +
                "</body>" +
                "</html>";
        emailService.sendMessages("timevo.service@gmail.com", email, subject, text);
    }


    private void sendEmailActive(String email, String activeCode) {
        String subject = "Confirm customer account at Timevo Website";
        String text = "<!DOCTYPE html>" +
                "<html>" +
                "<body style=\"font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;\">" +
                "<div style=\"max-width: 600px; margin: 20px auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);\">" +
                "<div style=\"text-align: center; padding-bottom: 20px; border-bottom: 1px solid #dddddd;\">" +
                "<h1 style=\"color: #333333;\">Timevo Website</h1>" +
                "</div>" +
                "<div style=\"margin-top: 20px;\">" +
                "<p style=\"font-size: 16px; line-height: 1.6; color: #666666;\">Please use the following code to activate your account associated with this email (<strong>" + email + "</strong>):</p>" +
                "<h1 style=\"font-size: 20px; color: #4CAF50; text-align: center;\">" + activeCode + "</h1>" +
                "<p style=\"font-size: 16px; line-height: 1.6; color: #666666;\">Click on the link below to activate your account:</p>" +
                "<p style=\"text-align: center;\"><a href=\"http://localhost:3000/active-account/" + email + "/" + activeCode + "\" style=\"font-size: 18px; color: #ffffff; background-color: #007BFF; padding: 10px 20px; text-decoration: none; border-radius: 4px;\">Activate Account</a></p>" +
                "</div>" +
                "<div style=\"margin-top: 30px; padding-top: 20px; border-top: 1px solid #dddddd; text-align: center; font-size: 14px; color: #aaaaaa;\">" +
                "<p>&copy; 2024 Timevo. All rights reserved.</p>" +
                "</div>" +
                "</div>" +
                "</body>" +
                "</html>";
        emailService.sendMessages("timevo.service@gmail.com", email, subject, text);
    }

    private void sendEmailResetPassword(String email, String newPassword) {
        String subject = "Your New Password for Timevo Website";
        String text = "<!DOCTYPE html>" +
                "<html>" +
                "<body style=\"font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;\">" +
                "<div style=\"max-width: 600px; margin: 20px auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);\">" +
                "<div style=\"text-align: center; padding-bottom: 20px; border-bottom: 1px solid #dddddd;\">" +
                "<h1 style=\"color: #333333;\">Timevo Website</h1>" +
                "</div>" +
                "<div style=\"margin-top: 20px;\">" +
                "<p style=\"font-size: 16px; line-height: 1.6; color: #666666;\">Your password has been reset. Your new password for the Timevo account associated with this email (<strong>" + email + "</strong>) is:</p>" +
                "<p style=\"font-size: 20px; color: #ff5722; font-weight: bold; text-align: center;\">" + newPassword + "</p>" +
                "<p style=\"font-size: 16px; line-height: 1.6; color: #666666;\">Please change this password after logging in for security purposes.</p>" +
                "<p style=\"font-size: 16px; line-height: 1.6; color: #666666;\">If you did not request this change, please contact our support immediately.</p>" +
                "</div>" +
                "<div style=\"margin-top: 30px; padding-top: 20px; border-top: 1px solid #dddddd; text-align: center; font-size: 14px; color: #aaaaaa;\">" +
                "<p>&copy; 2024 Timevo. All rights reserved.</p>" +
                "</div>" +
                "</div>" +
                "</body>" +
                "</html>";
        emailService.sendMessages("timevo.service@gmail.com", email, subject, text);
    }

    private void sendEmailForgotPassword(String email, String otpCode) {
        String subject = "Your OTP Code for Password Forgot - Timevo Website";
        String text = "<!DOCTYPE html>" +
                "<html>" +
                "<body style=\"font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;\">" +
                "<div style=\"max-width: 600px; margin: 20px auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);\">" +
                "<div style=\"text-align: center; padding-bottom: 20px; border-bottom: 1px solid #dddddd;\">" +
                "<h1 style=\"color: #333333;\">Timevo Website</h1>" +
                "</div>" +
                "<div style=\"margin-top: 20px;\">" +
                "<p style=\"font-size: 16px; line-height: 1.6; color: #666666;\">You have requested a password forgot for your Timevo account associated with this email (<strong>" + email + "</strong>).</p>" +
                "<p style=\"font-size: 16px; line-height: 1.6; color: #666666;\">Your OTP code is:</p>" +
                "<p style=\"font-size: 24px; color: #ff5722; font-weight: bold; text-align: center;\">" + otpCode + "</p>" +
                "<p style=\"font-size: 16px; line-height: 1.6; color: #666666;\">This code is valid for <strong>1 minute</strong>. Please use it promptly to reset your password.</p>" +
                "<p style=\"font-size: 16px; line-height: 1.6; color: #666666;\">If you did not request this change, please contact our support team immediately.</p>" +
                "</div>" +
                "<div style=\"margin-top: 30px; padding-top: 20px; border-top: 1px solid #dddddd; text-align: center; font-size: 14px; color: #aaaaaa;\">" +
                "<p>&copy; 2024 Timevo. All rights reserved.</p>" +
                "</div>" +
                "</div>" +
                "</body>" +
                "</html>";
        emailService.sendMessages("timevo.service@gmail.com", email, subject, text);
    }


    @Override
    public CloudinaryResponse uploadImage(MultipartFile file) throws Exception {
        FileUploadUtil.assertAllowed(file, FileUploadUtil.IMAGE_PATTERN);
        String fileName = FileUploadUtil.getFileName(file.getOriginalFilename());
        CloudinaryResponse response = fileUploadService.uploadFile(file, fileName);
        return response;
    }


}
