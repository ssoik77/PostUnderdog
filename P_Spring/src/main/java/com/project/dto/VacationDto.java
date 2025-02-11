package com.project.dto;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class VacationDto {
    private Long vacationId;

    @JsonProperty("m_id")
    private String mId;

    @JsonProperty("e_name")
    private String eName;
    private LocalDate startDate;
    private LocalDate endDate;
    private String reason;
    private String approval;
}