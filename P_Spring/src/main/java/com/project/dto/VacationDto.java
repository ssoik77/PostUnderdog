package com.project.dto;

import java.time.LocalDate;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class VacationDto {
    private Long vacationId;     // 휴가 ID
    private String employeeId;   // member_info의 m_id
    private String employeeName; // employee_info의 e_name
    private LocalDate startDate; // 휴가 시작 날짜
    private LocalDate endDate;   // 휴가 종료 날짜
    private String reason;       // 휴가 사유
    private LocalDate createdAt; // 생성 시간
    private LocalDate updatedAt; // 수정 시간
}