package com.timevo_ecommerce_backend.responses.screen_size;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ScreenSizeResponse {

    private Long id;

    private float size;

    @JsonProperty("total_product")
    private Long totalProduct;
}
