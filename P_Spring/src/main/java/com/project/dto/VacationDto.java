package com.project.dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class VacationDto {
    private Long vacationId;
    private String mId;
    private String eName;
    private LocalDate startDate;
    private LocalDate endDate;
    private String reason;
    private String approval;
}