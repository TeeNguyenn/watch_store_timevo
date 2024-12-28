package com.timevo_ecommerce_backend.controllers;

import com.timevo_ecommerce_backend.components.LocalizationUtils;
import com.timevo_ecommerce_backend.dtos.ShippingMethodDTO;
import com.timevo_ecommerce_backend.entities.ShippingMethod;
import com.timevo_ecommerce_backend.exceptions.DataNotFoundException;
import com.timevo_ecommerce_backend.exceptions.ExistDataException;
import com.timevo_ecommerce_backend.responses.Response;
import com.timevo_ecommerce_backend.services.shipping_method.IShippingMethodService;
import com.timevo_ecommerce_backend.utils.MessagesKey;
import jakarta.mail.Message;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${api.prefix}/shipping-methods")
@RequiredArgsConstructor
public class ShippingMethodController {

    private final IShippingMethodService shippingMethodService;
    private final LocalizationUtils localizationUtils;

    @PostMapping("")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Response> insertShippingMethod(
            @Valid @RequestBody ShippingMethodDTO shippingMethodDTO,
            BindingResult result
    ) throws ExistDataException {
        if (result.hasErrors()) {
            List<String> errorMessages = result.getFieldErrors().stream()
                    .map(FieldError::getDefaultMessage)
                    .toList();
            return ResponseEntity.badRequest().body(
                    Response.builder()
                            .status(HttpStatus.BAD_REQUEST)
                            .message(localizationUtils.getLocalizedMessage(MessagesKey.INVALID_ERROR, errorMessages.toString()))
                            .build()
            );
        }
        ShippingMethod shippingMethod = shippingMethodService.insertShippingMethod(shippingMethodDTO);
        return ResponseEntity.ok(
                Response.builder()
                        .data(shippingMethod)
                        .message(localizationUtils.getLocalizedMessage(MessagesKey.INSERT_SUCCESSFULLY))
                        .status(HttpStatus.CREATED)
                        .build()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Response> getShippingMethod(@PathVariable("id") Long shippingMethodId) throws DataNotFoundException {
        ShippingMethod shippingMethod = shippingMethodService.getShippingMethod(shippingMethodId);
        return ResponseEntity.ok(
                Response.builder()
                        .data(shippingMethod)
                        .status(HttpStatus.OK)
                        .message("Get shipping method successfully")
                        .build()
        );
    }

    @GetMapping("")
    public ResponseEntity<Response> getShippingMethods() {
        List<ShippingMethod> shippingMethods = shippingMethodService.getAllShippingMethod();
        return ResponseEntity.ok(
                Response.builder()
                        .data(shippingMethods)
                        .message("Get all shipping method successfully")
                        .status(HttpStatus.OK)
                        .build()
        );
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Response> updateShippingMethod(
            @PathVariable("id") Long shippingMethodId,
            @Valid @RequestBody ShippingMethodDTO shippingMethodDTO,
            BindingResult result
    ) throws DataNotFoundException {
        if (result.hasErrors()) {
            List<String> errorMessages = result.getFieldErrors().stream()
                    .map(FieldError::getDefaultMessage)
                    .toList();
            return ResponseEntity.badRequest().body(
                    Response.builder()
                            .message(localizationUtils.getLocalizedMessage(MessagesKey.INVALID_ERROR, errorMessages.toString()))
                            .status(HttpStatus.BAD_REQUEST)
                            .build()
            );
        }
        ShippingMethod shippingMethod = shippingMethodService.updateShippingMethod(shippingMethodId, shippingMethodDTO);
        return ResponseEntity.ok(
                Response.builder()
                        .data(shippingMethod)
                        .message(localizationUtils.getLocalizedMessage(MessagesKey.UPDATE_SUCCESSFULLY))
                        .status(HttpStatus.OK)
                        .build()
        );
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Response> deleteShippingMethod(@PathVariable("id") Long shippingMethodId) {
        shippingMethodService.deleteShippingMethod(shippingMethodId);
        return ResponseEntity.ok(
            Response.builder()
                    .message(localizationUtils.getLocalizedMessage(MessagesKey.DELETE_SUCCESSFULLY))
                    .status(HttpStatus.OK)
                    .build()
        );
    }
}

