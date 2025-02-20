package com.project.service;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DispatchService {
	int dispatch_id; 
	String m_id;
	String e_name; 
	LocalDate start_date;
	LocalDate end_date;
	String dispatch_where;
	String dispatch_payment; 
	String dispatch_detail;
	int e_key;
	int dispatch_complete;

}
