package com.project.dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class VacationApprovalDto {
	private String e_num;
    private Long vacation_id;
    private String e_name;
    private LocalDate start_date;
    private LocalDate end_date;
    private String reason;
    private String approval;    
}