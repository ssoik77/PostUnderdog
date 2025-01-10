package com.project.dto;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class VacationDto {
    private Long vacationId;
    private String employeeId;
    private String employeeName;
    private LocalDate startDate;
    private LocalDate endDate;
    private String reason;
    private LocalDate createdAt;
    private LocalDate updatedAt;

    public String getStartDate() {
        return startDate != null ? startDate.format(DateTimeFormatter.ofPattern("yyyy-MM-dd")) : null;
    }

    public String getEndDate() {
        return endDate != null ? endDate.format(DateTimeFormatter.ofPattern("yyyy-MM-dd")) : null;
    }
}
