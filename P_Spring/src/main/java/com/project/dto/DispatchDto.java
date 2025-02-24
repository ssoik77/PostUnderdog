package com.project.dto;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DispatchDto {
	private long dispatchId; 
	
    @JsonProperty("m_id")
    private String mId;
	
    @JsonProperty("e_key")
    private int eKey;
    
    @JsonProperty("e_name")
	private String eName; 
    private LocalDate startDate;
    private LocalDate endDate;
    private String dispatchWhere;
    private String dispatchPayment; 
    private String dispatchDetail;
    private String dispatchComplete;

}
