package com.timevo_ecommerce_backend.responses.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.timevo_ecommerce_backend.entities.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserResponse {

    private Long id;

    @JsonProperty("first_name")
    private String firstName;

    @JsonProperty("last_name")
    private String lastName;

    @JsonProperty("phone_number")
    private String phoneNumber;

    private String email;

    private String address;

    @JsonProperty("date_of_birth")
    private Date dateOfBirth;

    private String avatar;

    private String avatarName;

    @JsonProperty("is_active")
    private boolean isActive;

    @JsonProperty("roles")
    private List<Role> roles;
}
