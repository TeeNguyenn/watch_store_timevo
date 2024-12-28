package com.timevo_ecommerce_backend.controllers;

import com.timevo_ecommerce_backend.components.LocalizationUtils;
import com.timevo_ecommerce_backend.dtos.OrderDTO;
import com.timevo_ecommerce_backend.entities.Order;
import com.timevo_ecommerce_backend.exceptions.DataNotFoundException;
import com.timevo_ecommerce_backend.responses.order.OrderListResponse;
import com.timevo_ecommerce_backend.responses.order.OrderResponse;
import com.timevo_ecommerce_backend.responses.Response;
import com.timevo_ecommerce_backend.services.order.IOrderService;
import com.timevo_ecommerce_backend.utils.MessagesKey;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${api.prefix}/orders")
@RequiredArgsConstructor
public class OrderController {

    private final IOrderService orderService;
    private final LocalizationUtils localizationUtils;
    private final ModelMapper modelMapper;

    @PostMapping("")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<Response> insertOrder (
            @Valid @RequestBody OrderDTO orderDTO,
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
            OrderResponse orderResponse = orderService.insertOrder(orderDTO);
            return ResponseEntity.ok(
                    Response.builder()
                            .data(orderResponse)
                            .status(HttpStatus.CREATED)
                            .message(localizationUtils.getLocalizedMessage(MessagesKey.INSERT_SUCCESSFULLY))
                            .build()
            );
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
    public ResponseEntity<Response> getOrder (@PathVariable("id") Long orderId) throws DataNotFoundException {
        OrderResponse orderResponse = orderService.getOrder(orderId);
        return ResponseEntity.ok(
                Response.builder()
                        .data(orderResponse)
                        .message("Get order successfully")
                        .status(HttpStatus.OK)
                        .build()
        );
    }

    @GetMapping("")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Response> getOrders (
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "limit", defaultValue = "16") int limit,
            @RequestParam(value = "keyword", defaultValue = "") String keyword
    ) {
        PageRequest pageRequest = PageRequest.of(
                page, limit,
                Sort.by("id").ascending()
        );
        Page<OrderResponse> orderPages = orderService.getOrders(keyword, pageRequest);
        int totalPages = orderPages.getTotalPages();
        List<OrderResponse> orderResponses = orderPages.getContent();
        return ResponseEntity.ok(
                Response.builder()
                        .data(OrderListResponse.builder()
                                .orderResponses(orderResponses)
                                .totalPages(totalPages)
                                .build())
                        .status(HttpStatus.OK)
                        .message("Get all orders successfully")
                        .build()
        );
    }

    @GetMapping("/user/{user_id}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
    public ResponseEntity<Response> getOrderByUser (
            @PathVariable("user_id") Long userId,
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "limit", defaultValue = "16") int limit,
            @RequestParam(name = "keyword", defaultValue = "") String keyword,
            @RequestParam(name = "sort", defaultValue = "default") String sortOption
    ) {
        Sort sort = switch (sortOption) {
            case "high" -> Sort.by("totalMoney").descending();
            case "low" -> Sort.by("totalMoney").ascending();
            case "latest" -> Sort.by("createdAt").descending();
            case "oldest" -> Sort.by("createdAt").ascending();
            default -> Sort.by("id").ascending();
        };
        PageRequest pageRequest = PageRequest.of(
                page, limit, sort
        );
        Page<Order> orderPage = orderService.findByUserIdAndKeyword(userId, pageRequest, keyword);
        List<OrderResponse> orderResponses = orderPage.getContent().stream()
                .map(order -> {
                    OrderResponse orderResponse = modelMapper.map(order, OrderResponse.class);
                    orderResponse.setPaymentMethodId(order.getPaymentMethod().getId());
                    orderResponse.setShippingMethodId(order.getShippingMethod().getId());
                    orderResponse.setUserId(order.getUser().getId());
                    orderResponse.setShippingMethodName(order.getShippingMethod().getName());
                    orderResponse.setPaymentMethodName(order.getPaymentMethod().getName());
                    return orderResponse;
                }).toList();
        return ResponseEntity.ok(
                Response.builder()
                        .data(
                                OrderListResponse.builder()
                                        .orderResponses(orderResponses)
                                        .totalPages(orderPage.getTotalPages())
                                        .totalOrders(orderService.totalOrdersByUserId(userId))
                                        .build()
                        )
                        .message("Get orders by user successfully")
                        .status(HttpStatus.OK)
                        .build()
        );
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
    public ResponseEntity<Response> updateOrder (
            @PathVariable("id") Long orderId,
            @Valid @RequestBody OrderDTO orderDTO,
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
            OrderResponse orderResponse = orderService.updateOrder(orderId, orderDTO);
            return ResponseEntity.ok(
                    Response.builder()
                            .data(orderResponse)
                            .status(HttpStatus.OK)
                            .message(localizationUtils.getLocalizedMessage(MessagesKey.UPDATE_SUCCESSFULLY))
                            .build()
            );
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
    public ResponseEntity<Response> deleteOrder (@PathVariable("id") Long orderId) throws DataNotFoundException {
        orderService.deleteOrder(orderId);
        return ResponseEntity.ok(
                Response.builder()
                        .status(HttpStatus.OK)
                        .message(localizationUtils.getLocalizedMessage(MessagesKey.DELETE_SUCCESSFULLY))
                        .build()
        );
    }
}
